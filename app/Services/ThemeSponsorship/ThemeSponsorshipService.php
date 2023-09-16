<?php

namespace App\Services\ThemeSponsorship;

use EasyLaravelPackage\BaseService;

interface ThemeSponsorshipService extends BaseService
{
  // Write something awesome :)
  public function get();
  public function create($request);
  public function updateData($request, $id);
  public function delete($id);
  public function actionImage($requestImage);
  public function removeImage($path);
  public function getSponsorshipFilterPaginate($arr, $perpage);
}
