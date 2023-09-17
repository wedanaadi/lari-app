
  

# LARI-APP

  

## Requirement

- PHP 8.1
- Composer : https://getcomposer.org/
- Node JS v18: https://nodejs.org/en
- Setup gmail untuk smtp: https://santrikoding.com/tips-mengatasi-error-mengirim-email-menggunakan-smtp-gmail-di-laravel

  

## Description

APP LARI EVENT

## Installation

masuk ke direktori applikasi (lari-app) lewat terminal/cmd, 
jalankan perintah ini:

  

```bash
composer install
```

Masih di direktori yang sama, jalan kan perintah ini:

  

```bash
npm install
```

Run mode developer:

  

```bash
npm run dev
```

Build Frontend (React js):

  

```bash
npm run build
```

Import Database laraevent.sql
Rename file .env.back menjadi .env, kemudian atur setup database
```bash
# BAGIAN EDIT

APP_URL=http://localhost/lari-app

VITE_SHOW_CANVA=hide  #show atau hide

  

#contoh setup localhost

ASSET_URL=/lari-app

VITE_BASE_URL=/lari-app

VITE_PUBLIC_DIR="${APP_URL}"

VITE_API=/lari-app/public/api

  

#contoh setup online

# APP_URL=https://bupatigianyarrun.my.id

# VITE_BASE_URL=

# VITE_PUBLIC_DIR="${APP_URL}"

# VITE_API=/api

  

# SEO

VITE_ACARA  =  "${APP_NAME}"

VITE_ACARA_DESCRIPTION  =  "Acara ini dipersembahkan oleh ....."

VITE_LOGO  =  "favicon.svg"  #berada di folder public/static-assets

  

# MAIL

MAIL_FROM_NAME="${APP_NAME}"

MAIL_MAILER=smtp

MAIL_HOST=smtp.gmail.com

MAIL_PORT=587

MAIL_USERNAME=akunabal03@gmail.com #ganti ini

MAIL_PASSWORD=msupjmxlnrazfvrr #ganti ini

VITE_RQ_NETWORK=always

  
#SETUP DATABASE
DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=larievent

DB_USERNAME=root

DB_PASSWORD=clabsID

  

# END BAGIAN EDIT
```

  

## Credits

  

- [All Contributors](../../contributors)

  

## License

  

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
