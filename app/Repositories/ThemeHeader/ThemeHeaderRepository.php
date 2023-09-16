<?php

namespace App\Repositories\ThemeHeader;

use EasyLaravelPackage\Repository;

interface ThemeHeaderRepository extends Repository
{
  // Write something awesome :)
  public function getThemeHeader();
  public function updateThemeHeader($data, $id);
}
