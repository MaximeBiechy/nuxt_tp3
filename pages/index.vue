<script setup lang="ts">
import {ref, computed} from 'vue';
import {useBeerStore} from "~/store/beer";

const beersStore = useBeerStore();
const {fetchBeers} = beersStore;
const {beersList, errorMessage} = storeToRefs(beersStore);

await fetchBeers();

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

const filteredBeers = computed(() => {
  return beersList.value.filter(beer =>
      beer.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedBeers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredBeers.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredBeers.value.length / itemsPerPage);
});
</script>

<template>
  <div>
    <input v-model="searchQuery" placeholder="Search beers..."/>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-else>
      <ul>
        <li v-for="beer in paginatedBeers" :key="beer.id">{{ beer.name }}</li>
      </ul>
      <button @click="currentPage--" :disabled="currentPage === 1">Previous</button>
      <button @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<style scoped>
/* Ajoutez votre style ici */
</style>
