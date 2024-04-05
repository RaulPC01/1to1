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
            'Carpintero',
            'Pintor',
            'Profesor',
            'Mecánico',
            'Electricista',
            'Fontanero',
            'Jardinero',
            'Diseñador gráfico',
            'Programador',
            'Cocinero',
            'Camarero',
            'Albañil',
            'Ingeniero civil',
            'Abogado',
            'Contador',
            'Psicólogo',
            'Médico',
            'Enfermero',
            'Fisioterapeuta',
            'Nutricionista',
            'Entrenador personal',
            'Masajista',
            'Esteticista',
            'Maquillador',
            'Estilista',
            'Decorador',
            'Arquitecto',
            'Traductor',
            'Escritor',
            'Periodista',
            'Actor',
            'Músico',
            'Pintor (artista)',
            'Escultor',
            'Fotógrafo',
            'Modelo',
            'Diseñador de moda',
            'Bailarín',
            'Instructor de yoga',
            'Piloto',
            'Taxista',
            'Conductor de autobús',
            'Repartidor',
            'Guía turístico',
            'Recepcionista',
            'Secretario',
            'Asistente administrativo',
            'Gerente',
            'CEO',
            'Reclutador',
            'Consultor',
            'Analista de datos',
            'Investigador',
            'Científico',
            'Biólogo',
            'Químico',
            'Farmacéutico',
            'Veterinario',
            'Zoólogo',
            'Botánico',
            'Geólogo',
            'Meteorólogo',
        ];
        

        foreach ($categorias as $categoria) {
            categories::create([
                'nombre_cateogira' => $categoria,
                'descripcion' => 'Descripción de ' . $categoria,
            ]);
        }
    }
}

