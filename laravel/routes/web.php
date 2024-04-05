<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController; 
use App\Http\Controllers\ServiceController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/api/services/top-valorated', [ServiceController::class, 'getTopRated'])->name('topRated');
Route::get('services/{id_servicios}', [ServiceController::class, 'show']);
Route::middleware('auth:api')->get('/obtener-datos-usuario-perfil', 'UsuarioController@obtenerDatosUsuarioYPerfil');
