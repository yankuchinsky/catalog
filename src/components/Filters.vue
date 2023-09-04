<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import router from '@/router';

import { useProductsStore } from '@/stores/products';
import getNewRouterQueryParams from '@/helpers/routerQuery';

const store = useProductsStore();

const selectedCategory = ref('');
const selectedFilter = ref('');
const deleting = ref(false);

onBeforeMount(() => {
  if (store.selectedFilter) {
    selectedFilter.value = store.selectedFilter.toString();
  }

  if (store.selectedCategory) {
    selectedCategory.value = store.selectedCategory.toString();
  }
});

watch(selectedCategory, () => {
  store.setCategory(selectedCategory.value);
  const queryParams = router.currentRoute.value.query;
  queryParams.selectedCategory = selectedCategory.value;
  const queryString = getNewRouterQueryParams(queryParams);
  window.history.pushState({}, null, queryString);
});

watch(selectedFilter, () => {
  store.setFilter(selectedFilter.value);
  const queryParams = router.currentRoute.value.query;
  queryParams.selectedFilter = selectedFilter.value;
  const queryString = getNewRouterQueryParams(queryParams);
  window.history.pushState({}, null, queryString);
});

const clearFilters = () => {
  selectedCategory.value = '';
  selectedFilter.value = '';
  store.clearFiltersAndCategory();
  window.history.pushState({}, null, '/');
};

const deleteProductSelectedProducts = async () => {
  deleting.value = true;
  await store.removeProducts();
  deleting.value = false;
};
</script>
<template>
  <div class="filters">
    <div class="sort-filters">
      <div>Сортировать</div>
      <el-radio-group v-model="selectedFilter" class="radio-group">
        <el-radio-button label="1"> От дешевых к дорогим </el-radio-button>
        <el-radio-button label="2"> От дорогих к дешевым </el-radio-button>
      </el-radio-group>
    </div>
    <div class="clear-all">
      <el-button @click="clearFilters">Очистить фильтры</el-button>
    </div>
    <div class="bottom-filters">
      <el-select v-model="selectedCategory" placeholder="Категории">
        <el-option-group v-for="group in store.categories" :key="group.id" :label="group.name">
          <el-option
            v-for="item in group.children"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-option-group>
      </el-select>
      <div v-if="store.selectedProducts.length" class="selected-products">
        Выбрано товаров:
        {{ store.selectedProducts.length }}
        <el-button @click="deleteProductSelectedProducts" :disabled="deleting">Удалить</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.sort-filters {
  display: flex;
  margin-bottom: 10px;
}

.radio-group {
  margin-left: 10px;
}

.clear-all {
  position: absolute;
  top: 10px;
  right: 10px;
}

.bottom-filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.selected-products {
  padding: 10px;
}
</style>
