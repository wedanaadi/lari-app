<?php

namespace App\Services\ThemeSponsorship;

use EasyLaravelPackage\Service;
use App\Repositories\ThemeSponsorship\ThemeSponsorshipRepository;
use App\Traits\ResponseMessage\ResponseMessageTrait;
use EasyLaravelPackage\Traits\GenerateKode;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class ThemeSponsorshipServiceImplement extends Service implements ThemeSponsorshipService
{
  /**
   * don't change $this->mainRepository variable name
   * because used in extends service class
   */
  protected $mainRepository;
  use GenerateKode;
  use ResponseMessageTrait;

  public function __construct(ThemeSponsorshipRepository $mainRepository)
  {
    $this->mainRepository = $mainRepository;
  }

  // Define your custom methods :)
  public function get()
  {
    $data = $this->mainRepository->getSponsorship();
    return response()->json(['data' => $data, 'message' => $this->MessageStatus('get', true), 'error' => null], 200);
  }

  public function getSponsorshipFilterPaginate($arr, $perpage)
  {
    $data = $this->mainRepository->getSponsorshipFilter($arr, $perpage);
    return response()->json(['data' => $data, 'message' => $this->MessageStatus('get', true), 'error' => null], 200);
  }

  public function create($request)
  {
    $validator = Validator::make($request->all(), [
      'title' => 'required',
      'image' => 'required|mimes:jpg,jpeg,png|max:1024',
    ], [
      'required' => 'Input :attribute harus diisi!'
    ]);

    if ($validator->fails()) {
      return response()->json(['message' => 'Validasi Error', "data" => null, 'error' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      $stringKode = "SHP";
      $date = date('y') . date('m');
      $lastKode = $this->mainRepository->getLastKode($stringKode . $date);
      $newID = $this->kode($lastKode, 5, 7, $stringKode, $date);

      $imageName = $this->actionImage($request->file('image'));

      $data = [
        'id' => $newID,
        'title' => $request->title,
        'image' => $imageName,
      ];
      $result = $this->mainRepository->insertSponsorship($data);
      DB::commit();
      return response()->json(['data' => $result, 'message' => $this->MessageStatus('create', true), 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('create', false), 'error' => $e->getMessage()], 500);
    }
  }

  public function actionImage($requestImage)
  {
    $nama_gambar = "";
    if ($requestImage) {
      $directory = public_path('images-data/sponsorship');
      if (!File::isDirectory($directory)) {
        // Jika belum ada, maka buat direktori tersebut
        File::makeDirectory($directory, 0777, true, true);
      }
      $nama_gambar = 'img-' . time() . '-' . str_replace(" ", "_", $requestImage->getClientOriginalName());
      Image::make($requestImage)->resize(500, null, function ($constraint) {
        $constraint->aspectRatio();
      })->save(public_path('images-data/sponsorship/' . $nama_gambar));
    }
    return $nama_gambar;
  }

  public function removeImage($path)
  {
    if (File::exists($path)) {
      File::delete($path);
    }
  }

  public function updateData($request, $id)
  {
    $validator = Validator::make($request->all(), [
      'title' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!'
    ]);

    if ($validator->fails()) {
      return response()->json(['message' => 'Validasi Error', "data" => null, 'error' => $validator->messages()->toArray()], 422);
    }

    $sponsorship = $this->mainRepository->find($id);
    DB::beginTransaction();
    try {
      $data = [
        'title' => $request->title
      ];
      if($request->file('image')) {
        // Ambil informasi gambar sebelum menghapus data
        $imagePath = public_path('images-data/sponsorship/' . $sponsorship->image);

        // Hapus gambar jika ada
        $this->removeImage($imagePath);
        $imageName = $this->actionImage($request->file('image'));
        $data['image'] =  $imageName;
      }
      $result = $this->mainRepository->updateSponsorship($data, $id);
      DB::commit();
      return response()->json(['data' => $result, 'message' => $this->MessageStatus('update', true), 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('update', false), 'error' => $e->getMessage()], 500);
    }
  }

  public function delete($id)
  {
    DB::beginTransaction();
    try {
      // Ambil informasi gambar sebelum menghapus data
      $sponsorship = $this->mainRepository->findSponsorship('id', '=', $id);
      $imagePath = public_path('images-data/sponsorship/' . $sponsorship->image);

      // Hapus gambar jika ada
      $this->removeImage($imagePath);

      // Hapus data Sponsorship
      $result = $this->mainRepository->deleteSponsorship($id);
      DB::commit();
      return response()->json(['data' => $result, 'message' => $this->MessageStatus('delete', true), 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('delete', false), 'error' => $e->getMessage()], 500);
    }
  }
}
