<?php

namespace App\Repositories\ThemeSponsorship;

use EasyLaravelPackage\Implementations\Eloquent;
use App\Models\ThemeSponsorship;
use App\Traits\Pagination;
use Illuminate\Support\Facades\DB;

class ThemeSponsorshipRepositoryImplement extends Eloquent implements ThemeSponsorshipRepository
{
  /**
   * Model class to be used in this repository for the common methods inside Eloquent
   * Don't remove or change $this->model variable name
   * @property Model|mixed $model;
   */
  protected $model;
  use Pagination;

  public function __construct(ThemeSponsorship $model)
  {
    $this->model = $model;
  }

  // Write something awesome :)
  public function getSponsorship()
  {
    return $this->model->orderBy('id', 'ASC')->get();
  }

  public function insertSponsorship($data)
  {
    return $this->model->insert($data);
  }

  public function updateSponsorship($data, $id)
  {
    return $this->find($id)->update($data);
  }

  public function deleteSponsorship($id)
  {
    return $this->model->find($id)->delete();
  }

  public function getLastKode($awalKode)
  {
    return $this->model->select(DB::raw('MAX(id) AS kode'))
      ->where(DB::raw('SUBSTR(id,1,7)'), $awalKode)
      ->first()
      ->kode;
  }

  public function findSponsorship($field, $aksi, $value)
  {
    return $this->model->where($field, $aksi, $value)->first();
  }

  public function getSponsorshipFilter($arr, $perpage)
  {
    $queryFilter = $this->filterData($this->model, $arr);
    return $this->pagination($queryFilter, $perpage);
  }
}
