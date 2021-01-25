<?php

namespace App\Http\Controllers;

use App\Allergies;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class AllergiesController extends Controller
{
    public function get_all_temporal_allergies($pPtUuid)
    {
        $allergiesQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_allergies.allergies where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));
        return response()->json($allergiesQueryResultObj);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $allergiesData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'allergen' => $requestData['data']['allergen'],
            'reaction' => $requestData['data']['reaction'],
            'onset' => $requestData['data']['onset'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress
        );

        $allergies = Allergies::insertGetId($allergiesData);

        return response()->json($allergies, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $allergies = Allergies::findOrFail($pServerSideRowUuid);
        $allergies->update($pRequest->all());

        return response()->json($allergies, 200);
    }


    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $allergies = Allergies::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $allergies->update($updateData);
        }

        $allergies->delete();

        return response('Deleted successfully', 200);
    }

    public function get_client_ip()
    {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } elseif (isset($_SERVER['HTTP_X_FORWARDED'])) {
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        } elseif (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        } elseif (isset($_SERVER['HTTP_FORWARDED'])) {
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        } elseif (isset($_SERVER['REMOTE_ADDR'])) {
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        } else {
            $ipaddress = 'UNKNOWN';
        }
        return $ipaddress;
    }
}
