<?php

namespace App\Services\ThemeCategories;

use EasyLaravelPackage\Service;
use App\Repositories\ThemeCategories\ThemeCategoriesRepository;
use App\Traits\ResponseMessage\ResponseMessageTrait;
use EasyLaravelPackage\Traits\GenerateKode;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ThemeCategoriesServiceImplement extends Service implements ThemeCategoriesService
{
  /**
   * don't change $this->mainRepository variable name
   * because used in extends service class
   */
  protected $mainRepository;
  use GenerateKode;
  use ResponseMessageTrait;

  public function __construct(ThemeCategoriesRepository $mainRepository)
  {
    $this->mainRepository = $mainRepository;
  }

  // Define your custom methods :)
  public function getCategories()
  {
    $data = $this->mainRepository->getCategories();
    return response()->json(['data' => $data, 'message' => $this->MessageStatus('get',true), 'error' => null], 200);
  }

  public function getCategoriesFilterPaginate($arr, $perpage)
  {
    $data = $this->mainRepository->getCategoriesFilter($arr, $perpage);
    return response()->json(['data' => $data, 'message' => $this->MessageStatus('get',true), 'error' => null], 200);
  }

  protected function rulesValidate() {
    return [
      'distance' => 'required',
      'price' => 'required',
      'name' => 'required',
    ];
  }

  public function createCategories($request)
  {
    $validator = Validator::make($request->all(), $this->rulesValidate(), [
      'required' => 'Input :attribute harus diisi!'
    ]);

    if ($validator->fails()) {
      return response()->json(['message' => 'Validasi Error', "data" => null, 'error' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      $stringKode = "CAT";
      $date = date('y') . date('m');
      $lastKode = $this->mainRepository->getLastKode($stringKode . $date);
      $newID = $this->kode($lastKode, 5, 7, $stringKode, $date);
      $data = [
        'id' => $newID,
        'distance' => $request->distance,
        'price' => $request->price,
        'name' => $request->name,
      ];
      $result = $this->mainRepository->insertCategori($data);
      DB::commit();
      return response()->json(['data' => $result, 'message' => $this->MessageStatus('create',true), 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('create',false), 'error' => $e->getMessage()], 500);
    }
  }

  public function updateCategories($request, $id)
  {
    $validator = Validator::make($request->all(), $this->rulesValidate(), [
      'required' => 'Input :attribute harus diisi!'
    ]);

    if ($validator->fails()) {
      return response()->json(['message' => 'Validasi Error', "data" => null, 'error' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      $data = [
        'distance' => $request->distance,
        'price' => $request->price,
        'name' => $request->name,
      ];
      $result = $this->mainRepository->updateCategori($data, $id);
      DB::commit();
      return response()->json(['data' => $result, 'message' => $this->MessageStatus('update',true), 'error' => null], 200);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('update',false), 'error' => $e->getMessage()], 500);
    }
  }

  public function deleteCategories($id)
  {
    DB::beginTransaction();
    try {
      $result = $this->mainRepository->deleteCategori($id);
      DB::commit();
      return response()->json(['data' => $result, 'message' => $this->MessageStatus('delete',true), 'error' => null], 200);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('delete',false), 'error' => $e->getMessage()], 500);
    }
  }
}
