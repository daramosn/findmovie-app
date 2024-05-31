<template>
  <section class="searchbar">
    <h3>Enter movie name</h3>
    <form class="searchform" @submit.prevent="searchMovie">
      <input
        type="text"
        v-model="searchInput"
        @keypress.enter="searchMovie"
        required
        placeholder="Avengers..."
      />
      <button @click="searchMovie">Search</button>
    </form>
  </section>

  <MoviesContainer
    :is-empty-list="isEmptyList"
    :error="error"
    :is-searching="isSearching"
    :movies="movies"
    :search-query="route.query.search"
  />
</template>

<script lang="ts" setup>
import MoviesContainer from '@/components/MoviesContainer.vue'
import { useMovies } from '@/composables/useMovies'
import { useRoute } from 'vue-router'
const route = useRoute()

const { isSearching, movies, searchInput, searchMovie, error, isEmptyList } = useMovies()
</script>

<style>
.searchbar {
  h3 {
    font-weight: 450;
  }
  .searchform {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: stretch;
    margin: 16px 0 48px;
    input {
      font-size: 18px;
      padding: 4px 8px;
      border: none;
      border-radius: 6px;
      min-width: 180px;
    }
    button {
      border: none;
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 16px;
      color: #fff;
      background: linear-gradient(45deg, rgb(214, 94, 20), #db0000);
      transition: all 0.1s ease-out;

      &:hover {
        scale: 1.05;
        font-variation-settings: 'wght' 600;
      }
    }
  }
}
</style>
