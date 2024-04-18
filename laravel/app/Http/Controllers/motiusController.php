<?php

namespace App\Http\Controllers;

use App\Models\motius;
use App\Models\motius_noms;
use Illuminate\Http\Request;

class motiusController extends Controller
{
    public function index()
    {
        $motius = motius_noms::all();
        return response()->json($motius);
    }

    public function createtiket(Request $request)
    {
        // Validar los datos del formulario
        $validatedData = $request->validate([
            'idUser' => 'required|string',
            'nombre' => 'required|string',
            'apellidos' => 'required|string',
            'motius' => 'required|string',
            'descripcion' => 'required|string',
          
        ]);

        // Obtener el ID del usuario del formulario
        $idUsuarioProveedor = $validatedData['idUser'];

        // Crear el servicio con los datos validados
        $motius = motius::create([
            'user_id' => $idUsuarioProveedor,
            'Nom' => $validatedData['nombre'],
            'Cognom' => $validatedData['apellidos'],
            'Motiu' => $validatedData['motius'],
            'descripcio_motiu' => $validatedData['descripcion'],
           
          
        ]);

        // Retornar la respuesta JSON con el servicio creado y el código de estado 201 (Created)
        return response()->json($motius, 201);
    }
}