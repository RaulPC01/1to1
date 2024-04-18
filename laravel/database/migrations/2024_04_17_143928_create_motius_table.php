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
        Schema::create('motius_noms', function (Blueprint $table) {
            $table->id();
            $table->string('Nom_Motiu');
            $table->timestamps();
        });

        Schema::create('motius', function (Blueprint $table) {
            $table->id(); 
            $table->string('user_id');
            $table->foreign('user_id')->references('dni')->on('users')->onDelete('cascade');
            $table->string('Nom');
            $table->string('Cognom');
            $table->unsignedBigInteger('Motiu'); // Use unsignedBigInteger for foreign keys
            $table->foreign('Motiu')->references('id')->on('motius_noms')->onDelete('cascade');
            $table->text('descripcio_motiu')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('motius');
        Schema::dropIfExists('motius_noms');
    }
};
