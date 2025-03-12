export const useBeerStore = defineStore("beer", {
  state: () => {
    return {
      beers: [] as Array<{ id: number, name: string, price: string, rating: { average: number, reviews: number }, image: string }>,
      favorites: [] as Array<number>,
      error: null as string | null,
    }
  },
  actions: {
    async fetchBeers() {
      try {
        const {data}: any = await useFetch('https://api.sampleapis.com/beers/ale');
        this.beers = data.value;
        this.error = null;
      } catch (error) {
        this.error = 'Failed to fetch beers. Please try again later.';
      }
    },
    addFavorite(beerId: number) {
      if (!this.favorites.includes(beerId)) {
        this.favorites.push(beerId);
      }
    },
    removeFavorite(beerId: number) {
      this.favorites = this.favorites.filter(id => id !== beerId);
    },
  },
  getters: {
    beersList: state => state.beers,
    errorMessage: state => state.error,
    favoriteBeers: state => state.beers.filter(beer => state.favorites.includes(beer.id)),
  }
})
