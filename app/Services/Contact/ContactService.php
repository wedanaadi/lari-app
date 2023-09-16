<?php

namespace App\Services\Contact;

use EasyLaravelPackage\BaseService;

interface ContactService extends BaseService
{
  // Write something awesome :)
  public function getFilterPaginateContact();
  public function createContact($request);
  public function updateContact($request, $id);
  public function deleteContact($id);
}
