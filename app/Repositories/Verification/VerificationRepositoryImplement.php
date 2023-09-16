<?php

namespace App\Repositories\Verification;

use EasyLaravelPackage\Implementations\Eloquent;
use App\Models\Verification;

class VerificationRepositoryImplement extends Eloquent implements VerificationRepository
{
  /**
   * Model class to be used in this repository for the common methods inside Eloquent
   * Don't remove or change $this->model variable name
   * @property Model|mixed $model;
   */
  protected $model;

  public function __construct(Verification $model)
  {
    $this->model = $model;
  }

  // Write something awesome :)
  public function insertData($data)
  {
    return $this->model->create($data);
  }

  public function findBy($key, $val, $act = "=")
  {
    return $this->model->with('user')->where($key,$act,$val)->first();
  }
}
