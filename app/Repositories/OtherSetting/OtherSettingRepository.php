<?php

namespace App\Repositories\OtherSetting;

use EasyLaravelPackage\Repository;

interface OtherSettingRepository extends Repository
{
  // Write something awesome :)
  public function update($data, $id);
  public function getFilterPaginate($arr, $perpage, $aksi);
  public function findBy($key,$value,$aksi="=");
}
