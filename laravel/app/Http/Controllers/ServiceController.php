<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Services;
use App\Models\User;
use App\Models\Categories;
use App\Models\Comentarios;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    // metodo para crear un nuevo servicio
    public function createService(Request $request)
    {
        // validar los datos del formulario
        $validatedData = $request->validate([
            'idUser' => 'required|string',
            'nombre' => 'required|string',
            'precio' => 'required|integer',
            'categoria' => 'required|integer',
            'poblacion' => 'required|integer',
            'descripcion' => 'required|string',
        ]);

        // obtener el ID del usuario del formulario
        $idUsuarioProveedor = $validatedData['idUser'];

        // crear el servicio con los datos validados
        $service = Services::create([
            'id_usuario_proveedor' => $idUsuarioProveedor,
            'id_categoria' => $validatedData['categoria'],
            'nombre_poblacion' => $validatedData['poblacion'],
            'tarifa' => $validatedData['precio'],
            'descripcion' => $validatedData['descripcion'],
            'tipo_servicio' => $validatedData['nombre'],
            'puntuacion_valoracion' => 0,
        ]);

        // retornar la respuesta JSON con el servicio creado y el codigo de estado 201 (Created)
        return response()->json($service, 201);
    }

    // metodo para relacionar el servicio con el usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // metodo para obtener los servicios mejor valorados
    public function getTopRated()
    {
        // obtener los servicios mejor valorados con sus relaciones
        $services = Services::with('user', 'poblacion', 'categories')
                            ->orderByDesc('puntuacion_valoracion')
                            ->get();

        return response()->json($services);
    }

    // metodo para obtener un servicio con sus relaciones por ID
    public function getServiceWithRelations($serviceId)
    {
        // obtener el servicio con sus relaciones cargadas
        $service = Services::with('user.profile', 'categories', 'poblacion')
                           ->find($serviceId);

        // retorna el servicio en formato JSON
        return response()->json($service);
    }

    // metodo para crear comentarios
    public function createComentarios(Request $request)
    {
        // validar los datos del formulario
        $validatedData = $request->validate([
            'IdUsuarioComentario' => 'required|string',
            'Nombre_user' => 'required|string',
            'mensage' => 'required|string',
            'id_Servicio' => 'required|string',
        ]);

        // crear el comentario con los datos validados
        $comentario = Comentarios::create($validatedData);

        // retornar la respuesta JSON con el comentario creado y el codigo de estado 201 (Created)
        return response()->json($comentario, 201);
    }

    // metodo para obtener comentarios de un servicio por ID
    public function comentariosDeServicio($idServicio)
    {
        // seleccionar todos los comentarios del servicio especificado
        $comentarios = Comentarios::where('id_Servicio', $idServicio)->get();

        return response()->json(['comentarios' => $comentarios], 200);
    }

    // metodo para obtener servicios segun el usuario proveedor por ID
    public function serviciosSegunUsuario($id_usuario_proveedor)
    {
        // busca todos los servicios del proveedor por su ID
        $services = Services::where('id_usuario_proveedor', $id_usuario_proveedor)->get();

        // retorna los servicios encontrados
        return response()->json($services);
    }

    // metodo para seleccionar servicios por categoria
    public function selectServicesByCategory($categoryId)
    {
        // obtener servicios segun la categoria con sus relaciones
        $services = Services::with('user', 'poblacion', 'categories')
                            ->whereHas('categories', function ($query) use ($categoryId) {
                                $query->where('id_categoria', $categoryId);
                            })
                            ->orderByDesc('puntuacion_valoracion')
                            ->get();

        return response()->json($services);
    }

    // metodo para eliminar un servicio por ID
    public function destroy($id)
    {
        // buscar el servicio por ID
        $service = Services::find($id);
        if ($service) {
            // eliminar el servicio si se encuentra
            $service->delete();
            return response()->json(['message' => 'Servicio eliminado con exito'], 200);
        }
        return response()->json(['error' => 'Servicio no encontrado'], 404);
    }

    // metodo para buscar servicios
    public function buscarServicios(Request $request)
    {
        $terminoBusqueda = $request->input('terminoBusqueda');

        // buscar servicios que coincidan con el termino de busqueda
        $servicios = Services::with('user', 'poblacion', 'categories')
                            ->where('tipo_servicio', 'like', '%' . $terminoBusqueda . '%')
                            ->orWhere('descripcion', 'like', '%' . $terminoBusqueda . '%')
                            ->orWhereHas('user', function ($query) use ($terminoBusqueda) {
                                $query->where('name', 'like', '%' . $terminoBusqueda . '%');
                            })
                            ->orWhereHas('poblacion', function ($query) use ($terminoBusqueda) {
                                $query->where('nombre_poblacion', 'like', '%' . $terminoBusqueda . '%');
                            })
                            ->get();

        return response()->json($servicios);
    }

    // metodo para actualizar un servicio por ID
    public function update(Request $request, $id)
    {
        // buscar el servicio por ID
        $service = Services::find($id);
        if (!$service) {
            return response()->json(['message' => 'Servicio no encontrado'], 404);
        }

        // actualizar el servicio con los datos del request
        $service->update($request->all());
        return response()->json(['message' => 'Servicio actualizado con exito', 'servicio' => $service], 200);
    }
}
