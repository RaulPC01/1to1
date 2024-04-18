<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\motius_noms;

class motius_nomsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Lista de motivos para un ticket en una página web de contratación de servicios
        $motius = [
            'Problemas técnicos',
            'Consulta sobre el servicio',
            'Solicitud de información',
            'Reporte de error',
            'Solicitud de soporte',
            'Facturación y pagos',
            'Problemas de conexión',
            'Actualización de información de cuenta',
            'Cancelación de servicio',
            'Configuración de cuenta',
            'Problemas de rendimiento',
            'Consulta sobre políticas y términos de servicio',
            'Informar sobre un problema de seguridad',
            'Sugerencia de mejora del servicio',
            'Recuperar contraseña o nombre de usuario',
            'Problemas de navegación o usabilidad del sitio web'
        ];

        // Insertar los motivos en la tabla nom_motiu
        foreach ($motius as $motiu) {
            motius_noms::create([
                'Nom_Motiu' => $motiu
            ]);
        }
    }
}
