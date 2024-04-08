<?php

namespace App\Http\Controllers;

use App\Models\categories;
use Illuminate\Http\Request;

class cateogires extends Controller
{
    public function index()
    {
        $categorias = categories::all();
        return response()->json($categorias);
    }
}
