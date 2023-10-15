import { useEffect } from 'react'
import { useState } from 'react'


const getSavedValue = <T>(key: string, initialValue: T) : T => {
   if (!localStorage.getItem(key)) {
      return initialValue
   }
   const savedValue = JSON.parse(localStorage.getItem(key)!)
   console.log(savedValue)
   if (savedValue) return savedValue

   if (initialValue instanceof Function) return initialValue()
   return initialValue
}
const saveValue = <T>(key: string, newValue: T) => {
   localStorage.setItem(key, JSON.stringify(newValue))
}

const useLocalstorage = <T>(key: string, initialValue: T) => {
   const [value, setValue] = useState(() => {
      return getSavedValue<T>(key, initialValue)
   })

   useEffect(() => {
      saveValue<T>(key, value)
   }, [value, key])
   return [value, setValue]
}

export default useLocalstorage
