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


    // Blood Pressure
    $router->get('blood-pressure/v20/', ['uses' => 'BloodPressureController@getAllTemporalBloodPressures']);
    $router->get('blood-pressure/v20/{serverSideRowUuid}', ['uses' => 'BloodPressureController@getOneBloodPressure']);
    $router->post('blood-pressure/v20/', ['uses' => 'BloodPressureController@create']);
    $router->put('blood-pressure/v20/{serverSideRowUuid}', ['uses' => 'BloodPressureController@update']);
    $router->options('blood-pressure/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('blood-pressure/v20/{serverSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // Blood Sugar
    $router->get('blood-sugar/v20/', ['uses' => 'BloodSugarController@getAllTemporalBloodSugars']);
    $router->get('blood-sugar/v20/{serverSideRowUuid}', ['uses' => 'BloodSugarController@getOneBloodSugar']);
    $router->post('blood-sugar/v20/', ['uses' => 'BloodSugarController@create']);
    $router->put('blood-sugar/v20/{serverSideRowUuid}', ['uses' => 'BloodSugarController@update']);
    $router->options('blood-sugar/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('blood-sugar/v20/{serverSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // HEIGHT
    $router->get('height/v20/', ['uses' => 'HeightController@getAllTemporalHeights']);
    $router->get('height/v20/{pServerSideRowUuid}', ['uses' => 'HeightController@getOneHeight']);
    $router->post('height/v20/', ['uses' => 'HeightController@create']);
    $router->put('height/v20/{pServerSideRowUuid}', ['uses' => 'HeightController@update']);
    $router->options('height/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('height/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // Pulse
    $router->get('pulse/v20/', ['uses' => 'PulseController@getAllTemporalPulses']);
    $router->get('pulse/v20/{pServerSideRowUuid}', ['uses' => 'PulseController@getOnePulse']);
    $router->post('pulse/v20/', ['uses' => 'PulseController@create']);
    $router->put('pulse/v20/{pServerSideRowUuid}', ['uses' => 'PulseController@update']);
    $router->options('pulse/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('pulse/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // REMINDERS
    $router->get('reminders/v20/', ['uses' => 'ReminderController@getAllTemporalReminders']);
    $router->get('reminders/v20/{serverSideRowUuid}', ['uses' => 'ReminderController@getOneReminder']);
    $router->post('reminders/v20/', ['uses' => 'ReminderController@create']);
    $router->delete('reminders/v20/{serverSideRowUuid}', ['uses' => 'ReminderController@delete']);
    $router->put('reminders/v20/{serverSideRowUuid}', ['uses' => 'ReminderController@update']);
    $router->patch('reminders/v20/{serverSideRowUuid}', ['uses' => 'ReminderController@delete']);
    $router->options('reminders/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('reminders/v20/{serverSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // recommendations
    $router->get('recommendations/v20/', ['uses' => 'RecommendationController@getAllTemporalRecommendations']);
    $router->get('recommendations/v20/{pServerSideRowUuid}', ['uses' => 'RecommendationController@getOneRecommendation']);
    $router->post('recommendations/v20/', ['uses' => 'RecommendationController@create']);
    $router->delete('recommendations/v20/{pServerSideRowUuid}', ['uses' => 'RecommendationController@delete']);
    $router->put('recommendations/v20/{pServerSideRowUuid}', ['uses' => 'RecommendationController@update']);
    $router->patch('recommendations/v20/{pServerSideRowUuid}', ['uses' => 'RecommendationController@delete']);
    $router->options('recommendations/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('recommendations/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // Oxygen Saturation
    $router->get('oxygen-saturation/v20/', ['uses' => 'OxygenSaturationController@getAllTemporalOxygenSaturations']);
    $router->get('oxygen-saturation/v20/{pServerSideRowUuid}', ['uses' => 'OxygenSaturationController@getOneOxygenSaturation']);
    $router->post('oxygen-saturation/v20/', ['uses' => 'OxygenSaturationController@create']);
    $router->put('oxygen-saturation/v20/{pServerSideRowUuid}', ['uses' => 'OxygenSaturationController@update']);
    $router->options('oxygen-saturation/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('oxygen-saturation/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });


    // Service statement
    $router->get('service-statements/v20/', ['uses' => 'ServiceStatementController@getAllTemporalServiceStatements']);
    $router->get('service-statements/v20/{pServerSideRowUuid}', ['uses' => 'ServiceStatementController@getOneServiceStatement']);
    $router->post('service-statements/v20/', ['uses' => 'ServiceStatementController@create']);
    $router->delete('service-statements/v20/{pServerSideRowUuid}', ['uses' => 'ServiceStatementController@delete']);
    $router->options('service-statements/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });
    $router->options('service-statements/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });

    // Past psych history
    $router->get('past-psych-history/v20/', ['uses' => 'PastPsychHistoryController@getAllTemporalPastPsychHistory']);
    $router->get('past-psych-history/v20/{pServerSideRowUuid}', ['uses' => 'PastPsychHistoryController@getOnePastPsychHistory']);
    $router->post('past-psych-history/v20/', ['uses' => 'PastPsychHistoryController@create']);
    $router->delete('past-psych-history/v20/{pServerSideRowUuid}', ['uses' => 'PastPsychHistoryController@delete']);
    $router->options('past-psych-history/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });
    $router->options('past-psych-history/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });



    // Mental status exam
    $router->get('mental-status-exams/v20/', ['uses' => 'MentalStatusExamController@getAllTemporalMentalStatusExams']);
    $router->post('mental-status-exams/v20/', ['uses' => 'MentalStatusExamController@create']);
    $router->delete('mental-status-exams/v20/{pServerSideRowUuid}', ['uses' => 'MentalStatusExamController@delete']);
    $router->options('mental-status-exams/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });
    $router->options('mental-status-exams/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });

    // Temperature
    $router->get('temperature/v20/', ['uses' => 'TemperatureController@getAllTemporalTemperatures']);
    $router->get('temperature/v20/{serverSideRowUuid}', ['uses' => 'TemperatureController@getOneTemperature']);
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

    // Waist Circumference
    $router->get('waist-circumference/v20/', ['uses' => 'WaistCircumferenceController@getAllTemporalWaistCircumferences']);
    $router->get('waist-circumference/v20/{pServerSideRowUuid}', ['uses' => 'WaistCircumferenceController@getOneWaistCircumference']);
    $router->post('waist-circumference/v20/', ['uses' => 'WaistCircumferenceController@create']);
    $router->put('waist-circumference/v20/{pServerSideRowUuid}', ['uses' => 'WaistCircumferenceController@update']);
    $router->options('waist-circumference/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('waist-circumference/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // WEIGHT
    $router->get('weight/v20/', ['uses' => 'WeightController@getAllTemporalWeights']);
    $router->get('weight/v20/{pServerSideRowUuid}', ['uses' => 'WeightController@getOneWeight']);
    $router->post('weight/v20/', ['uses' => 'WeightController@create']);
    $router->put('weight/v20/{pServerSideRowUuid}', ['uses' => 'WeightController@update']);
    $router->options('weight/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('weight/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // BMI
    $router->get('bmi/v20/', ['uses' => 'BmiController@getAllTemporalBmis']);
    $router->get('bmi/v20/{pServerSideRowUuid}', ['uses' => 'BmiController@getOneBmi']);
    $router->post('bmi/v20/', ['uses' => 'BmiController@create']);
    $router->put('bmi/v20/{pServerSideRowUuid}', ['uses' => 'BmiController@update']);
    $router->options('bmi/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('bmi/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // Plan Comments
    $router->get('plan-comments/v20/', ['uses' => 'PlanCommentsController@getAllTemporalPlanComments']);
    $router->get('plan-comments/v20/{pServerSideRowUuid}', ['uses' => 'PlanCommentsController@getOnePlanComments']);
    $router->post('plan-comments/v20/', ['uses' => 'PlanCommentsController@create']);
    $router->delete('plan-comments/v20/{pServerSideRowUuid}', ['uses' => 'PlanCommentsController@delete']);
    $router->put('plan-comments/v20/{pServerSideRowUuid}', ['uses' => 'PlanCommentsController@update']);
    $router->options('plan-comments/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('plan-comments/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
});
