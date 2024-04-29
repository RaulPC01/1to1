<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\solicitudes;
use App\Models\services;
use Illuminate\Support\Facades\Auth;
use function Laravel\Prompts\error;
use App\Models\User;

class solicitudesController extends Controller
{
    public function create(Request $request)
    {
        // Validar los datos del formulario
        $validatedData = $request->validate([
            'id_user' => 'required|string',
            'id_servicio' => 'required|integer',
            'id_user_proveedor' => 'required|string',
            'nombre_Servicio'  => 'required|string',
            'name_user_solicitud' => 'required|string',
            'descripcion' => 'required|string', // Cambiado a 'string' en lugar de 'text'
            'date_servicio' => 'required|date',
            'telefono_user' => 'required|string', // Cambiado a 'string' en lugar de 'integer'
            'accepted' => '', // Cambiado a 'boolean' en lugar de 'accpeted'
        ]);
    
        // Crear el servicio con los datos validados
        $service = solicitudes::create($validatedData);
    
        // Retornar la respuesta JSON con el servicio creado y el código de estado 201 (Created)
        return response()->json($service, 201);
    }
    
    public function getUserByServiceId($id_servicio)
    {
        // Buscar el servicio por su ID
        $service = services::findOrFail($id_servicio);

        // Obtener el usuario asociado al servicio
        $user = $service->user;

        // Retornar los datos del usuario
        return response()->json($user);
    }

    public function getSolicitudesPorProveedor($id_user_proveedor)
    {
        // Buscar todas las solicitudes del proveedor por su ID
        $solicitudes = solicitudes::where('id_user_proveedor', $id_user_proveedor)->get();

        // Retornar las solicitudes encontradas
        return response()->json($solicitudes);
    }

    public function solicitudesPorAcceptar ($id_user_proveedor)
{
    // Buscar todas las solicitudes del proveedor por su ID
    $solicitudes = solicitudes::where('id_user_proveedor', $id_user_proveedor)
                               ->where('accepted', false)
                               ->get();

    // Retornar las solicitudes encontradas
    return response()->json($solicitudes);
}

public function solicitudesAcceptadas($id_user_proveedor)
{
    // Buscar todas las solicitudes aceptadas del proveedor por su ID
    $solicitudes = solicitudes::where('id_user_proveedor', $id_user_proveedor)
                               ->where('accepted', true)
                               ->get();

    // Retornar las solicitudes aceptadas encontradas
    return response()->json($solicitudes);
}
public function aceptarSolicitud($id)
{
    $solicitud = solicitudes::findOrFail($id);
    
    

    $solicitud->update(['accepted' => true]);

    return response()->json(['message' => 'La solicitud ha sido aceptada exitosamente.']);
}

public function rechazarSolicitud($id)
{
    $solicitud = solicitudes::findOrFail($id);
    
   
        $solicitud->delete(); // Si la solicitud ya ha sido aceptada, eliminarla
        return response()->json(['message' => 'La solicitud ha sido eliminada exitosamente.']);
  
}
}

