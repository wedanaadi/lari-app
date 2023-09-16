<?php

namespace App\Services\Registration;

use EasyLaravelPackage\BaseService;

interface RegistrationService extends BaseService
{
  // Write something awesome :)
  public function getRegistration();
  public function createRegistration($request);
  public function verifikasiRegistration($request, $id);
  public function findUser($noRegister,$email);
  public function getRegistrationFilterPaginate($arr, $perpage);
  public function dashboardCard();
  public function findVerifikator($idRegister);
}
