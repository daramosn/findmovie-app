<template>
  <section class="movies-container">
    <p v-if="isSearching">Searching...</p>
    <p v-else-if="error">Sorry, there was an error. 😿</p>
    <p v-else-if="isEmptyList">Sorry, there's no results for {{ searchQuery }} 📽️</p>
    <ul v-else>
      <li v-for="movie in movies" :key="movie.id">
        <RouterLink :to="{ name: 'details', params: { id: movie.id } }">
          <img :src="movie.poster_path" alt="movie" />
        </RouterLink>
        <div>
          <small>{{ movie.release_date }}</small> <br />
          <span>{{ movie.title }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import type { Movie } from '@/types/movie.interface'

interface Props {
  isSearching: boolean
  error: boolean
  isEmptyList: boolean
  movies: Partial<Movie>[]
  searchQuery: string
}

const { error, isEmptyList, isSearching, movies, searchQuery } = defineProps<Props>()
</script>

<style>
.movies-container {
  ul {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
    gap: 32px;

    li {
      list-style: none;
      animation: fade-in 0.5s forwards cubic-bezier(0.44, -0.08, 0.34, 1.17);
    }
  }

  img {
    width: 100%;
    aspect-ratio: 5/8;
    object-fit: cover;
    border-radius: 4px;
    transition: all 0.2s ease-out;
    &:hover {
      scale: 1.03;
    }
  }

  p {
    font-size: 24px;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-200);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
