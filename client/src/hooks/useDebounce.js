import {useState, useEffect} from 'react'

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(()=> {
    const handle = setTimeout(()=> {
        setDebounceValue(value)
    }, delay || 500)

    return () => {
        clearTimeout(handle)
    }
  },[value, delay])

  return debounceValue
}

export default useDebounce