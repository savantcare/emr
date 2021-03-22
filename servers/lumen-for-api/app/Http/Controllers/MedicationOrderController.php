<?php
namespace App\Http\Controllers;

use App\MedicationOrder;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class MedicationOrderController extends Controller
{
    public function get_all_temporal_medication_order($pPtUuid)
    {
        $medicationOrderQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, trim(round(UNIX_TIMESTAMP(startDate) * 1000)) as startDate FROM sc_medication_order.medication_order FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));

        return response()->json($medicationOrderQueryResultObj);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        unset($requestData['data']['$id']);
        unset($requestData['data']['vnRowStateInSession']);
        unset($requestData['data']['isValidationError']);
        unset($requestData['data']['clientSideUniqRowId']);
        unset($requestData['data']['ROW_START']);
        unset($requestData['data']['ROW_END']);
        unset($requestData['data']['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']);

        $recordChangedFromIPAddress = $this->get_client_ip();
        $requestData['data']['recordChangedFromIPAddress'] = $recordChangedFromIPAddress;

        $startDate = (int)($requestData['data']['startDate']) / 1000;
        $requestData['data']['startDate'] = date('Y-m-d H:i:s', $startDate);

        $medication_order = MedicationOrder::insertGetId($requestData['data']);

        return response()->json($medication_order, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();
        $startDate = (int)($requestData['data']['startDate']) / 1000;
        $requestData['data']['startDate'] = date('Y-m-d H:i:s', $startDate);

        $medication_order = MedicationOrder::findOrFail($pServerSideRowUuid);
        $medication_order->update($requestData['data']);

        return response()->json($medication_order, 200);
    }


    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $medication_order = MedicationOrder::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['data']['notes']) && !empty($requestData['data']['notes'])) {
            $updateData = array(
                'notes' => $requestData['data']['notes']
            );
            $medication_order->update($updateData);
        }

        $medication_order->delete();

        return response('Deleted successfully', 200);
    }

    public function get_client_ip() {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if(isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }
}
