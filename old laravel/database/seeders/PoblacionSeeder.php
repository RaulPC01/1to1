<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\poblacion;

class PoblacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $comarcas = [
            'Alt Camp',
            'Alt Empordà',
            'Alt Penedès',
            'Alt Urgell',
            'Alta Ribagorça',
            'Anoia',
            'Bages',
            'Baix Camp',
            'Baix Ebre',
            'Baix Empordà',
            'Baix Llobregat',
            'Baix Penedès',
            'Barcelonès',
            'Berguedà',
            'Cerdanya',
            'Conca de Barberà',
            'Garraf',
            'Garrigues',
            'Garrotxa',
            'Gironès',
            'Maresme',
            'Montsià',
            'Noguera',
            'Osona',
            'Pallars Jussà',
            'Pallars Sobirà',
            'Pla de l\'Estany',
            'Pla d\'Urgell',
            'Priorat',
            'Ribera d\'Ebre',
            'Ripollès',
            'Segarra',
            'Segrià',
            'Selva',
            'Solsonès',
            'Tarragonès',
            'Terra Alta',
            'Urgell',
            'Vallès Occidental',
            'Vallès Oriental'
            
        ];

        foreach ($comarcas as $comarca) {
            poblacion::create([
                'nombre_poblacion' => $comarca,
            ]);
        }
    }
}
