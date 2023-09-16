<?php

namespace App\Services\Bank;

use EasyLaravelPackage\Service;
use App\Repositories\Bank\BankRepository;
use App\Traits\ResponseMessage\ResponseMessageTrait;
use EasyLaravelPackage\Traits\GenerateKode;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class BankServiceImplement extends Service implements BankService
{
  /**
  * don't change $this->mainRepository variable name
  * because used in extends service class
  */
  protected $mainRepository;
  use ResponseMessageTrait, GenerateKode;

  public function __construct(BankRepository $mainRepository)
  {
    $this->mainRepository = $mainRepository;
  }

  // Define your custom methods :)
  public function getFilterPaginateBank()
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
      'nama_bank' => 'required',
      'rekening' => 'required',
      'an' => 'required',
    ];
    return $data;
  }

  public function createBank($request)
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
        'nama_bank' => $request->nama_bank,
        'rekening' => $request->rekening,
        'an' => $request->an,
      ];
      $result = $this->mainRepository->insert($data);
      DB::commit();
      return response()->json(['data' => $result, 'message' => $this->MessageStatus('create', true), 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('create', false), 'error' => $e->getMessage()], 500);
    }
  }

  public function updateBank($request, $id)
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
        'nama_bank' => $request->nama_bank,
        'rekening' => $request->rekening,
        'an' => $request->an,
      ];

      $result = $this->mainRepository->update($data, $id);
      DB::commit();
      return response()->json(['data' => $result, 'message' => $this->MessageStatus('update', true), 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('update', false), 'error' => $e->getMessage()], 500);
    }
  }

  public function deleteBank($id)
  {
    DB::beginTransaction();
    try {
      $result = $this->mainRepository->delete($id);
      DB::commit();
      return response()->json(['data' => $result, 'message' => $this->MessageStatus('delete', true), 'error' => null], 200);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('delete', false), 'error' => $e->getMessage()], 500);
    }
  }
}
