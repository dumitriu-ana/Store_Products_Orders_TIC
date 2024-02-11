<script setup>
import { useStore } from "vuex";

import {computed , ref } from 'vue';

const store = useStore();

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const userName = computed(() => store.state.user?.email || "NULL");


const newProduct = ref({
  name: "",
  price: "",
  material: "",
  description: "",
});

</script>

<template>
  <h2>Products</h2>
  <v-container  v-if="isAuthenticated && store.state.user?.email === 'ttt@gmail.com'">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="mx-auto" max-width="344">
          <v-img
            :src="imageUrl"
            height="200px"
            cover
          ></v-img>

          <v-card-text class="custom-title-background">
            <input ref="nameInput" class="white-text" type="text" placeholder="name">
            <input ref="priceInput" class="" type="text" placeholder="price">
            <input ref="materialInput" class="" type="text" placeholder="material">
            <input ref="descriptionInput" class="" type="text" placeholder="description">

      </v-card-text>

<v-card-actions>
  <v-btn
    class="btn-buy"
    variant="contained"
    color="teal"
    @click="addProduct"
  >
    ADD
  </v-btn>
</v-card-actions>


        </v-card>
      </v-col>
    </v-row>
  </v-container>


  <v-container>
    <v-row>
      <v-col v-for="prod in products" :key="prod.id" cols="12" md="4">
        <v-card class="mx-auto" max-width="344">
          <v-img
            :src="imageUrl"
            height="200px"
            cover
          ></v-img>

          <v-card-text class="custom-title-background">
            <div class="white-text">{{ prod.name }}</div>
            <p class="text-h4 text--primary price-text">{{ prod.price }}</p>
            <p>{{ prod.material }}</p>
          </v-card-text>

          <v-card-actions>
            <v-btn
              v-if="isAuthenticated"
              class="btn-buy"
              variant="contained"
              color="teal"
              @click="buyProduct(prod)"
            >
              BUY
            </v-btn>
            <v-btn
              v-if="!isAuthenticated"
              variant="outlined"
              color="grey"
              @click="redirectToLogin"
            >
              Login to Buy
            </v-btn>
            <v-btn
              variant="text"
              color="teal-accent-4"
              @click="reveal = !reveal; selectedProduct = prod"
            >
              Learn More
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <v-card
              v-if="reveal && selectedProduct.id === prod.id"
              class="v-card--reveal"
              style="height: 100%; position: absolute; bottom: 0; width: 100%"
            >
              <v-card-text class="pb-0">
                <p class="text-h4 text--primary">Description</p>
                <p>{{ prod.description }}</p>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-btn
                  variant="text"
                  color="teal-accent-4"
                  @click="reveal = !reveal; selectedProduct = {}"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import '../styles/homeStyle.css'

import { onUnmounted, reactive } from 'vue';
import { initializeApp } from 'firebase/app';
import { getFirestore,  setDoc, doc, getDoc, collection, addDoc, } from 'firebase/firestore';

import { requestOptions, base_url } from "../requestOptions";
import '../styles/styleLogin.css';


  

const firebaseConfig = {
  apiKey: "AIzaSyA6u-5-xQCv548sHlvx1FS18IdFhMwajQM",
  authDomain: "anaproiectticvue.firebaseapp.com",
  databaseURL: "https://anaproiectticvue-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "anaproiectticvue",
  storageBucket: "anaproiectticvue.appspot.com",
  messagingSenderId: "1076193723213",
  appId: "1:1076193723213:web:fc9dfdaabbd166565ded04",
  measurementId: "G-VYKC368DP1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  name: 'HomeView',

  data() {
    return {
      imageUrl: "https://images.saymedia-content.com/.image/t_share/MTc2MjQ3MTQ3MzA4NjU2MDQx/how-to-make-green-roses-a-step-to-step-guide.jpg",
      products: [],
      reveal: false,
     
    };
  },
  methods: {

    async addProduct() {
  try {
    const productData = {
      name: this.$refs.nameInput.value,
      price: this.$refs.priceInput.value,
      material: this.$refs.materialInput.value,
      description: this.$refs.descriptionInput.value,
    };

    console.log('New Product Data:', productData);

    const prod = {
      name: productData.name,
      price: productData.price,
      material: productData.material,
      description: productData.description,
    };

    // Add a document to the "products" collection
    await addDoc(collection(db, 'products'), prod);

    console.log('Product added successfully to the "products" collection!');

    // Clear input fields
    this.$refs.nameInput.value = '';
    this.$refs.priceInput.value = '';
    this.$refs.materialInput.value = '';
    this.$refs.descriptionInput.value = '';


    alert('Product added successfully!');
  } catch (error) {
    console.error('Error adding product:', error.message);

  }
},



async buyProduct(product) {
  try {
    const currentUserEmail = this.$store.state.user?.email;
    console.log(`Produsul ${product.name} a fost cumpărat de ${currentUserEmail} !`);
    // Verifică obiectul db
    console.log('Db object:', db);

    const obj = {
      email: this.$store.state.user?.email,
      product: {
        name: product.name,
        price: product.price,
      },
    };

    // vf user
    const orderDocRef = doc(db, "orders", currentUserEmail);
    const orderDoc = await getDoc(orderDocRef);

    if (orderDoc.exists()) {
      // ad 
      const existingOrder = orderDoc.data();
      const updatedProducts = existingOrder.products || [];
      updatedProducts.push(obj.product);

      await setDoc(orderDocRef, { products: updatedProducts });
    } else {
      // user nu exista
      await setDoc(doc(db, "orders", currentUserEmail), {
        products: [
          {
            name: product.name,
            price: product.price,
          },
        ],
      });
    }

    console.log(`Comanda pentru ${product.name} a fost salvată cu succes pentru ${currentUserEmail}!`);
  } catch (error) {
    console.error('Eroare la cumpărarea produsului:', error);
  }
},


    redirectToLogin() {
      
      console.log("Trebuie sa te autentifici pentru a");
    },
  },
  created() {
    if (!this.products.length) {
      fetch(base_url + "products", requestOptions).then((res) =>
        res.json().then((res) => {
          this.products = [...res];
        })
      );
    }
  },


} 
</script>