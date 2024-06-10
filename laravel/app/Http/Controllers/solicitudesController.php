<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitudes; // importacion del modelo solicitudes
use App\Models\Services; // importacion del modelo services
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class SolicitudesController extends Controller
{
    // metodo para crear una nueva solicitud
    public function create(Request $request)
    {
        // validar los datos del formulario
        $validatedData = $request->validate([
            'id_user' => 'required|string',
            'id_servicio' => 'required|integer',
            'id_user_proveedor' => 'required|string',
            'nombre_Servicio' => 'required|string',
            'name_user_solicitud' => 'required|string',
            'descripcion' => 'required|string',
            'date_servicio' => 'required|date',
            'telefono_user' => 'required|string',
            'accepted' => 'boolean',
            'numero_tarjeta' => 'required|string',
            'mes_caducidad' => 'required|string',
            'anyo_caducidad' => 'required|string',
            'CVV' => 'required|string',
            'nombre_tarjeta' => 'required|string',
        ]);

        

        // crear la solicitud con los datos validados
        $solicitud = Solicitudes::create($validatedData);

        // retornar la respuesta JSON con la solicitud creada y el codigo de estado 201 (Created)
        return response()->json($solicitud, 201);
    }

    // metodo para obtener el usuario asociado a un servicio por su ID
    public function getUserByServiceId($id_servicio)
    {
        // buscar el servicio por su ID
        $service = Services::findOrFail($id_servicio);

        // obtener el usuario asociado al servicio
        $user = $service->user;

        // retornar los datos del usuario en formato JSON
        return response()->json($user);
    }

    // metodo para obtener solicitudes por proveedor por su ID
    public function getSolicitudesPorProveedor($id_user_proveedor)
    {
        // buscar todas las solicitudes del proveedor por su ID
        $solicitudes = Solicitudes::where('id_user_proveedor', $id_user_proveedor)->get();

        // retornar las solicitudes encontradas en formato JSON
        return response()->json($solicitudes);
    }


    public function getMisSolicitudes($userId)
    {
        // Buscar todas las solicitudes del proveedor por su ID
        $solicitudes = solicitudes::where('id_user', $userId)->get();

        // Retornar las solicitudes encontradas
        return response()->json($solicitudes);
    }



    public function solicitudesPorAcceptar ($id_user_proveedor)
{
    // Buscar todas las solicitudes del proveedor por su ID
    $solicitudes = solicitudes::where('id_user_proveedor', $id_user_proveedor)
                               ->where('accepted', false)
                               ->get();

        // retornar las solicitudes encontradas en formato JSON
        return response()->json($solicitudes);
    }

    // metodo para obtener solicitudes aceptadas por proveedor por su ID
    public function solicitudesAcceptadas($id_user_proveedor)
    {
        // buscar todas las solicitudes del proveedor que han sido aceptadas
        $solicitudes = Solicitudes::where('id_user_proveedor', $id_user_proveedor)
                                  ->where('accepted', true)
                                  ->get();

        // retornar las solicitudes aceptadas encontradas en formato JSON
        return response()->json($solicitudes);
    }

    // metodo para aceptar una solicitud por su ID
    public function aceptarSolicitud($id)
    {
        // buscar la solicitud por su ID
        $solicitud = Solicitudes::findOrFail($id);

        // actualizar el estado de la solicitud a aceptada
        $solicitud->update(['accepted' => true]);

        // retornar un mensaje de exito en formato JSON
        return response()->json(['message' => 'la solicitud ha sido aceptada exitosamente.']);
    }

    // metodo para rechazar una solicitud por su ID
    public function rechazarSolicitud($id)
    {
        // buscar la solicitud por su ID
        $solicitud = Solicitudes::findOrFail($id);

        // eliminar la solicitud
        $solicitud->delete();

        // retornar un mensaje de exito en formato JSON
        return response()->json(['message' => 'la solicitud ha sido eliminada exitosamente.']);
    }
}
