<?php

namespace App\Repositories\Registration;

use EasyLaravelPackage\Repository;

interface RegistrationRepository extends Repository
{
  // Write something awesome :)
  public function getRegistration();
  public function insertRegistration($data);
  public function getLastKode($awalKode);
  public function updateRegistration($data, $id);
  public function findRegistrasi($noReg, $email, $isCount=false);
  public function getRegistrationFilter($arr, $perpage);
  public function getTotalRegister($aksi);
  public function findRegisterWith($id);
}
