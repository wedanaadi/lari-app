<?php

namespace App\Http\Controllers;

use App\Mail\EmailRegister;
use App\Mail\EmailVerifikasi;
use App\Services\OtherSetting\OtherSettingService;
use App\Services\Registration\RegistrationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use OpenSpout\Common\Entity\Style\Border;
use OpenSpout\Common\Entity\Style\BorderPart;
use OpenSpout\Common\Entity\Style\CellAlignment;
use OpenSpout\Common\Entity\Style\CellVerticalAlignment;
use OpenSpout\Common\Entity\Style\Style;
use Rap2hpoutre\FastExcel\Facades\FastExcel;

class RegistrationController extends Controller
{
  protected $SRegistration;
  protected $SOther;
  public function __construct(RegistrationService $rs, OtherSettingService $os)
  {
    $this->SRegistration = $rs;
    $this->SOther = $os;
  }

  public function indexRegistrationAdmin()
  {
    $onSearch = request(['search']);
    $perpage = request('perpage');
    return $this->SRegistration->getRegistrationFilterPaginate($onSearch, $perpage);
  }

  public function store(Request $request)
  {
    return $this->SRegistration->createRegistration($request);
  }

  public function verifikasiStatus(Request $request, $id)
  {
    return $this->SRegistration->verifikasiRegistration($request, $id);
  }

  public function getStatusUser(Request $request)
  {
    return $this->SRegistration->findUser($request->no, $request->email);
  }

  public function dashboard()
  {
    return $this->SRegistration->dashboardCard();
  }

  public function emailRegistration(Request $request)
  {
    $data = $request->all();
    Mail::to($request->email)->send(new EmailRegister($data));
    return 'oke';
  }

  public function emailVerifikasi(Request $request)
  {
    $data = $request->all();
    Mail::to($request->email)->send(new EmailVerifikasi($data));
    return 'oke';
  }

  public function export($aksi)
  {
    function usersGenerator($aksi)
    {
      $query = DB::table(DB::raw('registrations, (SELECT @row := 0) r'))->select(
        DB::raw('@row := @row + 1 AS nomor'),
        'registrations.*',
      );
      if ($aksi !== 'all') {
        $query = $query->where('status', $aksi);
      }
      foreach ($query->cursor() as $user) {
        yield $user;
      }
    }

    $border = new Border(
      new BorderPart(Border::BOTTOM, '#000', Border::WIDTH_THIN, Border::STYLE_SOLID),
      new BorderPart(Border::TOP, '#000', Border::WIDTH_THIN, Border::STYLE_SOLID),
      new BorderPart(Border::LEFT, '#000', Border::WIDTH_THIN, Border::STYLE_SOLID),
      new BorderPart(Border::RIGHT, '#000', Border::WIDTH_THIN, Border::STYLE_SOLID),
    );
    $header_style = (new Style())
      ->setBorder($border)
      ->setFontBold()
      ->setCellVerticalAlignment(CellVerticalAlignment::CENTER)
      ->setCellAlignment(CellAlignment::CENTER)
      ->setShouldWrapText(false)
      ->setShouldShrinkToFit(false);
    $rows_style = (new Style())
      ->setBorder($border)
      ->setShouldWrapText(false)
      ->setShouldShrinkToFit(false);
    // ->setShouldWrapText();
    // ->setFontSize(15)
    // ->setBackgroundColor("EDEDED");

    $name = 'file_perseta ' . $aksi . '.xlsx';

    return FastExcel::data(usersGenerator($aksi))
      ->headerStyle($header_style)
      ->rowsStyle($rows_style)
      ->download($name, function ($user) {
        return [
          'No' => $user->nomor,
          'Nomor Registrasi' => $user->registration_number,
          'Nama' => $user->full_name,
          'Nama BiB' => $user->bib_name,
          'Nomor Identitas' => $user->identity_number,
          'No Telepon' => $user->phone,
          'Jenis Kelamin' => $user->gender,
          'Kategori' => $user->categories_id,
          'Email' => $user->email,
          'Ukuran Baju' => $user->size_jersey,
          'Nama Kontak Darurat' => $user->emergency_contact_name,
          'Nomor Kontak Darurat' => $user->emergency_contact_phone,
          'Golongan Darah' => $user->bood_type,
          'Vaksin Booster' => $user->covid_vaccine,
        ];
      });
  }

  public function closing()
  {
    return $this->SOther->closingDate();
  }

  public function getVerifier($idRegister)
  {
    return $this->SRegistration->findVerifikator($idRegister);
  }
}
