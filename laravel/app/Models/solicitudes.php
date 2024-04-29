<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class solicitudes extends Model
{
    use HasFactory;

    protected $table = 'solicitudes';

    protected $fillable = [
        'id_user',
        'id_servicio',
        'id_user_proveedor',
        'nombre_Servicio',
        'name_user_solicitud',
        'descripcion',
        'date_servicio',
        'telefono_user',
        'accepted', // Corregido el nombre del campo
    ];

    protected $casts = [
        'accepted' => 'boolean', // Corregido el nombre del campo
    ];
}
