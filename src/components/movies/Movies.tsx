import { IListOfMoviesProps, IMoviesProps } from '../models/Movies'

const ListOfMovies: React.FC<IListOfMoviesProps> = ({ movies }) => {
  return (
    <ul className='movies'>
      {
        movies?.map(movie => (
          <li key={movie.id} className='movie'>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <img src={movie.poster} alt={movie.title} />
          </li>
        ))
      }
    </ul>
  )
}

const NoMoviesResults = () => {
  return (
    <p>No se encontraron películas para esta búsqueda</p>
  )
}

export function Movies({ movies }: IMoviesProps) {
  const hasMovies = movies?.length > 0

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />
}