<?php

namespace App\Http\Controllers;

use App\Services\Contact\ContactService;
use Illuminate\Http\Request;

class ContactController extends Controller
{
  protected $SContact;
  public function __construct(ContactService $cs)
  {
    $this->SContact = $cs;
  }

  public function index()
  {
    return $this->SContact->getFilterPaginateContact();
  }

  public function store(Request $request)
  {
    return $this->SContact->createContact($request);
  }

  public function update(Request $request, $id)
  {
    return $this->SContact->updateContact($request,$id);
  }

  public function destroy($id)
  {
    return $this->SContact->deleteContact($id);
  }
}
