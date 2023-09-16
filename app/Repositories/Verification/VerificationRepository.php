<?php

namespace App\Repositories\Verification;

use EasyLaravelPackage\Repository;

interface VerificationRepository extends Repository
{
  // Write something awesome :)
  public function insertData($data);
  public function findBy($key,$val,$act="=");
}
