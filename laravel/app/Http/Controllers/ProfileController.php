<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class ProfileController extends Controller
{
   
    public function show()
    {
        try {
            // Verificar si el usuario está autenticado
            if (Auth::check()) {
                // Obtener el usuario autenticado
                $user = Auth::user();
                // Devolver el perfil del usuario como respuesta JSON
                return response()->json($user);
            } else {
                // Si el usuario no está autenticado, devolver un error de autenticación
                return response()->json(['error' => 'Usuario no autenticado'], 401);
            }
        } catch (\Exception $e) {
            // Manejar el error
            return response()->json(['error' => 'Error al buscar el usuario: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $dni)
    {
        // buscar el usuario por DNI
        $user = User::where('dni', $dni)->first();
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    
        // actualizar el usuario con los datos del request
        $user->update($request->all());
        return response()->json(['message' => 'Usuario actualizado con éxito', 'usuario' => $user], 200);
    }
}