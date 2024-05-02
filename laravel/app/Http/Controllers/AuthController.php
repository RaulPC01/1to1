<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'dni' => 'required|string|unique:users',
            'name' => 'required|string',
            'dateOfBirth' => 'required|date', // Cambiado a tipo de dato date
            'email' => 'required|email|unique:users',
            'phone' => 'required|string',
            'password' => 'required|string',
            'image' => 'nullable|string', // La imagen ahora es opcional y se espera que sea una cadena Base64
        ]);
    
        $user = new User();
        $user->dni = $request->dni;
        $user->name = $request->name;
        $user->dateOfBirth = $request->dateOfBirth;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = Hash::make($request->password);
        $user->image = $request->image; // Almacenar la imagen codificada en Base64
        $user->save();
    
        return response()->json(['message' => 'Usuario registrado exitosamente'], 201);
    }
    public function login(Request $request)
    {
        // Obtener los datos del formulario
        $credentials = $request->only('dni', 'password');
    
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;
    
            // Si el inicio de sesión es exitoso, enviar el mensaje de éxito junto con el valor del campo "dni"
            return response()->json(['message' => 'Inicio de sesión exitoso', 'authToken' => $token], 200);
        }
    
        // Si las credenciales son incorrectas, devolver un error de inicio de sesión
        return response()->json(['error' => 'Credenciales incorrectas'], 401);
    }
    
    
}