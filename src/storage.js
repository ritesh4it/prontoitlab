import { parseJSON, stringifyJSON } from './utils'
export function getItem (key) {
  let item = localStorage.getItem(key)
  item = parseJSON(item)
  return item
}
export function setItem (key, value) {
  localStorage.setItem(key, stringifyJSON(value))
}
export function removeItem (key) {
  localStorage.removeItem(key)
}
