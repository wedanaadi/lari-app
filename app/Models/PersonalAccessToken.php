<?php

namespace App\Models;

use App\Traits\GenUid;
use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

class PersonalAccessToken extends SanctumPersonalAccessToken
{
    use HasFactory, GenUid;

    protected $keyType = "string";

    protected $fillable = [
      // 'id',
      'name',
      'token',
      'abilities',
      'expires_at',
  ];
}
