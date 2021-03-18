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

    $router->get('validateUser/', ['uses' => 'OAuthLoginController@index']);
    // Blood Pressure
    $router->get('blood-pressure/v20/{pPtUuid}', ['uses' => 'BloodPressureController@get_all_temporal_blood_pressures']);
    //$router->get('blood-pressure/v20/{serverSideRowUuid}', ['uses' => 'BloodPressureController@get_one_blood_pressure']);
    $router->post('blood-pressure/v20/', ['uses' => 'BloodPressureController@create']);
    $router->put('blood-pressure/v20/{pServerSideRowUuid}', ['uses' => 'BloodPressureController@update']);
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
    $router->get('blood-sugar/v20/{pPtUuid}', ['uses' => 'BloodSugarController@get_all_temporal_blood_sugars']);
    //$router->get('blood-sugar/v20/{serverSideRowUuid}', ['uses' => 'BloodSugarController@get_one_blood_sugar']);
    $router->post('blood-sugar/v20/', ['uses' => 'BloodSugarController@create']);
    $router->put('blood-sugar/v20/{pServerSideRowUuid}', ['uses' => 'BloodSugarController@update']);
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
    $router->get('height/v20/{pPtUuid}', ['uses' => 'HeightController@get_all_temporal_heights']);
    //$router->get('height/v20/{pServerSideRowUuid}', ['uses' => 'HeightController@get_one_height']);
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
    $router->get('pulse/v20/{pPtUuid}', ['uses' => 'PulseController@get_all_temporal_pulses']);
    //$router->get('pulse/v20/{pServerSideRowUuid}', ['uses' => 'PulseController@get_one_pulse']);
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
    $router->get('reminders/v20/{pPtUuid}', ['uses' => 'ReminderController@get_all_temporal_reminders']);
    //$router->get('reminders/v20/{serverSideRowUuid}', ['uses' => 'ReminderController@get_one_reminder']);
    $router->post('reminders/v20/', ['uses' => 'ReminderController@create']);
    $router->delete('reminders/v20/{pServerSideRowUuid}', ['uses' => 'ReminderController@delete']);
    $router->put('reminders/v20/{pServerSideRowUuid}', ['uses' => 'ReminderController@update']);
    $router->patch('reminders/v20/{pServerSideRowUuid}', ['uses' => 'ReminderController@delete']);
    $router->options('reminders/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('reminders/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // Recommendations
    $router->get('recommendations/v20/{pPtUuid}', ['uses' => 'RecommendationController@get_all_temporal_recommendations']);
    //$router->get('recommendations/v20/{pServerSideRowUuid}', ['uses' => 'RecommendationController@get_one_recommendation']);
    $router->post('recommendations/v20/', ['uses' => 'RecommendationController@create']);
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
    $router->get('oxygen-saturation/v20/{pPtUuid}', ['uses' => 'OxygenSaturationController@get_all_temporal_oxygen_saturations']);
    //$router->get('oxygen-saturation/v20/{pServerSideRowUuid}', ['uses' => 'OxygenSaturationController@get_one_oxygen_saturation']);
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
    $router->get('service-statements/v20/{pPtUuid}', ['uses' => 'ServiceStatementController@get_all_temporal_service_statements']);
    $router->post('service-statements/v20/', ['uses' => 'ServiceStatementController@create']);
    $router->put('service-statements/v20/{pServerSideRowUuid}', ['uses' => 'ServiceStatementController@update']);
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
    $router->get('past-psych-history/v20/{pPtUuid}', ['uses' => 'PastPsychHistoryController@get_all_temporal_past_psych_history']);
    //$router->get('past-psych-history/v20/{pServerSideRowUuid}', ['uses' => 'PastPsychHistoryController@get_one_past_psych_history']);
    $router->post('past-psych-history/v20/', ['uses' => 'PastPsychHistoryController@create']);
    $router->put('past-psych-history/v20/{pServerSideRowUuid}', ['uses' => 'PastPsychHistoryController@update']);
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

    // Examination
    $router->get('examination/v20/{pPtUuid}', ['uses' => 'ExaminationController@get_all_temporal_examinations']);
    $router->post('examination/v20/', ['uses' => 'ExaminationController@create']);
    $router->put('examination/v20/{pServerSideRowUuid}', ['uses' => 'ExaminationController@update']);
    $router->delete('examination/v20/{pServerSideRowUuid}', ['uses' => 'ExaminationController@delete']);
    $router->options('examination/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });
    $router->options('examination/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });

    // Temperature
    $router->get('temperature/v20/{pPtUuid}', ['uses' => 'TemperatureController@get_all_temporal_temperatures']);
    //$router->get('temperature/v20/{serverSideRowUuid}', ['uses' => 'TemperatureController@get_one_temperature']);
    $router->post('temperature/v20/', ['uses' => 'TemperatureController@create']);
    $router->put('temperature/v20/{pServerSideRowUuid}', ['uses' => 'TemperatureController@update']);
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
    $router->get('waist-circumference/v20/{pPtUuid}', ['uses' => 'WaistCircumferenceController@get_all_temporal_waist_circumferences']);
    //$router->get('waist-circumference/v20/{pServerSideRowUuid}', ['uses' => 'WaistCircumferenceController@get_one_waist_circumference']);
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
    $router->get('weight/v20/{pPtUuid}', ['uses' => 'WeightController@get_all_temporal_weights']);
    //$router->get('weight/v20/{pServerSideRowUuid}', ['uses' => 'WeightController@get_one_weight']);
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
    $router->get('bmi/v20/{pPtUuid}', ['uses' => 'BmiController@get_all_temporal_bmis']);
    //$router->get('bmi/v20/{pServerSideRowUuid}', ['uses' => 'BmiController@get_one_bmi']);
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
    $router->get('plan-comments/v20/{pPtUuid}', ['uses' => 'PlanCommentsController@get_all_temporal_plan_comments']);
    //$router->get('plan-comments/v20/{pServerSideRowUuid}', ['uses' => 'PlanCommentsController@get_one_plan_comments']);
    $router->post('plan-comments/v20/', ['uses' => 'PlanCommentsController@create']);
    $router->patch('plan-comments/v20/{pServerSideRowUuid}', ['uses' => 'PlanCommentsController@delete']);
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

    // Allergies
    $router->get('allergies-present/v20/{pPtUuid}', ['uses' => 'AllergiesController@get_all_allergies_present']);
    $router->get('allergies/v20/{pPtUuid}', ['uses' => 'AllergiesController@get_all_temporal_allergies']);
    $router->post('allergies-present/v20/', ['uses' => 'AllergiesController@create_present']);
    $router->post('allergies/v20/', ['uses' => 'AllergiesController@create']);
    $router->put('allergies-present/v20/{pServerSideRowUuid}', ['uses' => 'AllergiesController@update_present']);
    $router->put('allergies/v20/{pServerSideRowUuid}', ['uses' => 'AllergiesController@update']);
    $router->patch('allergies/v20/{pServerSideRowUuid}', ['uses' => 'AllergiesController@delete']);
    $router->options('allergies-present/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('allergies/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('allergies-present/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('allergies/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // Chief Complant
    $router->get('chief-complaint/v20/{pPtUuid}', ['uses' => 'ChiefComplaintController@get_all_temporal_chief_complaint']);
    //$router->get('chief-complaint/v20/{pServerSideRowUuid}', ['uses' => 'ChiefComplaintController@get_one_chief_complaint']);
    $router->post('chief-complaint/v20/', ['uses' => 'ChiefComplaintController@create']);
    $router->put('chief-complaint/v20/{pServerSideRowUuid}', ['uses' => 'ChiefComplaintController@update']);
    $router->patch('chief-complaint/v20/{pServerSideRowUuid}', ['uses' => 'ChiefComplaintController@delete']);
     $router->options('chief-complaint/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('chief-complaint/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // Process Notes
    $router->get('process-notes/v20/{pPtUuid}', ['uses' => 'ProcessNotesController@get_all_temporal_process_notes']);
    $router->post('process-notes/v20/', ['uses' => 'ProcessNotesController@create']);
    $router->put('process-notes/v20/{pServerSideRowUuid}', ['uses' => 'ProcessNotesController@update']);
    $router->patch('process-notes/v20/{pServerSideRowUuid}', ['uses' => 'ProcessNotesController@delete']);
    $router->options('process-notes/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });
    $router->options('process-notes/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });

    // Medical History
    $router->get('medical-history/v20/{pPtUuid}', ['uses' => 'MedicalHistoryController@get_all_temporal_medical_histories']);
    $router->post('medical-history/v20/', ['uses' => 'MedicalHistoryController@create']);
    $router->patch('medical-history/v20/{pServerSideRowUuid}', ['uses' => 'MedicalHistoryController@delete']);
    $router->put('medical-history/v20/{pServerSideRowUuid}', ['uses' => 'MedicalHistoryController@update']);
    $router->options('medical-history/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('medical-history/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // Diagnosis
    $router->get('diagnosis/v20/{pPtUuid}', ['uses' => 'DiagnosisController@get_all_temporal_diagnosis']);
    $router->post('diagnosis/v20/', ['uses' => 'DiagnosisController@create']);
    $router->patch('diagnosis/v20/{pServerSideRowUuid}', ['uses' => 'DiagnosisController@delete']);
    $router->put('diagnosis/v20/{pServerSideRowUuid}', ['uses' => 'DiagnosisController@update']);
    $router->options('diagnosis/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('diagnosis/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // Goal
    $router->get('goals/v20/{pPtUuid}', ['uses' => 'GoalController@get_all_temporal_goals']);
    $router->post('goals/v20/', ['uses' => 'GoalController@create']);
    $router->patch('goals/v20/{pServerSideRowUuid}', ['uses' => 'GoalController@delete']);
    $router->put('goals/v20/{pServerSideRowUuid}', ['uses' => 'GoalController@update']);
    $router->options('goals/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });
    $router->options('goals/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });

    // Miscellaneous Notes
    $router->get('miscellaneous-notes/v20/{pPtUuid}', ['uses' => 'MiscellaneousNotesController@get_all_temporal_miscellaneous_notes']);
    //$router->get('miscellaneous-notes/v20/{pServerSideRowUuid}', ['uses' => 'MiscellaneousNotesController@get_one_miscellaneous_note']);
    $router->post('miscellaneous-notes/v20/', ['uses' => 'MiscellaneousNotesController@create']);
    $router->patch('miscellaneous-notes/v20/{pServerSideRowUuid}', ['uses' => 'MiscellaneousNotesController@delete']);
    $router->put('miscellaneous-notes/v20/{pServerSideRowUuid}', ['uses' => 'MiscellaneousNotesController@update']);
    $router->options('miscellaneous-notes/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });
    $router->options('miscellaneous-notes/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });

     // Family History
     $router->get('family-history/v20/{pPtUuid}', ['uses' => 'FamilyHistoryController@get_all_temporal_family_history']);
     $router->post('family-history/v20/', ['uses' => 'FamilyHistoryController@create']);
     $router->patch('family-history/v20/{pServerSideRowUuid}', ['uses' => 'FamilyHistoryController@delete']);
     $router->put('family-history/v20/{pServerSideRowUuid}', ['uses' => 'FamilyHistoryController@update']);
     $router->options('family-history/v20', function () {
         return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
         ->header('Access-Control-Allow-Credentials', 'true')
         ->header('Connection', 'keep-alive');
     });
     $router->options('family-history/v20/{pServerSideRowUuid}', function () {
         return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
         ->header('Access-Control-Allow-Credentials', 'true')
         ->header('Connection', 'keep-alive');
     });

     // Social History
    $router->get('social-history/v20/{pPtUuid}', ['uses' => 'SocialHistoryController@get_all_temporal_social_histories']);
    $router->post('social-history/v20/', ['uses' => 'SocialHistoryController@create']);
    $router->put('social-history/v20/{pServerSideRowUuid}', ['uses' => 'SocialHistoryController@update']);
    $router->options('social-history/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('social-history/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // Name
    $router->get('user/v20/{pPtUuid}', ['uses' => 'UserController@get_user_detail']);
    $router->put('user/v20/{pServerSideRowUuid}', ['uses' => 'UserController@update']);
    $router->options('user/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('user/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // Medical Review of System
    $router->get('medical-review-of-system/v20/{pPtUuid}', ['uses' => 'MedicalReviewOfSystemController@get_all_temporal_medical_review_of_system']);
    $router->post('medical-review-of-system/v20/', ['uses' => 'MedicalReviewOfSystemController@create']);
    $router->put('medical-review-of-system/v20/{pServerSideRowUuid}', ['uses' => 'MedicalReviewOfSystemController@update']);
    $router->options('medical-review-of-system/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    $router->options('medical-review-of-system/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // Date Of Birth
    $router->get('date-of-birth/v20/{pPtUuid}', ['uses' => 'UserController@get_user_detail']);
    $router->put('date-of-birth/v20/{pServerSideRowUuid}', ['uses' => 'UserController@updateDateOfBirth']);
    $router->options('date-of-birth/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('date-of-birth/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });

    // Medication order
    $router->get('medication-order/v20/{pPtUuid}', ['uses' => 'MedicationOrderController@get_all_temporal_medication_order']);
    $router->post('medication-order/v20/', ['uses' => 'MedicationOrderController@create']);
    $router->patch('medication-order/v20/{pServerSideRowUuid}', ['uses' => 'MedicationOrderController@delete']);
    $router->put('medication-order/v20/{pServerSideRowUuid}', ['uses' => 'MedicationOrderController@update']);
    $router->options('medication-order/v20', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });
    $router->options('medication-order/v20/{pServerSideRowUuid}', function () {
        return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Connection', 'keep-alive');
    });
});
