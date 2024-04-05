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
        $datos = $request->validate([
            'id_servicio',
            'Dni_usuario',
            'id_categoria',
            'nombre_poblacion',
            'tarifa',
            'descripcion',
            'valoracion_servicio'
        ]);

        // Aquí deberías guardar los datos recibidos en la base de datos
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
