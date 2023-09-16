<?php

namespace App\Repositories\ThemeSponsorship;

use EasyLaravelPackage\Repository;

interface ThemeSponsorshipRepository extends Repository
{
  // Write something awesome :)
  public function getSponsorship();
  public function getSponsorshipFilter($arr, $perpage);
  public function insertSponsorship($data);
  public function updateSponsorship($data, $id);
  public function deleteSponsorship($id);
  public function getLastKode($awalKode);
  public function findSponsorship($field,$aksi,$value);
}
