<?php

namespace App\Repositories\User;

use EasyLaravelPackage\Repository;

interface UserRepository extends Repository
{
  // Write something awesome :)
  public function insert($data);
  public function update($data, $id);
  public function delete($id);
  public function getFilterPaginate($arr, $perpage, $aksi);
  public function findUsername($username);
}
