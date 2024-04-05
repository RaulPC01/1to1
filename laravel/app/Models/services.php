<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class services extends Model
{
    use HasFactory;
    
    protected $table = 'services';
    
    protected $primaryKey = 'id_servicios';
    
    protected $fillable = [
        'id_servicios',
        'id_usuario_proveedor',
        'id_categoria',
        'nombre_poblacion',
        'tarifa',
        'descripcion',
        'tipo_servicio',
        'puntuacion_valoracion',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_usuario_proveedor', 'dni');
    }

    public function poblacion()
    {
        return $this->belongsTo(Poblacion::class, 'nombre_poblacion', 'id_poblacion');
    }

    public function categories()
    {
        return $this->belongsTo(categories::class, 'id_categoria', 'id');
    }

   
}
