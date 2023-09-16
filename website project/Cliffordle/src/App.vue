<template>


  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cliffordle: GAA Guessing Game</title>
  </head>
  <body>


  <header>
    <div>
      <h1 id="titleOfPro" class="title is-1"> CLIFFORDLE </h1>
    </div>
    <nav>
      <a class="sign-in">sign in</a>
      <a class="create-account">create account</a>
    </nav>
  </header>

  <p><input type="text" placeholder="Email" v-model="email" v-if="isLoggedOut"/></p>
  <p><input type="password" placeholder="Password" v-model="password" v-if="isLoggedOut"/></p>
  <button @click="register" v-if="isLoggedOut"> Create </button>
  <button @click="login" v-if="isLoggedOut"> Login </button>
  <p v-if="errMsg"> {{ errMsg }}</p>
  <button @click="handleSignOut" v-if="isLoggedIn"> Sign Out </button>

  <SearchBar v-if="isLoggedIn" ></SearchBar>


  </body>
</template>


<script setup>
import SearchBar from './components/SearchBar.vue'
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";


const email = ref("");
const password = ref("");
const errMsg = ref();
const isLoggedIn = ref(false);
const isLoggedOut = ref(true);
const score = ref(0);


const register = () => {
  const auth = getAuth()
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((data) => {
        console.log("Successfully registered")
        console.log(auth.currentUser)
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      })
};
const login = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
        errMsg.value = "";
        console.log("Successfully Signed in!");
        console.log(auth.currentUser)
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Invalid email";
            break;
          case "auth/user-not-found":
            errMsg.value = "No User Found";
            break;
          case "auth/wrong-password":
            errMsg.value = "Incorrect password";
            break;
        }
      })
};

let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) =>{
    if(user){
      isLoggedIn.value = true;
      isLoggedOut.value = false;
    } else {
      isLoggedIn.value = false;
      isLoggedOut.value =true;
    }
  })
});

const handleSignOut = () => {
  signOut(auth).then(() =>{
    window.location.reload()
  })
}

const body = {"@handle: ":+ email.value, "score":+ score.value}



</script>