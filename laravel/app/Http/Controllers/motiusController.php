<?php

namespace App\Http\Controllers;

use App\Models\Motius; // importacion del modelo motius
use App\Models\motius_noms;
use App\Models\MotiusNoms; // importacion del modelo motius_noms
use Illuminate\Http\Request;

class MotiusController extends Controller
{
    // metodo para obtener todos los motivos
    public function index()
    {
        // obtiene todos los motivos de la base de datos
        $motius = motius_noms::all();

        // retorna los motivos en formato JSON
        return response()->json($motius);
    }

    // metodo para crear un nuevo ticket
    public function createtiket(Request $request)
    {
        // validar los datos del formulario
        $validatedData = $request->validate([
            'idUser' => 'required|string',
            'nombre' => 'required|string',
            'apellidos' => 'required|string',
            'motius' => 'required|string',
            'descripcion' => 'required|string',
        ]);

        // obtener el ID del usuario del formulario
        $idUsuarioProveedor = $validatedData['idUser'];

        // crear el motivo con los datos validados
        $motius = Motius::create([
            'user_id' => $idUsuarioProveedor,
            'Nom' => $validatedData['nombre'],
            'Cognom' => $validatedData['apellidos'],
            'Motiu' => $validatedData['motius'],
            'descripcio_motiu' => $validatedData['descripcion'],
        ]);

        // retornar la respuesta JSON con el motivo creado y el codigo de estado 201 (Created)
        return response()->json($motius, 201);
    }
}
