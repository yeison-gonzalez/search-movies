import { useCallback, useMemo, useRef, useState } from 'react'
import { IMovie } from '../models/Movie'
import { searchMovies } from '../components/services/movies';

export const useMovies = ({
  sort,
  search
}: {
  sort: boolean,
  search?: string
  }): {
    movies: IMovie[];
    getMovies: ({ search }: { search: string }) => void,
    loading: boolean
  } => {
  const [movies, setMovies] = useState<IMovie[]>([])
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }: { search: string }) => {
    if (search === previousSearch.current) return
    
    try {
      setLoading(true)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, []) 

  const sortedMovies = useMemo(() => {
    return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies 
  }, [sort, movies])
    
  return { movies: sortedMovies, getMovies, loading }
}
