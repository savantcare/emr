<?php
namespace App\Http\Controllers;

use App\Name;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class NameController extends Controller
{
    public function getPatientName($pPatientUuid)
    {
        $patientNameQueryResultObj = Name::select('*')->where('patientUuid', $pPatientUuid)->get();

        return response()->json($patientNameQueryResultObj);
    }

    public function update($pServerSideRowUuid, Request $request)
    {
        $name = Name::findOrFail($pServerSideRowUuid);
        $name->update($request->all());

        return response()->json($name, 200);
    }
}
