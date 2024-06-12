<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitudes; // importacion del modelo solicitudes
use App\Models\Services; // importacion del modelo services
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facedes\Crypt;
use Illuminate\Support\Facades\Log;
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
            'numero_tarjeta' => 'required|string|max:255',
            'mes_caducidad' => 'required|string|max:255',
            'anyo_caducidad' => 'required|string|max:255',
            'CVV' => 'required|string|max:255',
            'nombre_tarjeta' => 'required|string|max:255',
            'accepted' => 'boolean',
        ]);

        $numero_tarjeta = $validatedData['numero_tarjeta'];
        $mes_caducidad = $validatedData['mes_caducidad'];
        $anyo_caducidad = $validatedData['anyo_caducidad'];
        $CVV = $validatedData['CVV'];

        $validatedData['numero_tarjeta'] = bcrypt($numero_tarjeta);
        $validatedData['mes_caducidad'] = bcrypt($mes_caducidad);
        $validatedData['anyo_caducidad'] = bcrypt($anyo_caducidad);
        $validatedData['CVV'] = bcrypt($CVV);

        // crear la solicitud con los datos validados
        $solicitud = Solicitudes::create($validatedData);
        $solicitud->save();

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




    public function solicitudesPorRealizar ($id_user_proveedor)
    {
    // Buscar todas las solicitudes del proveedor por su ID
    $solicitudes = solicitudes::where('id_user_proveedor', $id_user_proveedor)
                               ->where('accepted', true)
                               ->get();

        // retornar las solicitudes encontradas en formato JSON
        return response()->json($solicitudes);
    }


    public function solicitudesRealizadas($id_user_proveedor)
    {
        // buscar todas las solicitudes del proveedor que han sido aceptadas
        $solicitudes = Solicitudes::where('id_user_proveedor', $id_user_proveedor)
                                  ->where('realizado', true)
                                  ->get();

        // retornar las solicitudes aceptadas encontradas en formato JSON
        return response()->json($solicitudes);
    }
    
    public function RealizarSolicitud($id)
    {
        // buscar la solicitud por su ID
        $solicitud = Solicitudes::findOrFail($id);

        // actualizar el estado de la solicitud a aceptada
        $solicitud->update(['realizado' => true]);

        // retornar un mensaje de exito en formato JSON
        return response()->json(['message' => 'La solicitud ha sido realizada exitosamente.']);
    }
}
