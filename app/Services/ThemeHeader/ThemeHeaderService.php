<?php

namespace App\Services\ThemeHeader;

use EasyLaravelPackage\BaseService;

interface ThemeHeaderService extends BaseService
{
  // Write something awesome :)
  public function getHeader();
  public function updateHeader($request, $id);
}
