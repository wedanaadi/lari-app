<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Konfirmasi</title>
</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly;">
  <div style="background-color: #121212; border-radius: 5px">
    <div style="padding: 10px 30px">
      <div style="font-size: 1rem; color: #8E8C94; text-align:center">Anda telah melakukan pendaftaran peserta
        {{ $data['acara'] }}. Mohon melakukan pembayaran melalui transfer Bank dengan nomor rekening: <span
          style="font-weight: bold; color: #9290A6">{{ $data['bank'] }}</span> dengan nominal kategori <span
          style="font-weight: bold; color: #9290A6">{{ $data['kategori'] }}</span> - <span style="font-weight: bold">Rp.
          {{ $data['price'] }}</span></div>
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
        @if (count($data['contact']) > 1)
          <span>Konfirmasi Ke salah satu Contact:</span>
        @endif
        @foreach ($data['contact'] as $c)
          @php
            $mlink = 'https://wa.me/' . $c['phone'];
          @endphp
          <p>
            <a href="{{ $mlink }}"
              style="padding: 10px 15px; display: inline-block; border-radius: 5px; background: #CC2936; color: #ffffff; text-decoration:none">
              Konfirmasi Pembayaran
              @if (count($data['contact']) > 1)
                - {{ $c['name'] }}
              @endif
            </a>
          </p>
        @endforeach
        <h5 style="color: #8E8C94">
          <span style="font-size: 20px">Note :</span> <br />Cek Email anda secara berkala untuk mendapatkan Info
          selanjutnya setelah melakukan pembayaran
        </h5>
      </div>
    </div>
  </div>
</body>

</html>
