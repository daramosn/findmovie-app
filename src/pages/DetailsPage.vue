<template>
  <p v-if="isLoading">Loading...</p>
  <section class="movie-details" v-else-if="movieDetails">
    <img :src="movieDetails.poster_path" alt="poster" :style="{ viewTransitionName: id }" />
    <div class="data">
      <h1>{{ movieDetails.title }}</h1>
      <p>{{ movieDetails.overview }}</p>
      <h4><i>Rating: </i> {{ movieDetails.rating }} ⭐</h4>
      <h5>
        <i>{{ movieDetails.release_date }} </i>
      </h5>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Movie } from '@/types/movie.interface'
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
    rating: data.vote_average.toFixed(1),
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

<style>
.movie-details {
  display: grid;
  grid-template-columns: 0.4fr 0.6fr;
  gap: 32px;

  img {
    width: 100%;
    aspect-ratio: 5/8;
    object-fit: cover;
    border-radius: 4px;
    transition: all 0.2s ease-out;
  }

  .data {
    h1 {
      margin-top: 0;
      font-size: clamp(60px, calc(8.654vw + 10.154px), 96px);
      font-weight: 700;
    }
    p {
      color: rgba(var(--color-rgb), 0.9);
      font-size: 18px;
    }
  }
}

@media (width<768px) {
  .movie-details {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    img {
      width: 50%;
      min-width: 270px;
    }

    .data {
      h1 {
        font-weight: 600;
      }
      p {
        font-size: 16px;
      }
    }
  }
}
</style>
