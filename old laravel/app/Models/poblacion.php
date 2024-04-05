<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class poblacion extends Model
{
    protected $table = 'poblacion';

    use HasFactory;
    protected $fillable = [

        'id_poblacion',
        'nombre_poblacion',
        
    ];
}
