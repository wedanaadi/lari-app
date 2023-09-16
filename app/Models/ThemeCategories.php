<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThemeCategories extends Model
{
  use HasFactory;
  protected $table = 'setting_landing_categories';
  protected $guarded = [];
  public $timestamps = false;
  protected $keyType = 'string';

  public function scopeFilter($query, array $filters)
  {
    $query->when(
      $filters['search'] ?? false,
      function ($query, $search) {
        return $query->where('distance', 'like', '%' . $search . '%')
          ->orWhere('price', 'like', '%' . $search . '%')
          ->orWhere('name', 'like', '%' . $search . '%');
      }
    );
  }
}
