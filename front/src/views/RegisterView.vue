<template>
  <div class="loginForm">
    <form @submit.prevent="registerUser">
      <h2>Înregistrare</h2>
      <input type="email" v-model="registerEmail" placeholder="Email">
      <input type="password" v-model="registerPassword" placeholder="Parolă">
      <button type="submit">Înregistrare</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import router from '../router'
import { initializeApp } from 'firebase/app';



import '../styles/styleLogin.css';
import { base_url } from '@/requestOptions';

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

export default {
  name: 'RegisterView',
  data() {
    return {
      registerEmail: '',
      registerPassword: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, this.registerEmail, this.registerPassword);
        console.log('Utilizator înregistrat cu succes!');

      fetch(base_url + "register", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
              referrerPolicy: 'no-referrer',
        body: JSON.stringify({ email: this.registerEmail }),
      });

      alert('Utilizator înregistrat cu succes in bd!');
      console.log('Utilizator înregistrat cu succes in bd!');
        router.push('/login');
        
      } catch (error) {
        alert('Eroare la înregistrare:'+ error.message);
        console.error('Eroare la înregistrare:', error.message);
      }
    }
  }
};
</script>
