<?php

namespace App\Models;

use App\Traits\GenUid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
  use HasFactory, GenUid;
  protected $table = "payment_banks";
  protected $guarded = [];
  public $timestamps = false;

  public function scopeFilter($query, array $filters)
  {
    $query->when(
      $filters['search'] ?? false,
      function ($query, $search) {
        return $query->where('nama_bank', 'like', '%' . $search . '%')
          ->orWhere('rekening', 'like', '%' . $search . '%')
          ->orWhere('an', 'like', '%' . $search . '%');
      }
    );
  }
}
