<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class motius extends Model
{
    use HasFactory;
    protected $table = 'motius';
    protected $fillable = [
        'user_id',
        'Nom',
        'Cognom',
        'Motiu',
        'descripcio_motiu',
        
    ];
}
