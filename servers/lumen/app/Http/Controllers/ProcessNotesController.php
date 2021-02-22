<?php

namespace App\Http\Controllers;

use App\ProcessNotes;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class ProcessNotesController extends Controller
{
    public function get_all_temporal_process_notes($pPtUuid)
    {
        $processNotesQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_process_notes.process_notes FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));

        return response()->json($processNotesQueryResultObj);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $processNotesData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'description' => $requestData['data']['description'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress
        );

        $processNotes = ProcessNotes::insertGetId($processNotesData);

        return response()->json($processNotes, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $processNotes = ProcessNotes::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();
        $processNotes->update($requestData['data']);

        return response()->json($processNotes, 200);
    }

    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $processNotes = ProcessNotes::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $processNotes->update($updateData);
        }

        $processNotes->delete();

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
