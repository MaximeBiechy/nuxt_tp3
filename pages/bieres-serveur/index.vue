<script setup lang="ts">
import {ref, onMounted, computed, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import type {Beer} from '~/types/Beer'

const route = useRoute()
const router = useRouter()
const beers = ref<Beer[] | null>(null)
const maxPrice = ref<string>(route.query.pricemax as string || '')
const beerType = ref<string>(route.query.type as string || 'ale')
const page = ref<number>(parseInt(route.query.page as string) || 1)
const pageSize = ref<number>(10)

const fetchBeers = async () => {
  try {
    const {data} = await useFetch<Beer[]>(`https://api.sampleapis.com/beers/${beerType.value}`)
    beers.value = data.value
  } catch (error) {
    console.error('Error fetching beers:', error)
  }
}

onMounted(fetchBeers)

const filteredBeers = computed(() => {
  if (!beers.value) return []
  const max = parseFloat(maxPrice.value)
  return isNaN(max) ? beers.value : beers.value.filter(beer => parseFloat(beer.price) <= max)
})

const nextPage = () => {
  page.value += 1
}

const prevPage = () => {
  if (page.value > 1) {
    page.value -= 1
  }
}

watch([maxPrice, page], () => {
  router.push({query: {pricemax: maxPrice.value, type: beerType.value, page: page.value}})
  fetchBeers()
})

const toggleFavorite = (beer: Beer) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  const index = favorites.findIndex((fav: Beer) => fav.id === beer.id)
  if (index === -1) {
    favorites.push(beer)
  } else {
    favorites.splice(index, 1)
  }
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

const isFavorite = (beer: Beer) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  return favorites.some((fav: Beer) => fav.id === beer.id)
}
</script>

<template>
  <div>
    <h1>Bières Serveur</h1>
    <input v-model="maxPrice" placeholder="Prix maximum"/>
    <ul>
      <li v-for="beer in filteredBeers" :key="beer.id">
        <h2>{{ beer.name }}</h2>
        <img :src="beer.image" alt="" width="100"/>
        <p>{{ beer.price }}</p>
        <button @click="toggleFavorite(beer)">
          {{ isFavorite(beer) ? 'Retirer des Favoris' : 'Ajouter aux Favoris' }}
        </button>
        <nuxt-link :to="`/bieres-serveur/${beer.id}`">Voir détails</nuxt-link>
      </li>
    </ul>
    <div>
      <button @click="prevPage" :disabled="page === 1">Précédent</button>
      <button @click="nextPage">Suivant</button>
    </div>
  </div>
</template>

<style scoped>
</style>
