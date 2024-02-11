

   <template>
    <div class="loginForm">
      <form @submit.prevent="loginUser">
        <h2>Autentificare</h2>
        <input type="email" v-model="loginEmail" placeholder="Email">
        <input type="password" v-model="loginPassword" placeholder="Parolă">
        <button type="submit">Autentificare</button>
      </form>

    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
  import router from '../router'
  import { initializeApp } from 'firebase/app'; 
  import { useStore } from 'vuex';
  import '../styles/styleLogin.css';



  export default {
    name: 'LoginView',
    data() {
      return {
        loginEmail: '',
        loginPassword: ''
      };
    },
    methods: {
      async loginUser() {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword).then((userDetails) =>{this.$store.commit("setUser", userDetails.user)});
    console.log('Utilizator autentificat:', auth.currentUser);

   // this.$store.commit('setUser', auth.currentUser);
    router.push('/');
  } catch (error) {
    alert('Eroare la autentificare:'+ error.message);
    console.error('Eroare la autentificare:', error.message);
  }
}
    }
  }
  </script>
  
