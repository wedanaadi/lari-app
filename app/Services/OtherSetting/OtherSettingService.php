<?php

namespace App\Services\OtherSetting;

use EasyLaravelPackage\BaseService;

interface OtherSettingService extends BaseService
{
  // Write something awesome :)
  public function getFilterPaginateOtherSetting();
  public function updateOtherSetting($request, $id);
  public function closingDate();
}
