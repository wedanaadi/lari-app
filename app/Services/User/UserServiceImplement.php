<?php

namespace App\Services\User;

use App\Models\User;
use EasyLaravelPackage\Service;
use App\Repositories\User\UserRepository;
use App\Traits\ResponseMessage\ResponseMessageTrait;
use Carbon\Carbon;
use EasyLaravelPackage\Traits\GenerateKode;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserServiceImplement extends Service implements UserService
{
  /**
   * don't change $this->mainRepository variable name
   * because used in extends service class
   */
  protected $mainRepository;
  use ResponseMessageTrait, GenerateKode;

  public function __construct(UserRepository $mainRepository)
  {
    $this->mainRepository = $mainRepository;
  }

  // Define your custom methods :)
  public function getFilterPaginateUser()
  {
    $arr = request(['search']);
    $perpage = request('perpage');
    $aksi = request('aksi');
    $data = $this->mainRepository->getFilterPaginate($arr, $perpage, $aksi);
    return response()->json(['data' => $data, 'message' => $this->MessageStatus('get', true), 'error' => null], 200);
  }

  protected function rulesValidate($aksi = 'save',$id="")
  {
    $data = [
      // 'username' => 'required|unique:users',
      'name' => 'required',
      'phone' => 'required',
      'role' => 'required',
    ];
    if ($aksi === 'save') {
      $data['password'] = 'required';
      $data['username'] = [
        'required',
        Rule::unique('users')->where(function ($query) {
          return $query->where('status', 'active');
        }),
      ];
    } else {
      $data['username'] = [
        'required',
        Rule::unique('users')->where(function ($query) {
          return $query->where('status', 'active');
        })->ignore($id),
      ];
    }
    return $data;
  }

  public function createUser($request)
  {
    $validator = Validator::make($request->all(), $this->rulesValidate(), [
      'required' => 'Input :attribute harus diisi!',
      'unique' => 'Input :attribute sudah digunakan!',
    ]);

    if ($validator->fails()) {
      return response()->json(['message' => 'Validasi Error', "data" => null, 'error' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      $data = [
        // 'id' => $this->uid(9),
        'username' => $request->username,
        'password' => bcrypt($request->password),
        'name' => $request->name,
        'phone' => $request->phone,
        'role' => $request->role,
        'status' => 'active',
        "created_at" => Carbon::now()->timestamp * 1000,
        "updated_at" => Carbon::now()->timestamp * 1000,
      ];
      // $result = User::create($data);
      $result = $this->mainRepository->insert($data);
      DB::commit();
      return response()->json(['data' => $result, 'message' => $this->MessageStatus('create', true), 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('create', false), 'error' => $e->getMessage()], 500);
    }
  }

  public function updateUser($request, $id)
  {
    $validator = Validator::make($request->all(), $this->rulesValidate('aksi',$id), [
      'required' => 'Input :attribute harus diisi!'
    ]);

    if ($validator->fails()) {
      return response()->json(['message' => 'Validasi Error', "data" => null, 'error' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      $data = [
        'username' => $request->username,
        'name' => $request->name,
        'phone' => $request->phone,
        'role' => $request->role,
        "updated_at" => Carbon::now()->timestamp * 1000,
      ];
      if ($request->password != null or $request->password != '') {
        $data['password'] = bcrypt($request->password);
      }
      $result = $this->mainRepository->update($data, $id);
      DB::commit();
      return response()->json(['data' => $result, 'message' => $this->MessageStatus('update', true), 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('update', false), 'error' => $e->getMessage()], 500);
    }
  }

  public function deleteUser($id)
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

  public function login($request)
  {
    $validator = Validator::make($request->all(), [
      'username' => 'required',
      'password' => 'required'
    ], [
      'required' => 'Input :attribute harus diisi!'
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    try {
      $user = $this->mainRepository->findUsername($request->username);
      if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['errors' => 'Bad Credentials, Cek kembali username atau password!'], 403);
      }
      $token = $user->createToken('sanctum_token')->plainTextToken;
      $payload = [
        'access_token' => $token,
        'user_data' => $user,
      ];
      return response()->json(['msg' => 'Successfuly Login', "data" => $payload, 'error' => null], 200);
    } catch (\Exception $e) {
      return response()->json(['msg' => 'Failed Login', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  public function logout()
  {
    Auth::user()->tokens()->delete();
    return response()->json(['msg' => 'Successfuly Logout', "data" => [], 'error' => null], 200);
  }
}
