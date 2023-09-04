import { defineStore } from 'pinia';

import { getDataRequest, removeProductRequest } from '../../mock-server/server';

interface IProductsState {
  products: IProduct[] | null;
  categories: ICategory[] | null;
  selectedCategory: number;
  selectedFilter: number;
  selectedProducts: any[];
}

export const useProductsStore = defineStore('products', {
  state: () =>
    ({
      products: null,
      categories: null,
      selectedCategory: null,
      selectedFilter: null,
      selectedProducts: [],
    }) as IProductsState,
  getters: {
    getFilteredProducts: (state: IProductsState) => {
      if (!state.products) {
        return [];
      }

      let data = [...state.products];

      if (state.selectedFilter) {
        data = data.sort((a, b) => {
          if (state.selectedFilter === 1) {
            return a.price > b.price ? 1 : -1;
          }

          if (state.selectedFilter === 2) {
            return a.price < b.price ? 1 : -1;
          }
        });
      }

      const result = data.filter((product) => {
        if (!state.selectedCategory) {
          return product;
        }

        if (~product.categories.indexOf(+state.selectedCategory)) {
          return product;
        }
      });

      return result;
    },
  },
  actions: {
    async fetchData() {
      try {
        const response = await getDataRequest();
        this.products = response.data.products;
        this.categories = response.data.categories;
      } catch (e) {
        //
      }
    },
    setCategory(categoryId: string) {
      this.selectedCategory = +categoryId;
    },
    setFilter(filterId: string) {
      this.selectedFilter = +filterId;
    },
    setParams(params: { selectedCategory?: string; selectedFilter?: string }) {
      if (params.selectedCategory) {
        this.setCategory(+params.selectedCategory);
      }

      if (params.selectedFilter) {
        this.setFilter(+params.selectedFilter);
      }
    },
    clearFiltersAndCategory() {
      this.selectedFilter = null;
      this.selectedCategory = null;
    },
    addProductToSelected(productId: number) {
      const product = this.products.find((product) => product.id === productId);

      if (!product && ~this.products.indexOf(product)) {
        return;
      }

      this.selectedProducts.push(product);
    },
    removeProductFromSelected(productId: number) {
      const products = this.selectedProducts.filter((product) => product.id !== productId);

      this.selectedProducts = products;
    },
    async removeProducts() {
      const requests = [];
      for (const selected of this.selectedProducts) {
        requests.push(removeProductRequest(selected.id));
      }

      await (async () => await Promise.all([...requests]))();
      await this.fetchData();   
    },
  },
});
