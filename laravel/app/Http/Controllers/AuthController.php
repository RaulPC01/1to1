<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Profile;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // Método para registrar un nuevo usuario
    public function register(Request $request)
    {
        try {
            // Validación de los datos del request
            $request->validate([
                'documentType' => 'required|string|in:DNI,NIE,passport',
                'dni' => [
                    'required',
                    'string',
                    'unique:users',
                    function ($attribute, $value, $fail) use ($request) {
                        $documentType = $request->input('documentType');
                        if ($documentType === 'DNI' && !preg_match('/^[0-9]{8}[A-Z]$/', $value)) {
                            return $fail('El DNI no es válido.');
                        }
                        if ($documentType === 'NIE' && !preg_match('/^[XYZ][0-9]{7}[A-Z]$/', $value)) {
                            return $fail('El NIE no es válido.');
                        }
                        if ($documentType === 'passport' && !preg_match('/^[A-Z0-9]{5,9}$/', $value)) {
                            return $fail('El pasaporte no es válido.');
                        }
                    }
                ],
                'name' => 'required|string',
                'dateOfBirth' => 'required|date',
                'email' => 'required|email|unique:users',
                'phone' => 'required|string|regex:/^[0-9]{9}$/',
                'password' => 'required|string|min:8',
                'image' => 'nullable|string',
            ]);

            // Creación de un nuevo usuario
            $user = new User();
            $user->documentType = $request->documentType;
            $user->dni = $request->dni;
            $user->name = $request->name;
            $user->dateOfBirth = $request->dateOfBirth;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->password = Hash::make($request->password);
            $user->image = $request->image;
            $user->save();

            // Creación de un perfil para el nuevo usuario
            $profile = new Profile();
            $profile->user_id = $user->id;
            $profile->save();

            return response()->json(['message' => 'Usuario registrado exitosamente'], 201);

        } catch (\Exception $e) {
            Log::error('Error al registrar el usuario: ' . $e->getMessage());
            return response()->json(['error' => 'Error interno del servidor'], 500);
        }
    }

    public function login(Request $request)
    {
        // Obtiene las credenciales del request
        $credentials = $request->only('dni', 'password');

        // Verifica las credenciales
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            // Respuesta exitosa con el token de autenticación
            return response()->json(['message' => 'Inicio de sesión exitoso', 'authToken' => $token], 200);
        }

        // Respuesta de error si las credenciales son incorrectas
        return response()->json(['error' => 'Credenciales incorrectas'], 401);
    }
}
