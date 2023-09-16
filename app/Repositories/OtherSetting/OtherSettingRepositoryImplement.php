<?php

namespace App\Repositories\OtherSetting;

use EasyLaravelPackage\Implementations\Eloquent;
use App\Models\OtherSetting;
use App\Traits\Pagination;

class OtherSettingRepositoryImplement extends Eloquent implements OtherSettingRepository
{
  /**
   * Model class to be used in this repository for the common methods inside Eloquent
   * Don't remove or change $this->model variable name
   * @property Model|mixed $model;
   */
  protected $model;
  use Pagination;

  public function __construct(OtherSetting $model)
  {
    $this->model = $model;
  }

  // Write something awesome :)
  public function getFilterPaginate($arr, $perpage, $aksi)
  {
    $queryFilter = $this->filterData($this->model, $arr);
    return $this->pagination($queryFilter, $perpage);
  }

  public function update($data, $id)
  {
    return $this->model->find($id)->update($data);
  }

  public function findBy($key, $value, $aksi = "=")
  {
    return $this->model->where($key, $aksi, $value)->first();
  }
}
