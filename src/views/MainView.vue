<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useProductsStore } from '@/stores/products';

import Card from '@/components/Card.vue';
import Filters from '@/components/Filters.vue';

onBeforeMount(() => {
  store.fetchData();
});

const store = useProductsStore();
</script>

<template>
  <main>
    <br/>
    <div class="catalog">
      <Filters />
      <h2 class="catalog-header">Избранное</h2>
      <div class="cards">
        <el-row :gutter="20" v-loading="!store.products">
          <el-col v-for="product in store.getFilteredProducts" :key="product.id" :span="6">
            <Card
              :id="product.id"
              :name="product.name"
              :brand="product.brand"
              :price="product.price"
              :vendor_sku="product.vendor_sku"
              :url="product.url"
            />
          </el-col>
        </el-row>
      </div>
    </div>
  </main>
</template>
<style scoped>
.catalog {
  padding: 15px;
}

.catalog-header {
  margin-bottom: 10px;
}
</style>
