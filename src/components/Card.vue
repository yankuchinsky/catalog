<script setup lang="ts">
import { ref, watch } from 'vue';
import { useProductsStore } from '@/stores/products';

const props = defineProps({
  id: Number,
  name: String,
  brand: String,
  vendor_sku: String,
  price: Number,
  url: String,
});

const store = useProductsStore();

const checked = ref(false);

watch(checked, () => {
  if (checked.value) {
    store.addProductToSelected(+props.id);
  } else {
    store.removeProductFromSelected(+props.id);
  }
});
</script>

<template>
  <el-card class="card">
    <div class="card-top-controls">
      <el-checkbox v-model="checked" label="Выбрать" size="large" />
    </div>
    <div class="card-item card-image"><img :src="props.url" /></div>
    <div class="card-item card-header">{{ props.name }}</div>
    <div class="card-item card-code">Артикул: {{ props.vendor_sku }}</div>
    <div class="card-item card-brand">{{ props.brand }}</div>

    <div class="card-item card-price">{{ props.price }}₽</div>
  </el-card>
</template>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px;
}

.card-item {
  padding: 5px;
}

.card-controls {
  display: flex;
}

.card-image {
  width: 100px;
  height: 100px;
  padding: 0;
}

.card-image img{
  width: 100px;
  height: 100px;
}

.card-code,
.card-brand {
  color: #999;
}

.card-price {
  font-weight: bold;
  font-size: 22px;
}
</style>
