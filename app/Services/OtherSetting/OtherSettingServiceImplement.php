<?php

namespace App\Services\OtherSetting;

use EasyLaravelPackage\Service;
use App\Repositories\OtherSetting\OtherSettingRepository;
use App\Traits\ResponseMessage\ResponseMessageTrait;
use EasyLaravelPackage\Traits\GenerateKode;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OtherSettingServiceImplement extends Service implements OtherSettingService
{
  /**
  * don't change $this->mainRepository variable name
  * because used in extends service class
  */
  protected $mainRepository;
  use ResponseMessageTrait, GenerateKode;

  public function __construct(OtherSettingRepository $mainRepository)
  {
    $this->mainRepository = $mainRepository;
  }

  // Define your custom methods :)
  public function closingDate()
  {
    return $this->mainRepository->find('1cdr');
  }

  public function getFilterPaginateOtherSetting()
  {
    $arr = request(['search']);
    $perpage = request('perpage');
    $aksi = request('aksi');
    $data = $this->mainRepository->getFilterPaginate($arr, $perpage, $aksi);
    return response()->json(['data' => $data, 'message' => $this->MessageStatus('get', true), 'error' => null], 200);
  }

  protected function rulesValidate()
  {
    $data = [
      'keterangan' => 'required',
      'value' => 'required',
    ];
    return $data;
  }

  public function updateOtherSetting($request, $id)
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
        'keterangan' => $request->keterangan,
        'value' => $request->value,
      ];

      $result = $this->mainRepository->update($data, $id);
      DB::commit();
      return response()->json(['data' => $result, 'message' => $this->MessageStatus('update', true), 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('update', false), 'error' => $e->getMessage()], 500);
    }
  }
}
