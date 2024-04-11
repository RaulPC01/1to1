<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\categoriesController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ProfileController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::post('/api/services/top-valorated', [ServiceController::class, 'getTopRated'])->name('topRated');

Route::get('services/{id_servicios}', [ServiceController::class, 'getServiceWithRelations']);

Route::middleware('auth:sanctum')->get('/perfil', [ProfileController::class, 'show'] );
Route::get('/categories', [categoriesController::class, 'index']);

Route::post('/api/crear-servicio', [ServiceController::class, 'createService']);



//Route::middleware('auth:api')->get('/obtener-datos-usuario-perfil/{dni}', 'UsuarioController@obenerDatosUsuarioYPerfil');
