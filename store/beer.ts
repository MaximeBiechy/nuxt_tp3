export const useBeerStore = defineStore("beer", {
  state: () => {
    return {
      beers: [] as Array<{ id: number, name: string, price: string, rating: { average: number, reviews: number }, image: string }>,
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
  },
  getters: {
    beersList: state => state.beers,
    errorMessage: state => state.error,
  }
})
