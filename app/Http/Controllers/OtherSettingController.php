<?php

namespace App\Http\Controllers;

use App\Services\OtherSetting\OtherSettingService;
use Illuminate\Http\Request;

class OtherSettingController extends Controller
{
  protected $SOtherSetting;
  public function __construct(OtherSettingService $os)
  {
    $this->SOtherSetting = $os;
  }

  public function index()
  {
    return $this->SOtherSetting->getFilterPaginateOtherSetting();
  }

  public function update(Request $request, $id)
  {
    return $this->SOtherSetting->updateOtherSetting($request,$id);
  }
}
