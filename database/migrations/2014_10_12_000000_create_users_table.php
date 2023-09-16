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
    Schema::create('users', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->string('username')->unique();
      $table->string('password');
      $table->string('name');
      $table->string('phone');
      $table->enum('role', ['su', 'admin','verifikator']);
      $table->enum('status', ['active', 'inactive']);
      $table->bigInteger('created_at');
      $table->bigInteger('updated_at');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('users');
  }
};
