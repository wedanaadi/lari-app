<?php

namespace App\Services\CanvaTutorial;

use EasyLaravelPackage\Service;
use App\Repositories\CanvaTutorial\CanvaTutorialRepository;

class CanvaTutorialServiceImplement extends Service implements CanvaTutorialService
{
  /**
  * don't change $this->mainRepository variable name
  * because used in extends service class
  */
  protected $mainRepository;

  public function __construct(CanvaTutorialRepository $mainRepository)
  {
    $this->mainRepository = $mainRepository;
  }

  // Define your custom methods :)
  public function getCanvaTutorial()
  {
    $data = $this->mainRepository->getCanvaTutorial();
    return response()->json(['data' => $data, 'message' => 'get data CanvaTutorial'], 200);
  }

  public function updateCanvaTutorial($request, $id)
  {
    $data = [
      'canva_inframe' => $request->canva_inframe,
    ];
    $response = $this->mainRepository->updateCanvaTutorial($data, $id);
    return response()->json(['data' => $response, 'message' => 'update data CanvaTutorial'], 200);
  }
}
