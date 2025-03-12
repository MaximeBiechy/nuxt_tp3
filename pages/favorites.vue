<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Beer } from '~/types/Beer'

const favorites = ref<Beer[]>([])

const fetchFavorites = () => {
  favorites.value = JSON.parse(localStorage.getItem('favorites') || '[]')
}

const removeFavorite = (beer: Beer) => {
  const index = favorites.value.findIndex(fav => fav.id === beer.id)
  if (index !== -1) {
    favorites.value.splice(index, 1)
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }
}

onMounted(fetchFavorites)
</script>

<template>
  <div>
    <h1>Bières Favorites</h1>
    <ul>
      <li v-for="beer in favorites" :key="beer.id">
        <h2>{{ beer.name }}</h2>
        <img :src="beer.image" alt="" width="100"/>
        <p>{{ beer.price }}</p>
        <button @click="removeFavorite(beer)">Retirer des Favoris</button>
        <nuxt-link :to="`/bieres-client/${beer.id}`">Voir détails</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>
