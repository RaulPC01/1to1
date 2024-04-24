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
        Schema::create('cometarios', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->userDelComentario();
            $table->mensage();
            $table->IdService();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cometarios');
    }
};
