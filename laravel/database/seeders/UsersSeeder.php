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
        DB::table('users')->insert([
            'dni' => '12345678X',
            'name' => 'John Doe',
            'dateOfBirth' => '1990-01-01',
            'email' => 'johndoe@example.com',
            'phone' => '123456789',
            'password' => Hash::make('password'),
            'valoracion' => null,
            'image' => null,
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
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
