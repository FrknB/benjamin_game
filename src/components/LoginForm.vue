<template>
  <form @submit.prevent="handleSubmit">
      <input type="email" required placeholder="E-mail" v-model="email" />
      <input type="password" required placeholder="Şifre" v-model="password" />
      <div class="error"> {{ error }} </div>
      <button class="loginButton">Giriş Yap</button>
    </form>
</template>
<script>
import { ref } from "vue";
import useLogin from "../composables/useLogin";
export default {
  setup(props, context) {
        const email = ref("");
        const password = ref("");
        /* login ve hata işlemini çağırıyoruz */
        const { error, login } = useLogin();
        const handleSubmit = async () => {
          await login(email.value, password.value);
          if(!error.value){
            /* eğer hata yoksa giriş yaptıktan sonra sayfaya gönderiyoruz */
            /* setup'a parametre olarak context de verdik */
            context.emit("login");
          }
        };
        return { email, password, handleSubmit, error };
    },
}
</script>
<style>
.loginButton{
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
.loginButton:hover{
color: white;
background-color: black;
}
</style>