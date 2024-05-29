<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\str;
use App\Models\User;

class UsersSeeder extends Seeder
{

    public function run()
    {
        $dni = ['78103040P', '90807060R'];
        $nombres = ['Arian Lanuza, Rodriguez', 'Raul Pereira Acosta'];
        $dateOfBirth = ['2002-11-03', '2001-03-23'];
        $email = ['arianlaro@gmail.com', 'raul@gmail.com'];
        $phone = ['655645535', '376687743'];
        $password = ['Arian2002', 'Raul2001' ];
        $valoracion = ['5', '5'];
        $image = ['../assets/imatges/ArianLanuza.jpg', '../assets/imatges/Raul.jpeg'];


        for ($i=0; $i < 2; $i++) { 
            DB::table('users')->insert([
                'dni' => $dni[$i],
                'name' => $nombres[$i],
                'dateOfBirth' => $dateOfBirth[$i],
                'email' => $email[$i],
                'phone' => $phone[$i],
                'password' => Hash::make($password[$i]),
                'valoracion' => $valoracion[$i],
                'image' => $image[$i],
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);    
        }
        
    }

    private function generateUniqueDNI()
    {
        $dni = mt_rand(10000000, 99999999);
        while (User::where('dni', $dni)->exists()) {
            $dni = mt_rand(10000000, 99999999);
        }
        return $dni;
    }

    /**
     * Generate a random date of birth.
     *
     * @return string
     */
    private function generateRandomDateOfBirth()
    {
        return \Carbon\Carbon::now()->subYears(rand(18, 80))->subDays(rand(0, 365))->format('Y-m-d');
    }

    /**
     * Generate a random phone number.
     *
     * @return string
     */
    private function generateRandomPhone()
    {
        return '6' . mt_rand(10000000, 99999999);
    }
}
