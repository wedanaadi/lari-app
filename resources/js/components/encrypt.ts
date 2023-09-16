export function encriptData(data: string) {
  return btoa(data)
}
export function dencriptData(data: string) {
  return atob(data)
}
