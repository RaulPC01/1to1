<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\solicitudes;
use App\Models\services;

use function Laravel\Prompts\error;

class solicitudesController extends Controller
{
    public function create(Request $request)
    {
        dd('ola');
        
        // Validar los datos del formulario
        $validatedData = $request->validate([
            'id_user' => 'required|string',
            'id_servicio' => 'required|integer',
            'id_user_proveedor' => 'required|string',
            'descripcion' => 'required|string', // Cambiado a 'string' en lugar de 'text'
            'date_servicio' => 'required|date',
            'telefono_user' => 'required|string', // Cambiado a 'string' en lugar de 'integer'
            'accepted' => 'required|boolean', // Cambiado a 'boolean' en lugar de 'accpeted'
        ]);

        // Crear el servicio con los datos validados
        $service = solicitudes::create([
            'id_user' => $validatedData['id_user'], // Corregido a 'id_user'
            'id_servicio' => $validatedData['id_servicio'], // Corregido a 'id_servicio'
            'id_user_proveedor' => $validatedData['id_user_proveedor'], // Corregido a 'id_user_proveedor'
            'descripcion' => $validatedData['descripcion'],
            'date_servicio' => $validatedData['date_servicio'],
            'telefono_user' => $validatedData['telefono_user'],
            'accepted' => $validatedData['accepted'], // Corregido a 'accepted'
        ]);

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


    public function verMisSolcitudes($user_dni) {

        try{
            
        } catch(\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al retornar las solcitudes: ' . $e->getMessage()], 500);
        }
    }
}

