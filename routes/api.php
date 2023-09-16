<?php

use App\Http\Controllers\BankController;
use App\Http\Controllers\CanvaTutorialController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OtherSettingController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/dashboard', [RegistrationController::class, 'dashboard']);
Route::get('/closing', [RegistrationController::class, 'closing']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/email/registration', [RegistrationController::class, 'emailRegistration']);
Route::post('/email/verification', [RegistrationController::class, 'emailVerifikasi']);
Route::get('/export/{aksi}', [RegistrationController::class, 'export']);

Route::prefix('headers')->group(function () {
  Route::get('/', [ThemeController::class, 'index']);
  Route::middleware('auth:sanctum')->put('/{id}', [ThemeController::class, 'update']);
});

Route::prefix('categories')->group(function () {
  Route::get('/', [ThemeController::class, 'indexCategories']);
  Route::middleware('auth:sanctum')->group(function(){
    Route::get('/admin', [ThemeController::class, 'indexCategoriesAdmin']);
    Route::post('/', [ThemeController::class, 'storeCategories']);
    Route::put('/{id}', [ThemeController::class, 'updateCategories']);
    Route::delete('/{id}', [ThemeController::class, 'destroyCategories']);
  });
});

Route::prefix('sponsorship')->group(function () {
  Route::get('/', [ThemeController::class, 'indexSponsorship']);
  Route::middleware('auth:sanctum')->group(function(){
    Route::get('/admin', [ThemeController::class, 'indexSponsorshipAdmin']);
    Route::post('/', [ThemeController::class, 'storeSponsorship']);
    Route::put('/{id}', [ThemeController::class, 'updateSponsorship']);
    Route::delete('/{id}', [ThemeController::class, 'destroySponsorship']);
  });
});

Route::prefix('registration')->group(function () {
  Route::middleware('auth:sanctum')->get('/', [RegistrationController::class, 'indexRegistrationAdmin']);
  Route::get('/find-status', [RegistrationController::class, 'getStatusUser']);
  Route::middleware('auth:sanctum')->get('/find-verifier/{id}', [RegistrationController::class, 'getVerifier']);
  Route::post('/', [RegistrationController::class, 'store']);
  Route::middleware('auth:sanctum')->put('/verifikasi/{id}', [RegistrationController::class, 'verifikasiStatus']);
});

Route::prefix('canva')->group(function () {
  Route::get('/', [CanvaTutorialController::class, 'index']);
  Route::middleware('auth:sanctum')->put('/{id}', [CanvaTutorialController::class, 'update']);
});

Route::middleware('auth:sanctum')->group(function () {
  Route::post("/logout", [UserController::class, 'logout'])->name('logout');

  Route::prefix('othersettings')->group(function () {
    Route::get('/', [OtherSettingController::class, 'index']);
    Route::put('/{id}', [OtherSettingController::class, 'update']);
  });

  Route::prefix('banks')->group(function () {
    Route::get('/', [BankController::class, 'index']);
    Route::post('/', [BankController::class, 'store']);
    Route::put('/{id}', [BankController::class, 'update']);
    Route::delete('/{id}', [BankController::class, 'destroy']);
  });

  Route::prefix('contacts')->group(function () {
    Route::get('/', [ContactController::class, 'index']);
    Route::post('/', [ContactController::class, 'store']);
    Route::put('/{id}', [ContactController::class, 'update']);
    Route::delete('/{id}', [ContactController::class, 'destroy']);
  });

  Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::post('/', [UserController::class, 'store']);
    Route::put('/{id}', [UserController::class, 'update']);
    Route::delete('/{id}', [UserController::class, 'destroy']);
  });
});
