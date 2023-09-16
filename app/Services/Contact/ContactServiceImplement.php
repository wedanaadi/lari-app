<?php

namespace App\Services\Contact;

use EasyLaravelPackage\Service;
use App\Repositories\Contact\ContactRepository;
use App\Traits\ResponseMessage\ResponseMessageTrait;
use Carbon\Carbon;
use EasyLaravelPackage\Traits\GenerateKode;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ContactServiceImplement extends Service implements ContactService
{
  /**
  * don't change $this->mainRepository variable name
  * because used in extends service class
  */
  protected $mainRepository;
  use ResponseMessageTrait, GenerateKode;

  public function __construct(ContactRepository $mainRepository)
  {
    $this->mainRepository = $mainRepository;
  }

  // Define your custom methods :)
  public function getFilterPaginateContact()
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
      'nama_contact' => 'required',
      'no_whatapp' => 'required',
    ];
    return $data;
  }

  public function createContact($request)
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
        'nama_contact' => $request->nama_contact,
        'no_whatapp' => $request->no_whatapp,
      ];
      $result = $this->mainRepository->insert($data);
      DB::commit();
      return response()->json(['data' => $result, 'message' => $this->MessageStatus('create', true), 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('create', false), 'error' => $e->getMessage()], 500);
    }
  }

  public function updateContact($request, $id)
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
        'nama_contact' => $request->nama_contact,
        'no_whatapp' => $request->no_whatapp,
      ];

      $result = $this->mainRepository->update($data, $id);
      DB::commit();
      return response()->json(['data' => $result, 'message' => $this->MessageStatus('update', true), 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('update', false), 'error' => $e->getMessage()], 500);
    }
  }

  public function deleteContact($id)
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
