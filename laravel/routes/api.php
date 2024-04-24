<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\categoriesController;
use App\Http\Controllers\motiusController;
use App\Http\Controllers\PoblacionController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\solicitudesController;
use PharIo\Manifest\AuthorElement;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user-id', function (Request $request) {
    return $request->user()->id;
});


Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::post('/api/services/top-valorated', [ServiceController::class, 'getTopRated'])->name('topRated');

Route::get('services/{id_servicios}', [ServiceController::class, 'getServiceWithRelations']);

Route::middleware('auth:sanctum')->get('/perfil', [ProfileController::class, 'show'] ); //para ir a perfil

Route::get('/categories', [categoriesController::class, 'index']);

Route::get('/poblaciones', [PoblacionController::class, 'index']);

Route::post('/crear-servicio', [ServiceController::class, 'createService']);

Route::middleware('auth:api')->get('/user', [AuthController::class, 'dato']);

Route::get('/motivos',[motiusController::class, 'index']);

Route::post('/create-tiket',[motiusController::class, 'createtiket']);

Route::post('/crearSolicitud', [solicitudesController::class, 'create']);

Route::get('/services/{id_servicio}/user', [solicitudesController::class, 'getUserByServiceId']);