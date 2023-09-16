<?php

namespace App\Http\Controllers;

use App\Services\CanvaTutorial\CanvaTutorialService;
use Illuminate\Http\Request;

class CanvaTutorialController extends Controller
{
  protected $SCanva;

  public function __construct(
    CanvaTutorialService $cts,
  ) {
    $this->SCanva = $cts;
  }

  public function index()
  {
    return $this->SCanva->getCanvaTutorial();
  }

  public function update(Request $request, $id)
  {
    return $this->SCanva->updateCanvaTutorial($request, $id);
  }
}
