<?php

namespace App\Repositories\Contact;

use EasyLaravelPackage\Implementations\Eloquent;
use App\Models\Contact;
use App\Traits\Pagination;

class ContactRepositoryImplement extends Eloquent implements ContactRepository
{
  /**
  * Model class to be used in this repository for the common methods inside Eloquent
  * Don't remove or change $this->model variable name
  * @property Model|mixed $model;
  */
  protected $model;
  use Pagination;

  public function __construct(Contact $model)
  {
      $this->model = $model;
  }

  // Write something awesome :)
  public function getFilterPaginate($arr, $perpage, $aksi)
  {
    $queryFilter = $this->filterData($this->model, $arr);
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
    return $this->model->find($id)->delete();
  }

  public function getContactList()
  {
    return $this->model->get();
  }
}
