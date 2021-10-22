<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class AppointmentsController extends Controller
{
    public  $connectionObj;
    public function __construct()
    {
        $this->connectionObj = DB::connection('dbScemrProdDB');
    }

    public function get_all_appointments($pPtUuid)
    {
        //$bloodPressureQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, trim((UNIX_TIMESTAMP(timeOfMeasurementInMilliSecs) * 1000))+0 as timeOfMeasurementInMilliSecs FROM sc_vital_signs.blood_pressure_levels FOR SYSTEM_TIME ALL  where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));

        /*$usersObj = $this->connectionObj->table("users")->select('*')
            ->from('users AS users')
            ->where('users.id',10)
            ->get();

        return response()->json($usersObj);*/

        /*$objReturnConn = mysqli_connect("10.2.1.12:3306", "root", "jaikalima", "DB_SCEMR_PROD");
        $checkFilesSql = "SELECT * FROM users WHERE id=10";
        $checkFilesResult = $objReturnConn->query($checkFilesSql);
        if($checkFilesResult->num_rows > 0) {
            while($row = $checkFilesResult->fetch_assoc()) {
                print_r($row);
            }
        }*/



    }

}
