import { useEffect, useRef, useState } from "react"

export const useSearch = (): {
  search: string,
  updateSearch: React.Dispatch<React.SetStateAction<string>>,
  error: string | null
} => {
  const [search, updateSearch] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search?.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search?.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}