<?php

namespace App\Traits\ResponseMessage;

trait ResponseMessageTrait
{
  // Define your code
  public function MessageStatus($type, $status)
  {
    $create_message = "Dibuat";
    $update_message = "Diupdate";
    $delete_message = "Dihapus";
    $get_message = "Mengambil Data";
    if ($status) {
      switch ($type) {
        case 'create':
          return 'Berhasil ' . $create_message;
          break;
        case 'update':
          return 'Berhasil ' . $update_message;
          break;
        case 'delete':
          return 'Berhasil ' . $delete_message;
          break;
        case 'get':
          return 'Berhasil ' . $get_message;
          break;
        default:
          break;
      }
    } else {
      switch ($type) {
        case 'create':
          return 'Gagal ' . $create_message;
          break;
        case 'update':
          return 'Gagal ' . $update_message;
          break;
        case 'delete':
          return 'Gagal ' . $delete_message;
          break;
        case 'get':
          return 'Gagal ' . $get_message;
          break;
        default:
          break;
      }
    }
  }
}
