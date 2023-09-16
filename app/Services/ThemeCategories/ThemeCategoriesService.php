<?php

namespace App\Services\ThemeCategories;

use EasyLaravelPackage\BaseService;

interface ThemeCategoriesService extends BaseService
{
  // Write something awesome :)
  public function getCategories();
  public function createCategories($request);
  public function updateCategories($request, $id);
  public function deleteCategories($id);
  public function getCategoriesFilterPaginate($arr, $perpage);
}
