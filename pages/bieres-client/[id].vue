<script setup lang="ts">
import {ref, watch, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import type {Beer} from '~/types/Beer'

const route = useRoute()
const beerId = ref<string | null>(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id)

const beer = ref<Beer | null>(null)

const fetchBeer = async (id: string) => {
  beer.value = await $fetch<Beer>(`https://api.sampleapis.com/beers/ale/${id}`)
}

onMounted(() => {
  if (beerId.value) {
    fetchBeer(beerId.value)
  }
})
</script>

<template>
  <div v-if="beer">
    <h1>Détails Client</h1>
    <h2>{{ beer.name }}</h2>
    <img :src="beer.image" alt="" width="200"/>
    <p>Prix : {{ beer.price }}</p>
    <p>Type : {{ beer.type }}</p>
    <p>Note : {{ beer.rating?.average }}</p>
  </div>
  <div v-else>
    <p>Chargement ou bière non trouvée...</p>
  </div>
</template>

<style scoped>
</style>
