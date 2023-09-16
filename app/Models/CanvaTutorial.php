<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CanvaTutorial extends Model
{
  use HasFactory;
  protected $table = 'canva_tutorial';
  protected $guarded = [];
  public $timestamps = false;
}
