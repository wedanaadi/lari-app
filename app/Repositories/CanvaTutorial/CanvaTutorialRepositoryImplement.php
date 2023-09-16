<?php

namespace App\Repositories\CanvaTutorial;

use EasyLaravelPackage\Implementations\Eloquent;
use App\Models\CanvaTutorial;

class CanvaTutorialRepositoryImplement extends Eloquent implements CanvaTutorialRepository
{
  /**
  * Model class to be used in this repository for the common methods inside Eloquent
  * Don't remove or change $this->model variable name
  * @property Model|mixed $model;
  */
  protected $model;

  public function __construct(CanvaTutorial $model)
  {
      $this->model = $model;
  }

  // Write something awesome :)
  public function getCanvaTutorial()
  {
    return $this->model->first();
  }

  public function updateCanvaTutorial($data,$id)
  {
    return $this->model->find($id)->update($data);
  }
}
