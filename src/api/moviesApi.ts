import type { Movie } from '@/types/movie.interface'
import type { Result } from '@/types/movieList.interface'

export const getMoviesApi = async (searchTerm: string): Promise<Partial<Movie>[]> => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }
  }

  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`Error fetching movies: ${response.statusText}`)
  }
  const data = await response.json()

  const movies = data.results.map((movie: Result) => {
    return {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_path:
        movie.poster_path === null
          ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019'
          : `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    }
  })

  return movies as Partial<Movie>[]
}
