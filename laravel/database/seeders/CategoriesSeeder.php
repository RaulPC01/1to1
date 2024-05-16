<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\categories;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categorias = [
            'Abogado',
            'Actor',
            'Albañil',
            'Analista de datos',
            'Arquitecto',
            'Asistente administrativo',
            'Bailarín',
            'Biólogo',
            'Botánico',
            'Camarero',
            'Carpintero',
            'CEO',
            'Científico',
            'Cocinero',
            'Conductor de autobús',
            'Consultor',
            'Contador',
            'Decorador',
            'Dietista',
            'Diseñador de moda',
            'Diseñador gráfico',
            'Electricista',
            'Enfermero',
            'Entrenador personal',
            'Escritor',
            'Escultor',
            'Esteticista',
            'Estilista',
            'Farmacéutico',
            'Fisioterapeuta',
            'Fontanero',
            'Fotógrafo',
            'Geólogo',
            'Gerente',
            'Guía turístico',
            'Ingeniero civil',
            'Instructor de yoga',
            'Investigador',
            'Jardinero',
            'Maquillador',
            'Masajista',
            'Mecánico',
            'Médico',
            'Meteorólogo',
            'Modelo',
            'Músico',
            'Nutricionista',
            'Periodista',
            'Piloto',
            'Pintor',
            'Pintor (artista)',
            'Profesor',
            'Programador',
            'Psicólogo',
            'Químico',
            'Recepcionista',
            'Reclutador',
            'Repartidor',
            'Secretario',
            'Taxista',
            'Traductor',
            'Veterinario',
            'Zoólogo'
        ];
        
        

        foreach ($categorias as $categoria) {
            categories::create([
                'nombre_cateogira' => $categoria,
                'descripcion' => 'Descripción de ' . $categoria,
            ]);
        }
    }
}

