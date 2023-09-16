<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Traits\GenUid;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable, GenUid;
  protected $guarded = [];
  public $timestamps = false;

  public function scopeFilter($query, array $filters)
  {
    $query->when(
      $filters['search'] ?? false,
      function ($query, $search) {
        return $query->where('name', 'like', '%' . $search . '%')
          ->orWhere('username', 'like', '%' . $search . '%')
          ->orWhere('phone', 'like', '%' . $search . '%');
      }
    );
  }
}
