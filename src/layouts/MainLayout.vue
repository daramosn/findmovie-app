<template>
  <MoviesHeader />
  <main>
    <RouterView />
  </main>
</template>

<script lang="ts" setup>
import MoviesHeader from '@/components/MoviesHeader.vue'
</script>

<style>
main {
  margin: 32px max(32px, calc((100vw - var(--body)) / 2));
}
</style>
