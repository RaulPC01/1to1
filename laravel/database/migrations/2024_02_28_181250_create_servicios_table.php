<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
           $table->id('id_servicios');
           $table->string('id_usuario_proveedor');
           $table->foreign('id_usuario_proveedor')->references('dni')->on('users')->onDelete('cascade');
           $table->unsignedBigInteger('id_categoria'); 
           $table->foreign('id_categoria')->references('id')->on('categories')->onDelete('cascade');
           $table->unsignedBigInteger('nombre_poblacion');
           $table->foreign('nombre_poblacion')->references('id_poblacion')->on('poblacion')->onDelete('cascade');
           $table->integer('tarifa');
           $table->text('descripcion');
           $table->string('tipo_servicio');
           $table->integer('puntuacion_valoracion');          
           $table->timestamps();
       });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
