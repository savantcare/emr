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
    $router->patch('reminders/v20/{id}', ['uses' => 'ReminderController@discontinue']);
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

    /**
     * Routing for Height
     */
    $router->get('height/v20/',  ['uses' => 'HeightController@showAllHeights']);
    $router->get('height/v20/{id}', ['uses' => 'HeightController@showOneHeight']);
    $router->post('height/v20/', ['uses' => 'HeightController@create']);
    $router->delete('height/v20/{id}', ['uses' => 'HeightController@delete']);
    $router->put('height/v20/{id}', ['uses' => 'HeightController@update']);
    $router->patch('height/v20/{id}', ['uses' => 'HeightController@discontinue']);
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
     * Routing for Recommendation
     */

    $router->get('recommendations/v20/',  ['uses' => 'RecommendationController@showAllRecommendations']);
    $router->get('recommendations/v20/{id}', ['uses' => 'RecommendationController@showOneRecommendation']);
    $router->post('recommendations/v20/', ['uses' => 'RecommendationController@create']);
    $router->delete('recommendations/v20/{id}', ['uses' => 'RecommendationController@delete']);
    $router->put('recommendations/v20/{id}', ['uses' => 'RecommendationController@update']);
    $router->patch('recommendations/v20/{id}', ['uses' => 'RecommendationController@discontinue']);
    $router->options('recommendations/v20', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
    $router->options('recommendations/v20/{id}', function () {
      return response('OK', \Illuminate\Http\Response::HTTP_NO_CONTENT)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Connection', 'keep-alive');
    });
  });
