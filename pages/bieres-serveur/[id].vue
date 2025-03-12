<script setup lang="ts">
import {useRoute} from 'vue-router'
import type {Beer} from "~/types/Beer";

const route = useRoute()
const beerId = route.params.id

const {data: beer} = await useFetch<Beer>(`https://api.sampleapis.com/beers/ale/${beerId}`)
</script>

<template>
  <div v-if="beer">
    <h1>Détails Serveur</h1>
    <h2>{{ beer.name }}</h2>
    <img :src="beer.image" alt="" width="200"/>
    <p>Prix : {{ beer.price }}</p>
    <p>Type : {{ beer.type }}</p>
    <p>Note : {{ beer.rating?.average }}</p>
  </div>
  <div v-else>
    <p>Bière non trouvée...</p>
  </div>
</template>

<style scoped>

</style>
