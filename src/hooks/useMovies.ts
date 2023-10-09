import { useState } from 'react'
import { IMovie } from '../models/Movie'
import { searchMovies } from '../components/services/movies';

export const useMovies = ({ search }: { search?: string }): { movies: IMovie[]; getMovies: () => void, loading: boolean } => {
  const [movies, setMovies] = useState<IMovie[]>([])
  const [loading, setLoading] = useState(false)

  const getMovies = async () => {
    try {
      setLoading(true)
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
    
  return { movies, getMovies, loading }
}
