<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const beerType = ref('ale')

const navigateToBeerType = () => {
  router.push(`/bieres-client?type=${beerType.value}`)
}
</script>

<template>
  <div>
    <h1>Type de bière</h1>
    <select v-model="beerType">
      <option value="ale">IPA</option>
      <option value="stouts">Stouts</option>
    </select>
    <button @click="navigateToBeerType">Voir les bières</button>
  </div>
</template>

<style scoped>
</style>
