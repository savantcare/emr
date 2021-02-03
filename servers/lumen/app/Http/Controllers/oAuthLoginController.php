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
        // How to validate google id_token? (see https://developers.google.com/identity/sign-in/web/backend-auth)
        // Reference for googleClient package https://github.com/googleapis/google-api-php-client

          // Should I use google id of the user? Ans: Do not use the Google IDs returned by getId() to communicate the currently signed in user instead send id_token which can validate sucurely and then use sub claim (google id) of the ID token. (https://developers.google.com/identity/sign-in/web/people)

        $id_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc4M2VjMDMxYzU5ZTExZjI1N2QwZWMxNTcxNGVmNjA3Y2U2YTJhNmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzA5MDU0NjQzODM0LTMwajkyNjhucGo5dGx0YmhuYmRzbzhldGJwa2syMmc2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzA5MDU0NjQzODM0LTMwajkyNjhucGo5dGx0YmhuYmRzbzhldGJwa2syMmc2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzMzgyOTgwMjUyMTcyNDI0OTc3IiwiaGQiOiJncm10ZWNoLmNvbSIsImVtYWlsIjoic3JlZXBhcm5hQGdybXRlY2guY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJIeTRqc3UzY0RjeWJaMWswVzdOa3FnIiwibmFtZSI6IlNyZWVwYXJuYSBEYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2dmQWZfZ01sS0d5Q2tXeHhKR1hKaXJNOVJfMk5oNUtIekJkeFFHPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlNyZWVwYXJuYSIsImZhbWlseV9uYW1lIjoiRGFzIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MTEyMjg4MTMsImV4cCI6MTYxMTIzMjQxMywianRpIjoiNTZiMTZhYjZlYWMzMDcxZDVkZTFlNDUyZDg3YzdjZWU3YWRkMDFmOCJ9.ZBt837ezoaX7c6Fw9xf1AYOJuH8wNm97sw0bIahCz1sHQKPQ1NdCKkyBTB8kY1m21yzjfyfABa5TtZvcndpU1dWfaNS10Is5Vg-xfqhBch5hgjgOU91_5xaYH__NzyNix3EVuyUqqOpENXtdNExYLR3dTSSg_I_T-2LGyMwqedmmShddOm2N7RaM0AulgSvqlCmexuOsXjEBfs5fmUCZ0WVJU00GoZAWq0mvkhdCoatUDImmo1kJtdu6Rl7sMqf2r-92UHBv-mkGteDq2Nhsv-7fAWTNOicsjcOCvaY_tlsbRbChG2aTO1qinm8JT9fyd41X6XEbfx5k067modXbXw';

        $CLIENT_ID = '709054643834-30j9268npj9tltbhnbdso8etbpkk22g6.apps.googleusercontent.com';

        
        $client = new Google_Client(['client_id' => $CLIENT_ID]);  // Specify the CLIENT_ID of the app that accesses the backend
        $refreshToken = $client->getAccessToken();
        $payload = $client->verifyIdToken($id_token);
        if ($payload) {
          $userid = $payload['sub'];
          // If request specified a G Suite domain:
          //$domain = $payload['hd'];
        } else {
          // Invalid ID token
          $userid = 0;
        }        

        $user = array("payload"=>$payload,"google_id"=>$userid,"client_id"=>$CLIENT_ID);
        return response()->json($user);
    }
}