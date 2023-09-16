<?php

namespace App\Services\ThemeHeader;

use EasyLaravelPackage\Service;
use App\Repositories\ThemeHeader\ThemeHeaderRepository;

class ThemeHeaderServiceImplement extends Service implements ThemeHeaderService
{
  /**
   * don't change $this->mainRepository variable name
   * because used in extends service class
   */
  protected $mainRepository;

  public function __construct(ThemeHeaderRepository $mainRepository)
  {
    $this->mainRepository = $mainRepository;
  }

  // Define your custom methods :)
  public function getHeader()
  {
    $data = $this->mainRepository->getThemeHeader();
    return response()->json(['data' => $data, 'message' => 'get data header'], 200);
  }

  public function updateHeader($request, $id)
  {
    $data = [
      'event_name_white' => $request->textWhite,
      'event_name_red' => $request->textRed,
      'location' => $request->location,
      'regency' => $request->regency,
      'state' => $request->state,
      'date' => $request->date,
      'time' => $request->time,
    ];
    $response = $this->mainRepository->updateThemeHeader($data, $id);
    return response()->json(['data' => $response, 'message' => 'update data header'], 200);
  }
}
