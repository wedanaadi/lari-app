<?php

namespace App\Repositories\ThemeCategories;

use EasyLaravelPackage\Repository;

interface ThemeCategoriesRepository extends Repository
{
  // Write something awesome :)
  public function getCategories();
  public function insertCategori($data);
  public function updateCategori($data,$id);
  public function deleteCategori($id);
  public function getLastKode($awalKode);
  public function getCategoriesFilter($arr, $perpage);
}
