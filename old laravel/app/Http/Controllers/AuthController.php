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
            'dateOfBirth' => 'required|string',
            'email' => 'required|email|unique:users',
            'phone' => 'required|string',
            'password' => 'required|string',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Añade validaciones para la imagen
        ]);
    
        // Guardar la imagen en un directorio
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads'), $imageName);
            $imagePath = '/uploads/' . $imageName;
        } else {
            $imagePath = null;
        }
    
        // Crear un nuevo objeto User con los datos del formulario
        $user = new User();
        $user->dni = $request->dni;
        $user->name = $request->name;
        $user->dateOfBirth = $request->dateOfBirth;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = Hash::make($request->password);
        $user->image = $imagePath;
        $user->created_at = now();
    
        // Guardar el nuevo usuario en la base de datos
        $user->save();
    
        // Redirigir al formulario de inicio de sesión después del registro
        return redirect()->route('login');
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
