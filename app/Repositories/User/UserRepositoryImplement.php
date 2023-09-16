<?php

namespace App\Repositories\User;

use EasyLaravelPackage\Implementations\Eloquent;
use App\Models\User;
use App\Traits\Pagination;

class UserRepositoryImplement extends Eloquent implements UserRepository
{
  /**
   * Model class to be used in this repository for the common methods inside Eloquent
   * Don't remove or change $this->model variable name
   * @property Model|mixed $model;
   */
  protected $model;
  use Pagination;

  public function __construct(User $model)
  {
    $this->model = $model;
  }

  // Write something awesome :)
  public function getFilterPaginate($arr, $perpage, $aksi)
  {
    $queryFilter = $this->filterData($this->model, $arr)
      ->where('role', $aksi)
      ->where('status', 'active')
      ->orderBy('role', 'asc');
    return $this->pagination($queryFilter, $perpage);
  }

  public function insert($data)
  {
    return $this->model->create($data);
  }

  public function update($data, $id)
  {
    return $this->model->find($id)->update($data);
  }

  public function delete($id)
  {
    return $this->model->find($id)->update([
      'status' => 'inactive'
    ]);
  }

  public function findUsername($username)
  {
    return $this->model->where('status','active')->firstWhere('username', $username);
  }
}
