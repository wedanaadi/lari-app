<?php

namespace App\Http\Controllers;

use App\Services\User\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
  protected $SUser;
  public function __construct(UserService $us)
  {
    $this->SUser = $us;
  }

  public function index()
  {
    return $this->SUser->getFilterPaginateUser();
  }

  public function store(Request $request)
  {
    return $this->SUser->createUser($request);
  }

  public function update(Request $request, $id)
  {
    return $this->SUser->updateUser($request,$id);
  }

  public function destroy($id)
  {
    return $this->SUser->deleteUser($id);
  }

  public function login(Request $request)
  {
    return $this->SUser->login($request);
  }

  public function logout()
  {
    return $this->SUser->logout();
  }
}
