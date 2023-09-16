<?php

namespace App\Services\Bank;

use EasyLaravelPackage\BaseService;

interface BankService extends BaseService
{
  // Write something awesome :)
  public function getFilterPaginateBank();
  public function createBank($request);
  public function updateBank($request, $id);
  public function deleteBank($id);
}
