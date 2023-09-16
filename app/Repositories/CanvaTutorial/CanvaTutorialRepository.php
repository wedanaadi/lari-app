<?php

namespace App\Repositories\CanvaTutorial;

use EasyLaravelPackage\Repository;

interface CanvaTutorialRepository extends Repository
{
  // Write something awesome :)
  public function getCanvaTutorial();
  public function updateCanvaTutorial($data, $id);
}
