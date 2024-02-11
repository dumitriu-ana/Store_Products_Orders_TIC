<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";


const store = useStore();
const $router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const userName = computed(() => store.state.user?.email || "NULL");

const logout = () => {
  store.commit("setUser", null);
  // Utilizam $router pentru a face redirecționarea
  $router.push("/");
};
</script>

<template>
  <nav>
    <RouterLink v-if="!isAuthenticated" to="/login" class="link">Login</RouterLink>
    <RouterLink v-if="!isAuthenticated" to="/register" class="link">Register</RouterLink>

    <div v-if="isAuthenticated" class="user-info">{{ userName }}</div>
    <RouterLink to="/" class="link"> Home</RouterLink>
    <RouterLink v-if="isAuthenticated" to="/about" class="link">About</RouterLink>

    <button v-if="isAuthenticated" @click="logout" id="logoutBtn">Logout</button>
  </nav>

  <RouterView />
</template>

<style>
  @import './styles/navbarStyle.css';

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 3.5vh;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }
  .user-info {
    font-size: 3vh; 
    color: #f7a204 ;
    font-weight: bold;

  }
</style>
