<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\services;
use App\Models\User;
use App\Models\categories;
use App\Models\comentarios;
use Illuminate\Support\Facades\Auth;
use Symfony\Contracts\Service\Attribute\Required;

class ServiceController extends Controller
{
    public function createService(Request $request)
    {
        // Validar los datos del formulario
        $validatedData = $request->validate([
            'idUser' => 'required|string',
            'nombre' => 'required|string',
            'precio' => 'required|integer',
            'categoria' => 'required|integer',
            'poblacion' => 'required|integer',
            'descripcion' => 'required|string',
        ]);

        // Obtener el ID del usuario del formulario
        $idUsuarioProveedor = $validatedData['idUser'];

        // Crear el servicio con los datos validados
        $service = services::create([
            'id_usuario_proveedor' => $idUsuarioProveedor,
            'id_categoria' => $validatedData['categoria'],
            'nombre_poblacion' => $validatedData['poblacion'],
            'tarifa' => $validatedData['precio'],
            'descripcion' => $validatedData['descripcion'],
            'tipo_servicio' => $validatedData['nombre'],
            'puntuacion_valoracion' => 0, 
        ]);

        // Retornar la respuesta JSON con el servicio creado y el código de estado 201 (Created)
        return response()->json($service, 201);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function getTopRated()
    {
        $services = services::with('user', 'poblacion', 'categories')->orderByDesc('puntuacion_valoracion')->get();
        return response()->json($services);
    }

   
    public function getServiceWithRelations($serviceId)
    {
        // Obtener el servicio con sus relaciones cargadas, incluyendo el usuario y su perfil
        $service = services::with('user.profile', 'categories', 'poblacion')->find($serviceId);
        
        // Retorna el servicio en formato JSON
        return response()->json($service);
    }


    public function createComentarios(Request $request)
    {
        // Validar los datos del formulario
        $validatedData = $request->validate([
            'IdUsuarioComentario' => 'required|string',
            'Nombre_user' => 'required|string',
            'mensage' => 'required|string',
            'id_Servicio' => 'required|string', // Cambiado a 'string' en lugar de 'text'
           
        ]);
    
        // Crear el servicio con los datos validados
        $service = comentarios::create($validatedData);
    
        // Retornar la respuesta JSON con el servicio creado y el código de estado 201 (Created)
        return response()->json($service, 201);
    }

    public function comentariosDeServicio($idServicio)
    {
        // Seleccionar todos los comentarios del servicio especificado
        $comentarios = comentarios::where('id_Servicio', $idServicio)->get();
        
        return response()->json(['comentarios' => $comentarios], 200);
    }

    public function serviciosSegunUsuario($id_usuario_proveedor)
    {
        // Busca todos los servicios del proveedor por su ID
        $services = services::where('id_usuario_proveedor', $id_usuario_proveedor)->get();

        // Retorna los servicios encontrados
        return response()->json($services);
    }

    public function selectServicesByCategory($categoryId)
    {
        // Valida que se haya enviado el ID de la categoría en la solicitud
     
        $services = services::with('user', 'poblacion', 'categories')
        ->whereHas('categories', function ($query) use ($categoryId) {
            $query->where('id_categoria', $categoryId);
        })
        ->orderByDesc('puntuacion_valoracion')
        ->get();

        return response()->json($services);

    }




// Funcion para eliminar un servicio
    public function destroy($id)
    {
        $services = services::find($id);
        if ($services) {
            $services->delete();
            return response()->json(['message' => 'Servicio eliminado con éxito'], 200);
        }
        return response()->json(['error' => 'Servicio no encontrado'], 404);
    }
    
// Funcion para editar un servicio

public function update(Request $request, $id)
{
    $services = services::find($id);
    if (!$services) {
        return response()->json(['message' => 'Servicio no encontrado'], 404);
    }

    $services->update($request->all());
    return response()->json(['message' => 'Servicio actualizado con éxito', 'servicio' => $services], 200);
}
  

   
    
 
}
