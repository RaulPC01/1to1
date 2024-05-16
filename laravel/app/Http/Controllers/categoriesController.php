<?php

namespace App\Http\Controllers;

use App\Models\Categories; // importacion del modelo categories
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    // metodo para obtener todas las categorias
    public function index()
    {
        // obtiene todas las categorias de la base de datos
        $categorias = Categories::all();

        // retorna las categorias en formato JSON
        return response()->json($categorias);
    }
}
