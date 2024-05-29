<template>
  <header class="movies-header">
    <nav>
      <router-link to="/">
        <h1>Findmovie 🎥</h1>
      </router-link>
    </nav>
    <hr />
  </header>
</template>

<style>
.movies-header {
  margin: 32px max(32px, calc((100vw - var(--body)) / 2));

  a {
    text-decoration: none;
    color: currentColor;
  }
}
</style>
