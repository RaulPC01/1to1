<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class profile extends Model
{
    use HasFactory;

    protected $fillable = [

        'DNI',
        'link_paypal',
        'experiencia',
        'habilidades',
        'descripcion_personal',
        'foto_ferfil',
             
    ];
}
