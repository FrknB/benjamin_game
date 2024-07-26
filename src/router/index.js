import { createRouter, createWebHashHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'

import {projectAuth} from '../firebase/config';
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if(!user){
    next({name: 'welcome'});
  }else{
    next();
  }
};
const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if(user){
    next({name: 'gamearea'});
  }else{
    next();
  }
};
const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome,
    beforeEnter: requireNoAuth,
  },
  {
    path: '/gamearea',
    name: 'gamearea',
    component: () => import('../views/GameArea.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: () => import('../views/NotFound.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
