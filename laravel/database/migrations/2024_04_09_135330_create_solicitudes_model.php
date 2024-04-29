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
        Schema::create('solicitudes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('id_user');
            $table->integer('id_servicio');
            $table->string('id_user_proveedor');
            $table->string('nombre_Servicio');
            $table->string('name_user_solicitud');
            $table->text('descripcion');
            $table->date('date_servicio');
            $table->integer('telefono_user')->default(false);
            $table->boolean('accepted')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitudes_model');
    }
};
