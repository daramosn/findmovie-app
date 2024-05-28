<template>
  <div>
    <h2>Details page</h2>
  </div>
  <p v-if="isLoading">Loading...</p>
  <section v-else-if="movieDetails">
    <img :src="movieDetails.poster_path" alt="poster" />
    <p>{{ movieDetails.overview }}</p>
    <p>{{ movieDetails.rating }}</p>
    <p>{{ movieDetails.release_date }}</p>
  </section>
</template>

<script lang="ts" setup>
import type { Movie } from '@/types/movieList.interface'
import { onMounted, ref } from 'vue'

interface Props {
  id: string
}

const isLoading = ref(true)
const movieDetails = ref<Movie>()

const { id } = defineProps<Props>()

const fetchDetails = async () => {
  const url = `https://api.themoviedb.org/3/movie/${id}`
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
  movieDetails.value = {
    id: Number(id),
    title: data.title,
    release_date: data.release_date,
    rating: data.vote_average,
    overview: data.overview,
    poster_path:
      data.poster_path === null
        ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019'
        : `https://image.tmdb.org/t/p/w500${data.poster_path}`
  }
  isLoading.value = false
}

onMounted(fetchDetails)
</script>
