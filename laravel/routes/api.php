<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\MotiusController;
use App\Http\Controllers\PoblacionController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SolicitudesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aqui es donde puedes registrar rutas de la API para tu aplicacion. Estas
| rutas se cargan por el RouteServiceProvider y todas estaran asignadas al
| grupo de middleware "api". Haz algo grandioso!
|
*/

// devuelve el id del usuario autenticado
Route::middleware('auth:sanctum')->get('/user-id', function (Request $request) {
    return $request->user()->id;
});

// rutas para registro y login
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

// obtiene los servicios mejor valorados
Route::post('/api/services/top-valorated', [ServiceController::class, 'getTopRated'])->name('topRated');

// obtiene un servicio con sus relaciones por id
Route::get('services/{id_servicios}', [ServiceController::class, 'getServiceWithRelations']);

// muestra el perfil del usuario autenticado
Route::middleware('auth:sanctum')->get('/perfil', [ProfileController::class, 'show']);

// obtiene todas las categorias
Route::get('/categories', [CategoriesController::class, 'index']);

// obtiene todas las poblaciones
Route::get('/poblaciones', [PoblacionController::class, 'index']);

// crea un nuevo servicio
Route::post('/crear-servicio', [ServiceController::class, 'createService']);

// obtiene los datos del usuario autenticado
Route::middleware('auth:api')->get('/user', [AuthController::class, 'dato']);

// obtiene todos los motivos
Route::get('/motivos', [MotiusController::class, 'index']);

// crea un nuevo ticket
Route::post('/create-tiket', [MotiusController::class, 'createtiket']);

// crea una nueva solicitud
Route::post('/crearSolicitud', [SolicitudesController::class, 'create']);

// obtiene el usuario por id de servicio
Route::get('/services/{id_servicio}/user', [SolicitudesController::class, 'getUserByServiceId']);

// crea un nuevo comentario
Route::post('/resena', [ServiceController::class, 'createComentarios']);

// obtiene los comentarios de un servicio por id
Route::get('servicios/{id_servicio}/comentarios', [ServiceController::class, 'comentariosDeServicio']);




//-----------------------------------SOLICITUDES-----------------------------//
// obtiene las solicitudes por id del proveedor
Route::get('/solicitudes/{id_user_proveedor}', [SolicitudesController::class, 'getSolicitudesPorProveedor']);

// obtiene las solicitudes por aceptar por id del proveedor
Route::get('/por-acceptar/{id_user_proveedor}', [SolicitudesController::class, 'solicitudesPorAcceptar']);

// obtiene las solicitudes aceptadas por id del proveedor
Route::get('/solicitudes-aceptadas/{id_user_proveedor}/', [SolicitudesController::class, 'solicitudesAcceptadas']);

// acepta una solicitud por id
Route::put('/solicitudes/{id}/aceptar', [SolicitudesController::class, 'aceptarSolicitud']);

// rechaza una solicitud por id
Route::delete('/solicitudes/{id}/rechazar', [SolicitudesController::class, 'rechazarSolicitud']);

//Se obtiene las solicitudes por aceptar por id del proveedor
Route::get('/por-realizar/{id_user_proveedor}', [SolicitudesController::class, 'solicitudesPorRealizar']);

//Se obtiene las solicitudes realizadas por id del proveedor
Route::get('/solicitudes-realizadas/{id_user_proveedor}/', [SolicitudesController::class, 'solicitudesRealizadas']);

// Realiza una servicio con el id de la solicitud
Route::put('/solicitudes/{id}/realizar', [SolicitudesController::class, 'RealizarSolicitud']);




// obtiene los servicios segun el usuario proveedor por id
Route::get('/serviciosUser/{id_usuario_proveedor}', [ServiceController::class, 'serviciosSegunUsuario']);

// selecciona servicios por categoria
Route::get('/services/por-categroia/{category_id}', [ServiceController::class, 'selectServicesByCategory']);

// elimina un servicio por id
Route::delete('/servicios/{id}', [ServiceController::class, 'destroy']);

// actualiza un servicio por id
Route::put('/servicios/{id}', [ServiceController::class, 'update']);

// busca servicios
Route::get('/buscar-servicios', [ServiceController::class, 'buscarServicios']);

Route::get ('/mis-peticiones/{userId}' , [solicitudesController::class, 'getMisSolicitudes']);

Route::put('/users/{id}/update', [ProfileController::class, 'update']);
