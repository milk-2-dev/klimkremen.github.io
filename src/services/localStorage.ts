export type localStorageItem = {
  coord: { lat: number; lon: number }
  id: number
  name: string
  sys: { country: string }
}

const saveToLS = (key: string, value: string) => {
  localStorage.setItem(key, value)
}
const getItem = (key: string) => {
  const item: string | null = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}
const addItem = (key: string, value: localStorageItem) => {
  let storedValue: localStorageItem[] = getItem(key)

  storedValue ? storedValue.push(value) : (storedValue = [value])

  saveToLS(key, JSON.stringify(storedValue))
}
const removeItem = (key: string, id: number) => {
  saveToLS(
    key,
    JSON.stringify(
      getItem(key).filter((item: localStorageItem) => item.id !== id)
    )
  )
}
const deleteFromLS = (key: string) => {
  localStorage.removeItem(key)
}

interface ILocalStorageService {
  saveToLS: (key: string, value: string) => void
  getItem: (key: string) => [] | null
  addItem: (key: string, value: localStorageItem) => void
  removeItem: (key: string, id: number) => void
  deleteFromLS: (key: string) => void
}

const localStorageService: ILocalStorageService = {
  saveToLS,
  getItem,
  addItem,
  removeItem,
  deleteFromLS,
}
export default localStorageService
