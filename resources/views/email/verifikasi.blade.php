<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Verifikasi</title>
</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly;">
  <div style="background-color: #121212; border-radius: 5px">
    <div style="padding: 10px 30px">
      <div style="font-size: 1rem; color: #8E8C94; text-align:center">Pendaftaran Anda dengan nomor
        <span style="font-weight: bold; color: #9290A6">{{ $data['registration_number'] }}</span> telah tervalidasi.
      </div>
    </div>

    <div style="padding: 30px 10px; color: #8E8C94;">
      <div>
        <h4>Data Pendaftaran</h4>
        <ul>
          <li>Nomor Registrasi: {{ $data['registration_number'] }}</li>
          <li>Nama: {{ $data['nama'] }}</li>
          <li>Kategori: {{ $data['kategori'] }}</li>
          <li>Email: {{ $data['email'] }}</li>
        </ul>
      </div>
      <div style="margin-top: 30px">
        <h4>Data Acara</h4>
        <ul>
          <li>Tanggal: {{ $data['tanggal_acara'] }}</li>
          <li>Tempat: {{ $data['lokasi'] }}</li>
          <li>Waktu: {{ $data['waktu'] }}</li>
        </ul>
      </div>
      <div style="margin-top: 30px; text-align:center">
        <h5 style="color: #8E8C94">
          <h4>Note :<br /><br /> Mohon bagi peserta untuk masuk Grup Peserta {{ $data['acara'] }} dengan mengklik link
          dibawah <br />
          <span><a href="{{ $data['link'] }}" target="_blank" rel="noopener noreferrer">link Group</a></span></h4>
        </h5>
      </div>
    </div>
  </div>
</body>

</html>
