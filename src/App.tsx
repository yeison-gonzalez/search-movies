import './App.css';
import { useMemo } from 'react';
import { Movies } from './components';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';
import { useSort } from './hooks/useSort';
import debounce from 'just-debounce-it';

function App() {
  const { search, updateSearch, error } = useSearch()
  const { sort, handleSort } = useSort()
  const { movies, getMovies, loading } = useMovies({ sort, search })

  const debouncedGetMovies = useMemo(() =>
    debounce((search: string) => {
      getMovies({ search })
    }, 500)
  , [getMovies])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getMovies({ search })
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...'
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}
      </main>
    </div>
  );
}

export default App;
