<template>
  <form @submit.prevent="handleSubmit">
      <input type="text" required placeholder="Ad" v-model="displayName" />
      <input type="email" required placeholder="E-mail" v-model="email" />
      <input type="password" required placeholder="Şifre" v-model="password" />
      <div class="error"> {{ error }} </div>
      <button class="signupButton">Kayıt Ol</button>
    </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "../composables/useSignup";
export default {
  setup(props, context) {
  /* object içinde useSignup'u kullanarak aldık */
  const { error, signup } = useSignup();
  const displayName = ref("");
  const email = ref("");
  const password = ref("");
  const handleSubmit = async () => {
    await signup(email.value, password.value, displayName.value);
    if(!error.value){
            /* loginde yaptığımızı buraya da verdik */
            context.emit("signup");
    }
  };
  return { displayName, email, password, handleSubmit, error };
},
}
</script>

<style scoped>
.signupButton{
outline: none;
border: none;
width: 160px;
height: 40px;
border-radius: 10px;
font-weight: bold;
background-color: lightgreen;
color: black;
transition: .3s ease all;
}
.signupButton:hover{
color: white;
background-color: black;
}
</style>