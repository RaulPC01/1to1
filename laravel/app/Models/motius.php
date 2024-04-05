<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class motius extends Model
{
    use HasFactory;
    protected $fillable = [

        'ID_Motiu',
        'nom_motiu',
        'descripcio_motiu',
        
    ];
}
