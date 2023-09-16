<?php

namespace App\Repositories\Contact;

use EasyLaravelPackage\Repository;

interface ContactRepository extends Repository
{
  // Write something awesome :)
  public function insert($data);
  public function update($data, $id);
  public function delete($id);
  public function getFilterPaginate($arr, $perpage, $aksi);
  public function getContactList();
}
