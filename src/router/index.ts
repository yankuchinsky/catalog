import { createRouter, createWebHistory } from 'vue-router';

import { useProductsStore } from '@/stores/products';
import MainView from '../views/MainView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainView,
      beforeEnter: (route) => {
        const store = useProductsStore();
        const { query } = route;
        store.setParams(query);
      }
    },
  ],
});

export default router;
