<?php

namespace App\Repositories\ThemeHeader;

use EasyLaravelPackage\Implementations\Eloquent;
use App\Models\ThemeHeader;

class ThemeHeaderRepositoryImplement extends Eloquent implements ThemeHeaderRepository
{
  /**
  * Model class to be used in this repository for the common methods inside Eloquent
  * Don't remove or change $this->model variable name
  * @property Model|mixed $model;
  */
  protected $model;

  public function __construct(ThemeHeader $model)
  {
      $this->model = $model;
  }

  // Write something awesome :)
  public function getThemeHeader()
  {
    return $this->model->first();
  }

  public function updateThemeHeader($data,$id)
  {
    return $this->model->find($id)->update($data);
  }
}
