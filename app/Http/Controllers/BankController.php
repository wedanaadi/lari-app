<?php

namespace App\Http\Controllers;

use App\Services\Bank\BankService;
use Illuminate\Http\Request;

class BankController extends Controller
{
  protected $SBank;
  public function __construct(BankService $bs)
  {
    $this->SBank = $bs;
  }

  public function index()
  {
    return $this->SBank->getFilterPaginateBank();
  }

  public function store(Request $request)
  {
    return $this->SBank->createBank($request);
  }

  public function update(Request $request, $id)
  {
    return $this->SBank->updateBank($request,$id);
  }

  public function destroy($id)
  {
    return $this->SBank->deleteBank($id);
  }
}
