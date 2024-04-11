<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\services;
use App\Models\User;
use Faker\Factory as Faker;



class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */ public function run()
    {
        // Creamos una instancia de Faker para generar datos aleatorios
        $faker = Faker::create();

        // Obtenemos todos los usuarios de la base de datos
        $users = User::all();

        // Iteramos sobre cada usuario y creamos servicios para cada uno
        foreach ($users as $user) {
            // Creamos 20 servicios para cada usuario
            for ($i = 0; $i < 5; $i++) {
                services::create([
                    'id_usuario_proveedor' => $user->dni,
                    'id_categoria' => $faker->numberBetween(1, 5), // Suponiendo que tienes 5 categorías en tu tabla de categorías
                    'nombre_poblacion' => $faker->numberBetween(1, 10), // Suponiendo que tienes 10 poblaciones en tu tabla de poblaciones
                    'tarifa' => $faker->numberBetween(10, 200),
                    'descripcion' => $faker->sentence(),
                    'tipo_servicio' => 'Servicio ' . $faker->word(),
                    'puntuacion_valoracion' => $faker->numberBetween(1, 5),
                ]);
            }
        }
    }
}
