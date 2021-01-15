<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;
use Google_Client; 
use Google_Service_Drive;

\Predis\Autoloader::register();

class oAuthLoginController extends Controller
{
    public function index()
    {
        $id_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI1MmZjYjk3ZGY1YjZiNGY2ZDFhODg1ZjFlNjNkYzRhOWNkMjMwYzUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzA5MDU0NjQzODM0LTMwajkyNjhucGo5dGx0YmhuYmRzbzhldGJwa2syMmc2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzA5MDU0NjQzODM0LTMwajkyNjhucGo5dGx0YmhuYmRzbzhldGJwa2syMmc2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzMzgyOTgwMjUyMTcyNDI0OTc3IiwiaGQiOiJncm10ZWNoLmNvbSIsImVtYWlsIjoic3JlZXBhcm5hQGdybXRlY2guY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJhdkRSRU1SUnRLczJiMXIyamp6MW1BIiwibmFtZSI6IlNyZWVwYXJuYSBEYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2dmQWZfZ01sS0d5Q2tXeHhKR1hKaXJNOVJfMk5oNUtIekJkeFFHPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlNyZWVwYXJuYSIsImZhbWlseV9uYW1lIjoiRGFzIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MTA1MjQ2MTksImV4cCI6MTYxMDUyODIxOSwianRpIjoiYmIxYzA2ZTMwNDkzMjRlZWM2MjUwYTU1MDk3Y2VmYmUyNzRlYWU3NiJ9.I1OfUc6uoo3PkZJn1YOW0DMOWVwYO3gGv7bJ7kpiNddHDeMsZWq86Ykwyokhz9HVQsEXOZQVmWwSnHbZGK_3f6GJDG1I9KciQHS50QrGNT6_HAvUQoC_AQ68354ySzTm01FNeJJ1FstcCeUdm-Yi9ix9RcR5bR2dDYevF2PELz1TJ7I_Osooh7_8nbJ1J9UhYcVLuXSAoyZ8SSlMdCp8mraWC83G1y6jpXhIqUGE4T5oV0hSPBzVxrkodUcRCA9uidDVKOVfRDdOrdYi-vAFiJkc54LrpykhLOTIO_lCM9W8aYPUebGp68rNAMwh3z5Mcwu_zTmk1weHzGBNcmWW8Q';
        $CLIENT_ID = '709054643834-30j9268npj9tltbhnbdso8etbpkk22g6.apps.googleusercontent.com';

        // $client = new Google_Client();
        
        $client = new Google_Client(['client_id' => $CLIENT_ID]);  // Specify the CLIENT_ID of the app that accesses the backend
        $refreshToken = $client->getAccessToken();
        $payload = $client->verifyIdToken($id_token);
        // if ($payload) {
        //   $userid = $payload['sub'];
        //   // If request specified a G Suite domain:
        //   //$domain = $payload['hd'];
        // } else {
        //   // Invalid ID token
        //   $userid = 0;
        // }        


        print_r(array('payload'=>$payload,'refresh_token'=>$refreshToken));
        // $user = array("id"=>15448,"name"=> "Sreeparna Das");
        $user = array("id_token"=>$id_token,"client_id"=>$CLIENT_ID);
        return response()->json($user);
    }
}
