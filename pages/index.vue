<script setup lang="ts">
import {ref, computed} from 'vue';
import {useBeerStore} from "~/store/beer";

const beersStore = useBeerStore();
const {fetchBeers} = beersStore;
const {beersList, errorMessage} = storeToRefs(beersStore);

await fetchBeers();

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 16;

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

const setDefaultImage = (event: Event) => {
  (event.target as HTMLImageElement).src = '/defaultBeer.jpeg';
};
</script>

<template>
  <div>
    <div class="search-bar-container">
      <input v-model="searchQuery" placeholder="Search beers..." class="search-bar"/>
    </div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-else>
      <ul class="grid">
        <li v-for="beer in paginatedBeers" :key="beer.id" class="beer-item">
          <img :src="beer.image" @error="setDefaultImage" alt="beer.name" class="image"/>
          <div class="beer-details">
            <div class="beer-name">{{ beer.name }}</div>
            <div class="beer-price">Price: {{ beer.price }}</div>
            <div class="beer-rating">Rating: {{ beer.rating.average }} ({{ beer.rating.reviews }} reviews)</div>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <button @click="currentPage--" :disabled="currentPage === 1">Previous</button>
        <button @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.search-bar {
  padding: 0.5rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: red;
  text-align: center;
  margin-bottom: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.beer-item {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}

.beer-details {
  margin-top: 0.5rem;
}

.beer-name {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.beer-price, .beer-rating {
  font-size: 0.9rem;
  color: #555;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border: none;
  background: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
