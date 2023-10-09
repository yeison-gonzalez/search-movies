import { IMovieResponse } from "../../models/Movie"

const URL_BASE = process.env.REACT_APP_API_URL
const API_KEY = process.env.REACT_APP_KEY_API

export const searchMovies = async ({ search }: { search?: string }) => {
  if (!search) return null

  try {
    const response = await fetch(`${URL_BASE}${API_KEY}&s=${search}`)
    const json = await response.json()

    const movies = json.Search

    return movies?.map((movie: IMovieResponse)=> ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))

  } catch (error) {
      throw new Error('Errir searching movies')
  }
}