<?php

namespace App\Models;

use App\Traits\GenUid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtherSetting extends Model
{
  use HasFactory, GenUid;
  protected $table = "other_setting";
  protected $guarded = [];
  public $timestamps = false;

  public function scopeFilter($query, array $filters)
  {
    $query->when(
      $filters['search'] ?? false,
      function ($query, $search) {
        return $query->where('keterangan', 'like', '%' . $search . '%');
      }
    );
  }
}
