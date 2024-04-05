<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\profile;

class profileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $users = User::all();

        foreach ($users as $user) {
            profile::create([
                'dni' => $user->dni,
                'link_paypal' => 'paypal.com/' . $user->username,
                'experiencia' => 'Experiencia laboral de ' . $user->name,
                'habilidades' => 'Habilidades de ' . $user->name,
                'descripcion_personal' => 'Descripción personal de ' . $user->name,
                'foto_perfil' => 'foto_' . $user->username . '.jpg',
            ]);
        }
    }
}
