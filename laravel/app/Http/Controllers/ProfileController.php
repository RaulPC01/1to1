<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Dotenv\Validator;
use App\Models\profile;

class ProfileController extends Controller
{
    public function show()
    {
        try {
            // Verificar si el usuario está autenticado
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'Usuario no autenticado'], 401);
            }
            
            // Obtener el perfil del usuario utilizando un join
            $profile = User::join('profiles', 'users.dni', '=', 'profiles.dni')
                           ->where('users.id', $user->id)
                           ->select('users.*', 'profiles.*')
                           ->first();

            // Verificar si se encontró el perfil
            if (!$profile) {
                return response()->json(['error' => 'Perfil no encontrado'], 404);
            }

            // Devolver los datos del usuario y el perfil
            return response()->json([
                'user' => $user,
                'profile' => $profile
            ]);
        } catch (\Exception $e) {
            // Manejar el error
            return response()->json(['error' => 'Error al buscar el perfil: ' . $e->getMessage()], 500);
        }
    }
    public function update(Request $request, $dni)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,'.$dni,
            'phone' => 'nullable|string|max:20',
            'experiencia' => 'nullable|string', 
            'habilidades' => 'nullable|string',   
            'descripcion_personal' => 'nullable|string', 
        ]);
    
        try {
            $user = User::where('dni', $dni)->firstOrFail();
    
            $profile = Profile::firstOrCreate(['dni' => $dni]);
    
            $user->update([
                'name' => $request('name'),
                'email' => $request('email'),
                'phone' => $request('phone')
            ]);
    
            $profile->update([
                'experiencia' => $request('experiencia'),
                'habilidades' => $request('habilidades'),
                'descripcion_personal' => $request('descripcion_personal')
            ]);
    
            return response()->json(['message' => 'Perfil actualizado correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un error al actualizar el perfil: ' . $e->getMessage()], 500);
        }
    }
    
}
