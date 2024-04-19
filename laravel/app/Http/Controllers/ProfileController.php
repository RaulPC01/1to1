<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;
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
                // Obtener el perfil del usuario
                $profile = $user->profile;
                // Combinar los datos del usuario y el perfil
                $data = [
                    'user' => $user,
                    'profile' => $profile,
                ];
                // Devolver los datos combinados como respuesta JSON
                return response()->json($data);
            } else {
                // Si el usuario no está autenticado, devolver un error de autenticación
                return response()->json(['error' => 'Usuario no autenticado'], 401);
            }
        } catch (\Exception $e) {
            // Manejar el error
            return response()->json(['error' => 'Error al buscar el perfil: ' . $e->getMessage()], 500);
        }
    }
}
