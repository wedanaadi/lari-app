<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThemeHeader extends Model
{
    use HasFactory;
    protected $table='setting_landing_header';
    protected $guarded = [];
    public $timestamps = false;
}
