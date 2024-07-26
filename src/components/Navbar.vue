<template>
  <nav>
    <div>
      <p>Hi! <b>{{ user.displayName }}</b></p>
      <p class="email">Logged in as {{ user.email }}</p>
    </div>
    <button class="pointer" @click="handleClick">Logout</button>
  </nav>
</template>

<script>
import useLogout from '../composables/useLogout';
import getUser from '../composables/getUser';
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue';
export default {
  setup() {
    const router = useRouter();
    const { logout, error } = useLogout();
    const { user } = getUser();
    const safeUser = ref({displayName:'',email:''});

    onMounted(() => {
      if(user.value){
        safeUser.value = user.value;
      }
    });
 
    const handleClick = async () => {
      await logout();
      router.push({name: 'welcome'});
    };
    return { handleClick, user:safeUser };
  }
};
</script>
<style>
nav {
  padding: 20px 40px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
nav p {
  margin: 2px auto;
  font-size: 20px;
  color: black;
}
nav p.email {
  font-size: 16px;
  color: rgb(29, 29, 29);
}
.pointer {
  cursor: pointer;
  text-decoration: none;
  background: #33a464;
  color: #fff;
  font-weight: bold;
  border: 0;
  border-radius: 20px;
  padding: 10px 20px;
  transition: .3s all ease;
}
.pointer:hover {
  background-color: #1b7441;
}</style>