<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\services;
use App\Models\User;
use App\Models\categories;

class ServiceController extends Controller
{
    public function createService(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string',
            'precio' => 'required|numeric',
            'categoria' => 'required|integer',
            'poblacion' => 'required|string',
            'descripcion' => 'required|string',
        ]);

        // Obtener el ID del usuario proveedor desde el token de autenticación
        $idUsuarioProveedor = auth()->user()->dni;

        $service = services::create([
            'id_usuario_proveedor' => $idUsuarioProveedor,
            'id_categoria' => $validatedData['categoria'],
            'nombre_poblacion' => $validatedData['poblacion'],
            'tarifa' => $validatedData['precio'],
            'descripcion' => $validatedData['descripcion'],
            'tipo_servicio' => $validatedData['nombre'],
            'puntuacion_valoracion' => 0, 
        ]);

        return response()->json($service, 201);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function getTopRated()
    {
        $services = services::with('user', 'poblacion', 'categories')->orderByDesc('puntuacion_valoracion')->get();
        return response()->json($services);
    }

   
    public function getServiceWithRelations($serviceId)
    {
        // Obtener el servicio con sus relaciones cargadas, incluyendo el usuario y su perfil
        $service = services::with('user.profile', 'categories', 'poblacion')->find($serviceId);
        
        // Retorna el servicio en formato JSON
        return response()->json($service);
    }

    
       
}
