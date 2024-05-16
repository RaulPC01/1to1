<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // metodo para registrar un nuevo usuario
    public function register(Request $request)
    {
        // validacion de los datos del request
        $request->validate([
            'dni' => 'required|string|unique:users',
            'name' => 'required|string',
            'dateOfBirth' => 'required|date', 
            'email' => 'required|email|unique:users',
            'phone' => 'required|string',
            'password' => 'required|string',
            'image' => 'nullable|string', 
        ]);

        // creacion de un nuevo usuario
        $user = new User();
        $user->dni = $request->dni;
        $user->name = $request->name;
        $user->dateOfBirth = $request->dateOfBirth;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = Hash::make($request->password);
        $user->image = $request->image; // asignacion opcional de la imagen
        $user->save();

        // respuesta exitosa
        return response()->json(['message' => 'usuario registrado exitosamente'], 201);
    }

    // metodo para iniciar sesion
    public function login(Request $request)
    {
        // obtiene las credenciales del request
        $credentials = $request->only('dni', 'password');

        // verifica las credenciales
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            // respuesta exitosa con el token de autenticacion
            return response()->json(['message' => 'inicio de sesion exitoso', 'authToken' => $token], 200);
        }

        // respuesta de error si las credenciales son incorrectas
        return response()->json(['error' => 'credenciales incorrectas'], 401);
    }
}
