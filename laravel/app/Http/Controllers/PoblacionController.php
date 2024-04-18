<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\poblacion;

class PoblacionController extends Controller
{
    public function index()
    {
        $poblacion = poblacion::all();
        return response()->json($poblacion);
    }
}

