export function formatNumber(number:number) {
  // Menggunakan method toLocaleString dengan opsi 'de-DE' (Jerman) untuk memisahkan ribuan dengan tanda titik dan desimal dengan koma
  return number.toLocaleString('de-DE');
}
