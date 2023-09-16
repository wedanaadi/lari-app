<?php

namespace App\Services\User;

use EasyLaravelPackage\BaseService;

interface UserService extends BaseService
{
  // Write something awesome :)
  public function getFilterPaginateUser();
  public function createUser($request);
  public function updateUser($request, $id);
  public function deleteUser($id);
  public function login($request);
  public function logout();
}
