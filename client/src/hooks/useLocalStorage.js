import { useEffect, useState } from 'react'

const PREFIX = 'whatsapp-clone-'

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue === null || jsonValue === undefined || jsonValue === "undefined") {
      if (typeof initialValue === 'function') {
        return initialValue()
      } else {
        return initialValue
      }
    }
    try {
      return JSON.parse(jsonValue)
    } catch (e) {
      // fallback if parsing fails
      if (typeof initialValue === 'function') {
        return initialValue()
      } else {
        return initialValue
      }
    }
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}