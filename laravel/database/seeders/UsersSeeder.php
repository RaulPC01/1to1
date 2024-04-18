<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $names = ['Juan', 'Pedro', 'María', 'Luis', 'Ana', 'Sofía', 'Carlos', 'Laura', 'Pablo', 'Elena'];
        $lastNames = ['González', 'Fernández', 'López', 'Martínez', 'García', 'Sánchez', 'Pérez', 'Gómez', 'Díaz', 'Muñoz'];
        $domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'example.com'];

        $usedEmails = [];
        $usedNames = [];

        $userCount = 0;

        while ($userCount < 15) { // Crear 15 usuarios
            $firstName = $names[array_rand($names)];
            $lastName = $lastNames[array_rand($lastNames)];
            $email = strtolower($firstName . '.' . $lastName . '@' . $domains[array_rand($domains)]);
            $fullName = $firstName . ' ' . $lastName;

            // Verificar si el correo electrónico o el nombre ya existen
            if (!in_array($email, $usedEmails) && !in_array($fullName, $usedNames)) {
                User::create([
                    'dni' => $this->generateUniqueDNI(),
                    'name' => $fullName,
                    'dateOfBirth' => $this->generateRandomDateOfBirth(),
                    'email' => $email,
                    'phone' => $this->generateRandomPhone(),
                    'password' => bcrypt('password'),
                    'valoracion' => rand(1, 5),
                    'image' => null,
                ]);

                // Agregar el correo electrónico y el nombre a las listas de utilizados
                $usedEmails[] = $email;
                $usedNames[] = $fullName;

                $userCount++;
            }
        }
    }

    /**
     * Generate a unique DNI.
     *
     * @return string
     */
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