<?php

namespace App\Http\Controllers;

use App\MiscellaneousNotes;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class MiscellaneousNotesController extends Controller
{
    public function get_all_temporal_miscellaneous_notes()
    {
        $miscellaneousNotesQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_misc_notes.misc_notes order by ROW_START desc'));
        return response()->json($miscellaneousNotesQueryResultObj);
    }

    public function get_one_miscellaneous_note($pServerSideRowUuid)
    {
        return response()->json(MiscellaneousNotes::find($pServerSideRowUuid));
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $miscellaneousNotesData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'description' => $requestData['data']['description'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress
        );

        $miscellaneousNotes = MiscellaneousNotes::insertGetId($miscellaneousNotesData);

        return response()->json($miscellaneousNotes, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $miscellaneousNotes = MiscellaneousNotes::findOrFail($pServerSideRowUuid);
        $miscellaneousNotes->update($pRequest->all());

        return response()->json($miscellaneousNotes, 200);
    }

    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $miscellaneousNotes = MiscellaneousNotes::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $miscellaneousNotes->update($updateData);
        }

        $miscellaneousNotes->delete();

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
