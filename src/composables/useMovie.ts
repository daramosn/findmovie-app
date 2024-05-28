import { moviesApi } from '@/api/moviesApi'
import type { Movie } from '@/types/movieList.interface'
import { onMounted, ref } from 'vue'

export const useMovies = () => {
  const searchInput = ref('')
  const movies = ref<Movie[]>([])
  const isSearching = ref()
  const error = ref(false)

  const searchMovie = async () => {
    isSearching.value = true
    error.value = false
    const pathName =
      searchInput.value === '' ? window.location.pathname : `?search=${searchInput.value}`
    window.history.replaceState({}, '', pathName)

    try {
      movies.value = await moviesApi(searchInput.value)
    } catch (e) {
      error.value = true
      // throw new Error(`Error fetching movies: ${e}`)
    } finally {
      isSearching.value = false
    }
  }

  onMounted(() => {
    const params = new URLSearchParams(window.location.search)
    searchInput.value = params.get('search') ?? ''
    if (searchInput.value !== '') searchMovie()
  })

  return {
    movies,
    searchInput,
    isSearching,
    error,

    searchMovie
  }
}
