<?php

namespace App\Services\Registration;

use App\Repositories\Bank\BankRepository;
use App\Repositories\Contact\ContactRepository;
use App\Repositories\OtherSetting\OtherSettingRepository;
use EasyLaravelPackage\Service;
use App\Repositories\Registration\RegistrationRepository;
use App\Repositories\ThemeHeader\ThemeHeaderRepository;
use App\Repositories\Verification\VerificationRepository;
use App\Traits\ResponseMessage\ResponseMessageTrait;
use Carbon\Carbon;
use EasyLaravelPackage\Traits\GenerateKode;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class RegistrationServiceImplement extends Service implements RegistrationService
{
  /**
   * don't change $this->mainRepository variable name
   * because used in extends service class
   */
  protected $mainRepository;
  use GenerateKode;
  use ResponseMessageTrait;
  protected $verificationRepository;
  protected $HeaderLanding;
  protected $OtherSettingRepository;
  protected $bank;
  protected $contact;

  public function __construct(
    RegistrationRepository $mainRepository,
    VerificationRepository $vr,
    ThemeHeaderRepository $thr,
    OtherSettingRepository $osr,
    BankRepository $br,
    ContactRepository $cr
  ) {
    $this->mainRepository = $mainRepository;
    $this->verificationRepository = $vr;
    $this->HeaderLanding = $thr;
    $this->OtherSettingRepository = $osr;
    $this->bank = $br;
    $this->contact = $cr;
  }

  // Define your custom methods :)
  public function getRegistration()
  {
  }

  public function findVerifikator($idRegister)
  {
    $data = $this->verificationRepository->findBy('registration_id', $idRegister);
    return response()->json(['data' => $data, 'message' => $this->MessageStatus('get', true), 'error' => null], 200);
  }

  public function getRegistrationFilterPaginate($arr, $perpage)
  {
    $data = $this->mainRepository->getRegistrationFilter($arr, $perpage);
    return response()->json(['data' => $data, 'message' => $this->MessageStatus('get', true), 'error' => null], 200);
  }

  public function findUser($noRegister, $email)
  {
    $count = $this->mainRepository->findRegistrasi($noRegister, $email, true);
    if ($count > 0) {
      $data = $this->mainRepository->findRegistrasi($noRegister, $email);
      return response()->json(['data' => $data, 'message' => $this->MessageStatus('get', true), 'error' => null], 200);
    } else {
      return response()->json(['data' => [], 'message' => $this->MessageStatus('get', false), 'error' => null], 404);
    }
  }

  protected function rulesValidate()
  {
    return [
      'fullName' => 'required',
      'nameBiB' => 'required',
      'identityNumber' => 'required',
      'birthDate' => 'required',
      'gender' => 'required',
      'bloodType' => 'required',
      'sizeJersey' => 'required',
      'categories' => 'required',
      'emergencyContactName' => 'required',
      'emergencyContactPhone' => 'required',
      'city' => 'required',
      'national' => 'required',
      'phone' => 'required',
      'email' => 'required|email',
      'covidVaccine' => 'required',
    ];
  }

  public function createRegistration($request)
  {
    $validator = Validator::make($request->all(), $this->rulesValidate(), [
      'required' => 'Input :attribute harus diisi!'
    ]);

    if ($validator->fails()) {
      return response()->json(['message' => 'Validasi Error', "data" => null, 'error' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      $stringKode = "RGS";
      $date = date('y') . date('m');
      $lastKode = $this->mainRepository->getLastKode($stringKode . $date);
      $newID = $this->kode($lastKode, 5, 7, $stringKode, $date);
      $data = [
        'id' => $this->uid(9),
        "registration_number" => $newID,
        "bib_name" => $request->nameBiB,
        "full_name" => $request->fullName,
        "identity_number" => $request->identityNumber,
        "date_of_birth" => $request->birthDate['startDate'],
        "gender" => $request->gender['value'],
        "bood_type" => $request->bloodType['value'],
        "size_jersey" => $request->sizeJersey['value'],
        "categories_id" => $request->categories['value'],
        "emergency_contact_name" => $request->emergencyContactName,
        "emergency_contact_phone" => $request->emergencyContactPhone,
        "regency" => $request->city,
        "state" => $request->national,
        "phone" => $request->phone,
        "email" => $request->email,
        "covid_vaccine" => $request->covidVaccine,
        "status" => "unverified",
        "created_at" => Carbon::now()->timestamp * 1000,
        "updated_at" => Carbon::now()->timestamp * 1000,
      ];
      $this->mainRepository->insertRegistration($data);
      //
      $dataCategory = explode(' | ', $request->categories['label']);
      $dataAcara = $this->HeaderLanding->getThemeHeader();
      $bank = $this->bank->getBankList();
      $contact = $this->contact->getContactList();

      $messageBank = '';
      $countBank = 1;
      foreach ($bank as $b) {
        if ($countBank > 1) {
          $messageBank .= ' atau ' . $b->rekening . '-(' . $b->nama_bank . ' a/n ' . $b->an . ')';
        } else {
          $messageBank .= $b->rekening . '-(' . $b->nama_bank . ' a/n ' . $b->an . ')';
        }
        $countBank++;
      }

      $messageContact = [];
      foreach ($contact as $c) {
        array_push($messageContact, [
          'name' => $c->nama_contact,
          'phone' => '62' . ltrim($c->no_whatapp, '0')
        ]);
      }

      $dataEmail = [
        'acara' => $dataAcara->event_name_white . ' ' . $dataAcara->event_name_red,
        'email' => $request->email,
        'registration_number' => $newID,
        'nama' => $request->fullName,
        'kategori' => $dataCategory[0] . ' - ' . $dataCategory[1],
        'price' => number_format($dataCategory[2], '0', ',', '.'),
        'subject' => 'Pendaftaran ' . $dataAcara->event_name_white . ' ' . $dataAcara->event_name_red,
        'tanggal_acara' => $dataAcara->date,
        'lokasi' => $dataAcara->location,
        'waktu' => $dataAcara->time,
        'bank' => $messageBank,
        'contact' => $messageContact
      ];

      // $res = Arr::except($data, ['id']);
      DB::commit();
      return response()->json(['data' => $dataEmail, 'message' => $this->MessageStatus('create', true), 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('create', false), 'error' => $e->getMessage()], 500);
    }
  }

  public function verifikasiRegistration($request, $id)
  {
    DB::beginTransaction();
    try {
      $dataVerfication = [
        'registration_id' => $id,
        'user_id' => $request->user_id,
        'created_at' => Carbon::now()->timestamp * 1000,
      ];
      $data = [
        'status' => 'verified'
      ];
      $this->mainRepository->updateRegistration($data, $id);
      $this->verificationRepository->insertData($dataVerfication);
      $registrationFind = $this->mainRepository->findRegisterWith($id);
      $linkGroup = $this->OtherSettingRepository->findBy('id', '2lg')->value;
      $dataAcara = $this->HeaderLanding->getThemeHeader();
      $dataEmail = [
        'acara' => $dataAcara->event_name_white . ' ' . $dataAcara->event_name_red,
        'email' => $registrationFind->email,
        'registration_number' => $registrationFind->registration_number,
        'nama' => $registrationFind->full_name,
        'kategori' => $registrationFind->category->name . ' - ' . $registrationFind->category->distance,
        'price' => number_format($registrationFind->category->price, '0', ',', '.'),
        'subject' => 'Verifikasi Pendaftaran ' . $dataAcara->event_name_white . ' ' . $dataAcara->event_name_red,
        'tanggal_acara' => $dataAcara->date,
        'lokasi' => $dataAcara->location,
        'waktu' => $dataAcara->time,
        'link' => $linkGroup
      ];
      DB::commit();
      return response()->json(['data' => $dataEmail, 'message' => $this->MessageStatus('update', true), 'error' => null], 200);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['data' => [], 'message' => $this->MessageStatus('update', false), 'error' => $e->getMessage()], 500);
    }
  }

  public function dashboardCard()
  {
    $verified = $this->mainRepository->getTotalRegister('verified');
    $unverified = $this->mainRepository->getTotalRegister('unverified');
    $data = [
      'verified' => $verified,
      'unverified' => $unverified,
      'total' => $verified + $unverified,
    ];
    return response()->json(['data' => $data, 'message' => $this->MessageStatus('get', true), 'error' => null], 200);
  }
}
