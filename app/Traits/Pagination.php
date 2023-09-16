<?php

namespace App\Traits;

trait Pagination
{
  public function filterData($query, $arry)
  {
    return $query->filter($arry);
  }

  public function pagination($query, $page)
  {
    return $query->paginate($page);
  }
}
