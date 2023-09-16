<?php

namespace App\Http\Controllers;

use App\Services\ThemeCategories\ThemeCategoriesService;
use App\Services\ThemeHeader\ThemeHeaderService;
use App\Services\ThemeSponsorship\ThemeSponsorshipService;
use Illuminate\Http\Request;

class ThemeController extends Controller
{
  protected $ThemeHeader;
  protected $ThemeCategories;
  protected $ThemeSponsorship;

  public function __construct(
    ThemeHeaderService $ths,
    ThemeCategoriesService $tcs,
    ThemeSponsorshipService $tss
  ) {
    $this->ThemeHeader = $ths;
    $this->ThemeCategories = $tcs;
    $this->ThemeSponsorship = $tss;
  }

  public function index()
  {
    return $this->ThemeHeader->getHeader();
  }

  public function update(Request $request, $id)
  {
    return $this->ThemeHeader->updateHeader($request, $id);
  }

  public function indexCategories()
  {
    return $this->ThemeCategories->getCategories();
  }

  public function storeCategories(Request $request)
  {
    return $this->ThemeCategories->createCategories($request);
  }

  public function updateCategories(Request $request, $id)
  {
    return $this->ThemeCategories->updateCategories($request, $id);
  }

  public function destroyCategories($id)
  {
    return $this->ThemeCategories->deleteCategories($id);
  }

  public function indexSponsorship()
  {
    return $this->ThemeSponsorship->get();
  }

  public function storeSponsorship(Request $request)
  {
    return $this->ThemeSponsorship->create($request);
  }

  public function updateSponsorship(Request $request, $id)
  {
    return $this->ThemeSponsorship->updateData($request, $id);
  }

  public function destroySponsorship($id)
  {
    return $this->ThemeSponsorship->delete($id);
  }

  public function indexCategoriesAdmin()
  {
    $onSearch = request(['search']);
    $perpage = request('perpage');
    return $this->ThemeCategories->getCategoriesFilterPaginate($onSearch, $perpage);
  }

  public function indexSponsorshipAdmin()
  {
    $onSearch = request(['search']);
    $perpage = request('perpage');
    return $this->ThemeSponsorship->getSponsorshipFilterPaginate($onSearch, $perpage);
  }
}
