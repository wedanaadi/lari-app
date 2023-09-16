<?php

namespace App\Repositories\Bank;

use EasyLaravelPackage\Repository;

interface BankRepository extends Repository
{
  // Write something awesome :)
  public function insert($data);
  public function update($data, $id);
  public function delete($id);
  public function getFilterPaginate($arr, $perpage, $aksi);
  public function getBankList();
}
