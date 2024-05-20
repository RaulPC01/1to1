<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Poblacion; // importacion del modelo poblacion

class PoblacionController extends Controller
{
    // metodo para obtener todas las poblaciones
    public function index()
    {
        // obtiene todas las poblaciones de la base de datos
        $poblacion = Poblacion::all();

        // retorna las poblaciones en formato JSON
        return response()->json($poblacion);
    }
}
