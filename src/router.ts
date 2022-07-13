import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from './store/auth'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Chat from './views/Chat.vue'

const routes = [
  { path: '', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/chat', name: 'Chat', component: Chat, meta: { requiresAuth: true } }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuth()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    auth.authenticate({ strategy: 'jwt' })
      .then(() => {
        next()
      }).catch((err: any) => {
        console.log('Login error', err)
        next('/login')
      })
  } else {
    next()
  }
})