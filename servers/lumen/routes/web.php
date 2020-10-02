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
    $router->get('reminders/v20/',  ['uses' => 'ReminderController@showAllReminders']);
    $router->get('reminders/v20/{id}', ['uses' => 'ReminderController@showOneReminder']);
    $router->post('reminders/v20/', ['uses' => 'ReminderController@create']);
    $router->delete('reminders/v20/{id}', ['uses' => 'ReminderController@delete']);
    $router->put('reminders/v20/{id}', ['uses' => 'ReminderController@update']);
    $router->patch('reminders/v20/{id}', ['uses' => 'ReminderController@delete']);
    $router->options('reminders/v20', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('reminders/v20/{id}', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });



  $router->get('phq9/v20/',  ['uses' => 'Phq9Controller@showAllPhq9Screen']);
  $router->get('phq9/v20/{id}',  ['uses' => 'Phq9Controller@showOnePhq9Screen']);
  $router->post('phq9/v20/',  ['uses' => 'Phq9Controller@create']);
  $router->put('phq9/v20/{id}',  ['uses' => 'Phq9Controller@update']);
  $router->options('phq9/v20', function () {
    return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
          ->header('Access-Control-Allow-Credentials', 'true')
          ->header('Connection', 'keep-alive');
  });
  $router->options('phq9/v20/{id}', function () {
    return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
          ->header('Access-Control-Allow-Credentials', 'true')
          ->header('Connection', 'keep-alive');
  });

  
    /**
     * Routing for Height
     */
    $router->get('height/v20/',  ['uses' => 'HeightController@showAllHeights']);
    $router->get('height/v20/{id}', ['uses' => 'HeightController@showOneHeight']);
    $router->post('height/v20/', ['uses' => 'HeightController@create']);
    $router->put('height/v20/{id}', ['uses' => 'HeightController@update']);
    $router->options('height/v20', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('height/v20/{id}', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    /**
     * Routing for Weight
     */
    $router->get('weight/v20/',  ['uses' => 'WeightController@showAllWeights']);
    $router->get('weight/v20/{id}', ['uses' => 'WeightController@showOneWeight']);
    $router->post('weight/v20/', ['uses' => 'WeightController@create']);
    $router->put('weight/v20/{id}', ['uses' => 'WeightController@update']);
    $router->options('weight/v20', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('weight/v20/{id}', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    /**
     * Routing for Temperature
     */
    $router->get('temperature/v20/',  ['uses' => 'TemperatureController@showAllTemperatures']);
    $router->get('temperature/v20/{serverSideRowUuid}', ['uses' => 'TemperatureController@showOneTemperature']);
    $router->post('temperature/v20/', ['uses' => 'TemperatureController@create']);
    $router->put('temperature/v20/{serverSideRowUuid}', ['uses' => 'TemperatureController@update']);
    $router->options('temperature/v20', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('temperature/v20/{serverSideRowUuid}', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    /**
     * Routing for Blood Pressure
     */
    $router->get('blood-pressure/v20/',  ['uses' => 'BloodPressureController@showAllBloodPressures']);
    $router->get('blood-pressure/v20/{id}', ['uses' => 'BloodPressureController@showOneBloodPressure']);
    $router->post('blood-pressure/v20/', ['uses' => 'BloodPressureController@create']);
    $router->put('blood-pressure/v20/{id}', ['uses' => 'BloodPressureController@update']);
    $router->options('blood-pressure/v20', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('blood-pressure/v20/{id}', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    /**
     * Routing for Blood Sugar
     */
    $router->get('blood-sugar/v20/',  ['uses' => 'BloodSugarController@showAllBloodSugars']);
    $router->get('blood-sugar/v20/{id}', ['uses' => 'BloodSugarController@showOneBloodSugar']);
    $router->post('blood-sugar/v20/', ['uses' => 'BloodSugarController@create']);
    $router->put('blood-sugar/v20/{id}', ['uses' => 'BloodSugarController@update']);
    $router->options('blood-sugar/v20', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('blood-sugar/v20/{id}', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    /**
     * Routing for Waist Circumference
     */
    $router->get('waist-circumference/v20/',  ['uses' => 'WaistCircumferenceController@showAllWaistCircumferences']);
    $router->get('waist-circumference/v20/{id}', ['uses' => 'WaistCircumferenceController@showOneWaistCircumference']);
    $router->post('waist-circumference/v20/', ['uses' => 'WaistCircumferenceController@create']);
    $router->put('waist-circumference/v20/{id}', ['uses' => 'WaistCircumferenceController@update']);
    $router->options('waist-circumference/v20', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('waist-circumference/v20/{id}', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    /**
     * Routing for Pulse
     */
    $router->get('pulse/v20/',  ['uses' => 'PulseController@showAllPulses']);
    $router->get('pulse/v20/{id}', ['uses' => 'PulseController@showOnePulse']);
    $router->post('pulse/v20/', ['uses' => 'PulseController@create']);
    $router->put('pulse/v20/{id}', ['uses' => 'PulseController@update']);
    $router->options('pulse/v20', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('pulse/v20/{id}', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    /**
     * Routing for Oxygen Saturation
     */
    $router->get('oxygen-saturation/v20/',  ['uses' => 'OxygenSaturationController@showAllOxygenSaturations']);
    $router->get('oxygen-saturation/v20/{id}', ['uses' => 'OxygenSaturationController@showOneOxygenSaturation']);
    $router->post('oxygen-saturation/v20/', ['uses' => 'OxygenSaturationController@create']);
    $router->put('oxygen-saturation/v20/{id}', ['uses' => 'OxygenSaturationController@update']);
    $router->options('oxygen-saturation/v20', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('oxygen-saturation/v20/{id}', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
  });
