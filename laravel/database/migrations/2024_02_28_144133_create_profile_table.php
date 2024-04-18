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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('dni')->unique(); // Cambiado a unique
            $table->foreign('dni')->references('dni')->on('users')->onDelete('cascade');
            $table->string('link_paypal')->nullable(); // Añadido nullable
            $table->text('experiencia')->nullable(); // Añadido nullable
            $table->text('habilidades')->nullable(); // Añadido nullable
            $table->text('descripcion_personal')->nullable(); // Añadido nullable
            $table->string('foto_perfil')->nullable(); // Cambiado a nullable y corregido el nombre
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};