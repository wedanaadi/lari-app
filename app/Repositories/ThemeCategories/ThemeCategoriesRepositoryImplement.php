<?php

namespace App\Repositories\ThemeCategories;

use EasyLaravelPackage\Implementations\Eloquent;
use App\Models\ThemeCategories;
use App\Traits\Pagination;
use Illuminate\Support\Facades\DB;

class ThemeCategoriesRepositoryImplement extends Eloquent implements ThemeCategoriesRepository
{
  /**
  * Model class to be used in this repository for the common methods inside Eloquent
  * Don't remove or change $this->model variable name
  * @property Model|mixed $model;
  */
  protected $model;
  use Pagination;

  public function __construct(ThemeCategories $model)
  {
      $this->model = $model;
  }

  // Write something awesome :)
  public function getCategories()
  {
    return $this->model->orderBy('id','ASC')->get();
  }

  public function insertCategori($data)
  {
    return $this->model->insert($data);
  }

  public function updateCategori($data, $id)
  {
    return $this->find($id)->update($data);
  }

  public function deleteCategori($id)
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

  public function getCategoriesFilter($arr, $perpage)
  {
    $queryFilter = $this->filterData($this->model, $arr);
    return $this->pagination($queryFilter, $perpage);
  }
}
