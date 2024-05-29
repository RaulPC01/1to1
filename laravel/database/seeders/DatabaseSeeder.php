<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([

            CategoriesSeeder::class,
            PoblacionSeeder::class,
            motius_nomsSeeder::class,
            ServicesSeeder::class,
            UsersSeeder::class,

        ]);
    }
}
