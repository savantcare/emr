<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

/* 
  Following 3 lines are needed to remove the CORS error of
  No 'Access-Control-Allow-Origin' header is present on the requested resource
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE, PATCH');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// CORS implementation for preflight requests


$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('reminders',  ['uses' => 'ReminderController@showAllReminders']);
  
    $router->get('reminders/{id}', ['uses' => 'ReminderController@showOneReminder']);
  
    $router->post('reminders', ['uses' => 'ReminderController@create']);
  
    $router->delete('reminders/{id}', ['uses' => 'ReminderController@delete']);
  
    $router->put('reminders/{id}', ['uses' => 'ReminderController@update']);

    $router->patch('reminders/{id}', ['uses' => 'ReminderController@discontinue']);

    $router->options('reminders', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('reminders/{id}', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
  });
