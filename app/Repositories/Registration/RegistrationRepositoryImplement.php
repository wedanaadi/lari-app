<?php

namespace App\Repositories\Registration;

use EasyLaravelPackage\Implementations\Eloquent;
use App\Models\Registration;
use App\Traits\Pagination;
use Illuminate\Support\Facades\DB;

class RegistrationRepositoryImplement extends Eloquent implements RegistrationRepository
{
  /**
   * Model class to be used in this repository for the common methods inside Eloquent
   * Don't remove or change $this->model variable name
   * @property Model|mixed $model;
   */
  protected $model;
  use Pagination;

  public function __construct(Registration $model)
  {
    $this->model = $model;
  }

  // Write something awesome :)
  public function getRegistration()
  {
    return $this->model->get();
  }

  public function getRegistrationFilter($arr, $perpage)
  {
    $queryFilter = $this->filterData($this->model, $arr)
      ->orderBy('status', 'asc')
      ->orderBy('registration_number', 'asc');
    return $this->pagination($queryFilter->with('category'), $perpage);
  }

  public function insertRegistration($data)
  {
    return $this->model->insert($data);
  }

  public function getLastKode($awalKode)
  {
    return $this->model->select(DB::raw('MAX(registration_number) AS kode'))
      ->where(DB::raw('SUBSTR(registration_number,1,7)'), $awalKode)
      ->first()
      ->kode;
  }

  public function updateRegistration($data, $id)
  {
    return $this->find($id)->update($data);
  }

  public function findRegistrasi($noReg, $email, $isCount = false)
  {
    $result = $this->model
      ->with('category')
      ->where('registration_number', $noReg)
      ->where('email', $email);
    if ($isCount) {
      return $result->count();
    }
    return $result->first();
  }

  public function findRegisterWith($id)
  {
    return $this->model
      ->with('category')
      ->where('id', $id)
      ->first();
  }

  public function getTotalRegister($aksi)
  {
    return $this->model->where('status', $aksi)->count();
  }
}
