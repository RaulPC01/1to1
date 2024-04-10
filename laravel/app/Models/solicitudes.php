<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class solicitudes extends Model
{
    use HasFactory;


    protected $table = 'servicios';

    protected $fillable = [
        'id_user',
        'id_servicio',
        'id_user_proveedor',
        'descripcion',
        'date_servicio',
        'telefono_user',
        'accpeted',
        
    ];

    protected $casts = [
        'accpeted' => 'boolean',
    ];
    
}
