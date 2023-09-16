<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
  use HasFactory;
  protected $table = 'registrations';
  protected $guarded = [];
  public $timestamps = false;
  protected $keyType = 'string';

  public function category() {
    return $this->belongsTo(ThemeCategories::class, "categories_id", "id");
  }

  public function scopeFilter($query, array $filters)
  {
    $query->when(
      $filters['search'] ?? false,
      function ($query, $search) {
        return $query->where('registration_number', 'like', '%' . $search . '%')
          ->orWhere('full_name', 'like', '%' . $search . '%')
          ->orWhere('bib_name', 'like', '%' . $search . '%')
          ->orWhereHas('category', function ($query) use ($search) {
            $query->where('name', 'like', '%' . $search . '%');
          });
      }
    );
  }
}
