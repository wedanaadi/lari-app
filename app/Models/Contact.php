<?php

namespace App\Models;

use App\Traits\GenUid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
  use HasFactory, GenUid;
  protected $table = "contact_email";
  protected $guarded = [];
  public $timestamps = false;

  public function scopeFilter($query, array $filters)
  {
    $query->when(
      $filters['search'] ?? false,
      function ($query, $search) {
        return $query->where('nama_contact', 'like', '%' . $search . '%')
          ->orWhere('no_whatapp', 'like', '%' . $search . '%');
      }
    );
  }
}
