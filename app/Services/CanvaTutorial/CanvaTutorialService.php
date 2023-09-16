<?php

namespace App\Services\CanvaTutorial;

use EasyLaravelPackage\BaseService;

interface CanvaTutorialService extends BaseService
{
  // Write something awesome :)
  public function getCanvaTutorial();
  public function updateCanvaTutorial($request, $id);
}
