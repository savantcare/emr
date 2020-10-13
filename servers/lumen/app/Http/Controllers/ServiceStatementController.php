<?php

namespace App\Http\Controllers;

use App\ServiceStatement;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();


class ServiceStatementController extends Controller
{
    public function getAllTemporalServiceStatements()
    {
        $serviceStatementQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_service_statements.service_statements FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($serviceStatementQueryResultObj);
        // return response()->json(ServiceStatement::all());
    }

    public function getOneServiceStatement($pServerSideRowUuid)
    {
        return response()->json(ServiceStatement::find($pServerSideRowUuid));
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        
        $serviceStatementData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'patientUuid' => $requestData['data']['patientUuid'],
            'serviceStatementFieldIdFromServiceStatementMaster' => $requestData['data']['serviceStatementFieldIdFromServiceStatementMaster'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid']
        );
       
        $serviceStatement = ServiceStatement::insertGetId($serviceStatementData);
        // $serviceStatement = ServiceStatement::create($pRequest->all());
        return response()->json($serviceStatement, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $serviceStatement = ServiceStatement::findOrFail($pServerSideRowUuid);
        $serviceStatement->update($pRequest->all());

        return response()->json($serviceStatement, 200);
    }

 
    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $serviceStatement = ServiceStatement::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $serviceStatement->update($updateData);
        }

        $serviceStatement->delete();

        return response('Deleted successfully', 200);
    }
}
