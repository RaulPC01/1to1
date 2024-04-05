<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\services;
use App\Models\User;


class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Aquí se pueden agregar datos de ejemplo para servicios
        $servicesData = [
            
                [
                    'id_usuario_proveedor' => '34567890C',
                    'id_categoria' => 1,
                    'nombre_poblacion' => 3,
                    'tarifa' => 45,
                    'descripcion' => 'Servicio de electricidad',
                    'tipo_servicio' => 'Electricidad',
                    'puntuacion_valoracion' => 3,
                ],
                [
                    'id_usuario_proveedor' => '45678901D',
                    'id_categoria' => 2,
                    'nombre_poblacion' => 4,
                    'tarifa' => 70,
                    'descripcion' => 'Servicio de albañilería',
                    'tipo_servicio' => 'Albañilería',
                    'puntuacion_valoracion' => 4,
                ],
                [
                    'id_usuario_proveedor' => '56789012E',
                    'id_categoria' => 1,
                    'nombre_poblacion' => 5,
                    'tarifa' => 55,
                    'descripcion' => 'Servicio de pintura',
                    'tipo_servicio' => 'Pintura',
                    'puntuacion_valoracion' => 4,
                ],
                [
                    'id_usuario_proveedor' => '67890123F',
                    'id_categoria' => 2,
                    'nombre_poblacion' => 6,
                    'tarifa' => 65,
                    'descripcion' => 'Servicio de limpieza',
                    'tipo_servicio' => 'Limpieza',
                    'puntuacion_valoracion' => 5,
                ],
                [
                    'id_usuario_proveedor' => '78901234G',
                    'id_categoria' => 1,
                    'nombre_poblacion' => 7,
                    'tarifa' => 50,
                    'descripcion' => 'Servicio de jardinería',
                    'tipo_servicio' => 'Jardinería',
                    'puntuacion_valoracion' => 4,
                ],
                [
                    'id_usuario_proveedor' => '89012345H',
                    'id_categoria' => 2,
                    'nombre_poblacion' => 8,
                    'tarifa' => 60,
                    'descripcion' => 'Servicio de fontanería',
                    'tipo_servicio' => 'Fontanería',
                    'puntuacion_valoracion' => 5,
                ],
                [
                    'id_usuario_proveedor' => '90123456I',
                    'id_categoria' => 1,
                    'nombre_poblacion' => 9,
                    'tarifa' => 45,
                    'descripcion' => 'Servicio de carpintería',
                    'tipo_servicio' => 'Carpintería',
                    'puntuacion_valoracion' => 4,
                ],
                [
                    'id_usuario_proveedor' => '01234567J',
                    'id_categoria' => 2,
                    'nombre_poblacion' => 10,
                    'tarifa' => 70,
                    'descripcion' => 'Servicio de electricidad',
                    'tipo_servicio' => 'Electricidad',
                    'puntuacion_valoracion' => 5,
                ],
                [
                    'id_usuario_proveedor' => '98345432X',
                    'id_categoria' => 3,
                    'nombre_poblacion' => 5,
                    'tarifa' => 80,
                    'descripcion' => 'Reparación de fontanería',
                    'tipo_servicio' => 'Fontanería',
                    'puntuacion_valoracion' => 4,
                ],
                [
                    'id_usuario_proveedor' => '87611321Y',
                    'id_categoria' => 1,
                    'nombre_poblacion' => 8,
                    'tarifa' => 100,
                    'descripcion' => 'Servicio de limpieza doméstica',
                    'tipo_servicio' => 'Limpieza',
                    'puntuacion_valoracion' => 4,
                ],
                [
                    'id_usuario_proveedor' => '76501210Z',
                    'id_categoria' => 5,
                    'nombre_poblacion' => 3,
                    'tarifa' => 90,
                    'descripcion' => 'Instalación de sistemas de seguridad',
                    'tipo_servicio' => 'Seguridad',
                    'puntuacion_valoracion' => 5,
                ],
                [
                    'id_usuario_proveedor' => '65400109W',
                    'id_categoria' => 4,
                    'nombre_poblacion' => 7,
                    'tarifa' => 120,
                    'descripcion' => 'Servicio de pintura de interiores',
                    'tipo_servicio' => 'Pintura',
                    'puntuacion_valoracion' => 4,
                ],
                [
                    'id_usuario_proveedor' => '54329068V',
                    'id_categoria' => 2,
                    'nombre_poblacion' => 6,
                    'tarifa' => 110,
                    'descripcion' => 'Reparación de electrodomésticos',
                    'tipo_servicio' => 'Electrodomésticos',
                    'puntuacion_valoracion' => 3,
                ],
                [
                    'id_usuario_proveedor' => '43234987U',
                    'id_categoria' => 3,
                    'nombre_poblacion' => 4,
                    'tarifa' => 95,
                    'descripcion' => 'Servicio de fontanería urgente',
                    'tipo_servicio' => 'Fontanería',
                    'puntuacion_valoracion' => 5,
                ],
                [
                    'id_usuario_proveedor' => '32105336T',
                    'id_categoria' => 1,
                    'nombre_poblacion' => 9,
                    'tarifa' => 85,
                    'descripcion' => 'Limpieza de oficinas',
                    'tipo_servicio' => 'Limpieza',
                    'puntuacion_valoracion' => 4,
                ],
                [
                    'id_usuario_proveedor' => '21033765S',
                    'id_categoria' => 5,
                    'nombre_poblacion' => 2,
                    'tarifa' => 75,
                    'descripcion' => 'Instalación de cámaras de vigilancia',
                    'tipo_servicio' => 'Seguridad',
                    'puntuacion_valoracion' => 4,
                ],
                [
                    'id_usuario_proveedor' => '10933354R',
                    'id_categoria' => 4,
                    'nombre_poblacion' => 1,
                    'tarifa' => 130,
                    'descripcion' => 'Pintura de exteriores',
                    'tipo_servicio' => 'Pintura',
                    'puntuacion_valoracion' => 5,
                ],
                [
                    'id_usuario_proveedor' => '09891823Q',
                    'id_categoria' => 2,
                    'nombre_poblacion' => 10,
                    'tarifa' => 75,
                    'descripcion' => 'Reparación de aire acondicionado',
                    'tipo_servicio' => 'Climatización',
                    'puntuacion_valoracion' => 3,
                ],
                [
                    'id_usuario_proveedor' => '98773432P',
                    'id_categoria' => 3,
                    'nombre_poblacion' => 5,
                    'tarifa' => 85,
                    'descripcion' => 'Reparación de tuberías',
                    'tipo_servicio' => 'Fontanería',
                    'puntuacion_valoracion' => 4,
                ],
                [
                    'id_usuario_proveedor' => '87653321O',
                    'id_categoria' => 1,
                    'nombre_poblacion' => 8,
                    'tarifa' => 95,
                    'descripcion' => 'Limpieza profunda de hogar',
                    'tipo_servicio' => 'Limpieza',
                    'puntuacion_valoracion' => 4,
                ],
          
            
        ];
        
        // $user = User::where('email', 'g@g.com')->first();

        // Crea un servicio asociado a este usuario
        // services::create([
        //     'id_usuario_proveedor' => $user->dni,
        //     'id_categoria' => 1, // Ajusta el ID de la categoría según tu estructura de datos
        //     'nombre_poblacion' => 1, // Ajusta el ID de la población según tu estructura de datos
        //     'tarifa' => 0, // Ajusta la tarifa según tu estructura de datos
        //     'descripcion' => 'Descripción del servicio',
        //     'tipo_servicio' => 'Tipo del servicio',
        //     'puntuacion_valoracion' => 0, // Puntuación inicial
        // ]);
  


        foreach ($servicesData as $serviceData) {
            services::create($serviceData);
        }
    }
}
