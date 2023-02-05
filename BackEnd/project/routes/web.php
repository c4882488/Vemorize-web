<?php

/** @var \Laravel\Lumen\Routing\Router $router */

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
use Illuminate\Http\Response;

//router uses User

$router->get('/getProfile', [
    'middleware' =>  'EnsureRole:teacher,student',
    'uses' => 'User@getProfile'
]);
$router->put('/updateProfile', [
    'middleware' =>  'EnsureRole:teacher,student',
    'uses' => 'User@updateProfile'
]);

//router uses Word

$router->get('/getWordsetList', [
    'middleware' =>  'EnsureRole:teacher,student',
    'uses' => 'Word@getWordsetList'
]);
$router->get('/getWordsetContent', [
    'middleware' =>  'EnsureRole:teacher,student',
    'uses' => 'Word@getWordsetContent'
]);
$router->post('/newWordset', [
    'middleware' =>  'EnsureRole:teacher',
    'uses' => 'Word@newWordset'
]);
$router->put('/updateWordset', [
    'middleware' =>  'EnsureRole:teacher',
    'uses' => 'Word@updateWordset'
]);
// $router->put('/updateWord', [
//     'middleware' =>  'EnsureRole:teacher',
//     'uses' => 'Word@updateWord'
// ]);
$router->post('/updateWordsetContent', [
    'middleware' =>  'EnsureRole:teacher',
    'uses' => 'Word@updateWordsetContent'
]);

//router uses Quiz

$router->post('/getMemberScore', [
    'middleware' =>  'EnsureRole:teacher,student',
    'uses' => 'Quiz@getMemberScore'
]);
$router->post('/submitStudentScore', [
    'middleware' =>  'EnsureRole:teacher,student',
    'uses' => 'Quiz@submitStudentScore'
]);

//router uses ClassController

$router->get('/getClasses', [
    'middleware' =>  'EnsureRole:teacher,student',
    'uses' => 'ClassController@getClasses'
]);
$router->post('/newClass', [
    'middleware' =>  'EnsureRole:teacher',
    'uses' => 'ClassController@newClass'
]);
$router->post('/getClassMember', [
    'middleware' =>  'EnsureRole:teacher,student',
    'uses' => 'ClassController@getClassMember'
]);
$router->post('/addClassMember', [
    'middleware' =>  'EnsureRole:teacher',
    'uses' => 'ClassController@addClassMember'
]);
$router->delete('/deleteClassMember', [
    'middleware' =>  'EnsureRole:teacher',
    'uses' => 'ClassController@deleteClassMember'
]);
$router->get('/getStudentClasses', [
    'middleware' =>  'EnsureRole:student',
    'uses' => 'ClassController@getStudentClasses'
]);



?>
