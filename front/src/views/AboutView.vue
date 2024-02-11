<script setup>
import { computed } from 'vue';
import '../styles/aboutStyle.css';
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import { requestOptions, base_url } from "../requestOptions";
const store = useStore();

const isAuthenticated = store.getters.isAuthenticated;
const userName = store.state.user?.email || "NULL";
const products = ref([]);

onMounted(async () => {
  try {
    if (isAuthenticated) {
      const response = await fetch(`${base_url}orders/products/${userName}`);
      const data = await response.json();
      if (data.products) {
        products.value = data.products;
      }
    }
  } catch (error) {
    console.error('Error fetching order products:', error.message);
  }
});

const totalValue = computed(() => {
  return products.value.reduce((total, product) => {
    const cleanedPrice = product.price.replace(/[^0-9.]/g, '');
    const price = parseFloat(cleanedPrice);

    if (!isNaN(price)) {
      return total + price;
    }
    
    return total;
  }, 0);
});

const mostExpensiveProduct = computed(() => {
  if (products.value.length === 0) {
    return null;
  }

  return products.value.reduce((maxProduct, product) => {
    const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));

    if (isNaN(price)) {
      return maxProduct;
    }

    return maxProduct === null || price > maxProduct.price ? { name: product.name, price } : maxProduct;
  }, null);
});

const cheapestProduct = computed(() => {
  if (products.value.length === 0) {
    return null;
  }

  return products.value.reduce((minProduct, product) => {
    const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));

    if (isNaN(price)) {
      return minProduct;
    }

    return minProduct === null || price < minProduct.price ? { name: product.name, price } : minProduct;
  }, null);
});

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const sortAscending = () => {
  const n = products.value.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (products.value[j].name > products.value[j + 1].name) {
        swap(products.value, j, j + 1);
      }
    }
  }
};

const sortDescending = () => {
  const n = products.value.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (products.value[j].name < products.value[j + 1].name) {
        swap(products.value, j, j + 1);
      }
    }
  }
};

const sortAscendingPrice = () => {
  const n = products.value.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (products.value[j].price > products.value[j + 1].price) {
        swap(products.value, j, j + 1);
      }
    }
  }
};

const sortDescendingPrice = () => {
  const n = products.value.length;

for (let i = 0; i < n - 1; i++) {
  for (let j = 0; j < n - i - 1; j++) {
    if (products.value[j].price < products.value[j + 1].price) {
      swap(products.value, j, j + 1);
    }
  }
}
};

const sortAscendingBoth = () => {
  products.value.sort((a, b) => {
    const nameComparison = a.name.localeCompare(b.name);
    return nameComparison !== 0 ? nameComparison : parseFloat(a.price) - parseFloat(b.price);
  });
};

const sortDescendingBoth = () => {
  products.value.sort((a, b) => {
    const nameComparison = b.name.localeCompare(a.name);
    return nameComparison !== 0 ? nameComparison : parseFloat(b.price) - parseFloat(a.price);
  });
};

</script>

<template>
  <main class="about">
    <h1>About - comenzile pentru {{ userName }}</h1>
    <v-divider></v-divider>
    <p>Numarul de produse comandate: {{ products.length }}</p>
    <p>Valoarea produselor: {{ totalValue }}</p>
    <v-divider></v-divider>
    <p>Cel mai costisitor produs : {{ mostExpensiveProduct ? mostExpensiveProduct.name : ' - Nu exista inca produse comandate' }} - {{ mostExpensiveProduct ? mostExpensiveProduct.price : '' }}</p>
    <p>Cel mai accesibil produs: {{ cheapestProduct ? cheapestProduct.name : ' - Nu exista inca produse comandate' }} - {{ cheapestProduct ? cheapestProduct.price : '' }}</p>
    <v-divider></v-divider>


    <div class="btnSort">
      <v-btn icon @click="sortAscending">
        <v-icon color="success">mdi-arrow-up</v-icon>
      </v-btn>

      <span class="sort-text">A-Z</span>

      <v-btn icon @click="sortDescending">
        <v-icon color="success">mdi-arrow-down</v-icon>
      </v-btn>

      <v-btn icon @click="sortAscendingPrice">
        <v-icon color="success">mdi-arrow-up</v-icon>
      </v-btn>

      <span class="sort-text">$$$</span>

      <v-btn icon @click="sortDescendingPrice">
        <v-icon color="success">mdi-arrow-down</v-icon>
      </v-btn>
    </div>

    <div class="btnSort">
      <v-btn icon @click="sortAscendingBoth">
        <v-icon color="success">mdi-arrow-up</v-icon>
      </v-btn>

      <span class="sort-text">Az$</span>

      <v-btn icon @click="sortDescendingBoth">
        <v-icon color="success">mdi-arrow-down</v-icon>
      </v-btn>
    </div>

    <v-card v-if="products.length" class="card" v-for="product in products" :key="product.id">
      <v-card-title>
        <div class="title-price">
          <div class="title">{{ product.name }}</div>
          <div class="price">{{ product.price }}</div>
        </div>
      </v-card-title>
    </v-card>
  </main>
</template>