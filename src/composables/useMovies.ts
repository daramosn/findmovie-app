import { getMoviesApi } from '@/api/moviesApi'
import type { Movie } from '@/types/movie.interface'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export const useMovies = () => {
  const router = useRouter()
  const searchInput = ref('')
  const movies = ref<Partial<Movie>[]>([])
  const isSearching = ref(false)
  const error = ref(false)
  const isEmptyList = ref(false)

  const searchMovie = () => {
    if (searchInput.value === '') return
    const route = router.resolve({ path: '/', query: { search: searchInput.value } })
    router.push(route.fullPath)
  }

  const fetchMovies = async () => {
    error.value = false
    isSearching.value = true
    try {
      movies.value = await getMoviesApi(searchInput.value)
    } catch (e) {
      error.value = true
    } finally {
      isSearching.value = false
      isEmptyList.value = movies.value.length === 0 ? true : false
    }
  }

  watch(
    () => router.currentRoute.value.query.search,
    () => {
      if (router.currentRoute.value.query.search) {
        searchInput.value = `${router.currentRoute.value.query.search}`
      }
      if (searchInput.value !== '') fetchMovies()
    },
    { immediate: true }
  )

  return {
    movies,
    searchInput,
    isSearching,
    error,
    isEmptyList,

    searchMovie
  }
}
