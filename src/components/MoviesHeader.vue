<template>
  <header class="movies-header">
    <nav>
      <h1>Movies app</h1>
    </nav>
    <div>{{ counter }}</div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const counter = ref(10)
</script>

<style>
.movies-header {
  margin: 32px max(32px, calc((100vw - var(--body)) / 2));
}
</style>
