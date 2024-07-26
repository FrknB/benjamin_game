<template>
  <div class="welcome">
    <!-- Login ve Signup arasında geçiş yaptık -->
    <div v-if="showLogin">
      <img src="../assets/img/benjamin-text.png" class="logo" alt="">
      <h2 class="title">Giriş Yap</h2>
      <!-- login formda context emit verdik ve burada kullanıyoruz -->
      <LoginForm @login="enterGameArea" />
      <p>Hala hesabın yok mu? <span class="welcomeSpan" @click="showLogin = false">Kayıt Ol</span></p>
    </div>
    <div v-else>
      <img src="../assets/img/benjamin-text.png" class="logo" alt="">
      <h2>Kayıt Ol</h2>
      <SignupForm @signup="enterGameArea" />
      <p>Zaten kayıtlı mısın? <span class="welcomeSpan" @click="showLogin = true">Giriş Yap</span></p>
    </div>
    <!-- Login ve Signup arasında geçiş yaptık 'yorum kapanışı' -->
  </div>
</template>
  
<script>
import LoginForm from "../components/LoginForm.vue";
import SignupForm from "../components/SignupForm.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  components: { LoginForm, SignupForm },

  setup() {
    /* login ve signup arasında geçişi sağladık */
    const showLogin = ref(true);
    /* router import ettik ve tanımladık yönlendirme için */
    const router = useRouter();

    const enterGameArea = () => {
      router.push({
        name: 'gamearea',
      });
    };
    return { showLogin, enterGameArea };
  },
};
</script>
<style>
.welcome {
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 40px;
}
.logo{
  width: 260px;
  padding: 60px 0 40px 0;
  height: auto;
}
.welcome form {
  width: 300px;
  margin: 20px auto;
}

.welcome label {
  display: block;
  margin: 20px 0 10px;
}

.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ddd;
  margin: 10px auto;
  outline: none;
  color: #777;
}

.welcomeSpan{
  text-decoration: underline;
  color: #33a464;
  font-weight: bold;
  cursor: pointer;
}

.welcome button {
  margin: 20px auto;
}
</style>