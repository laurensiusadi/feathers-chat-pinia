<template>
  <main id="chat" class="flex flex-column">
    <header class="title-bar flex flex-row flex-center">
      <div class="title-wrapper block center-element">
        <img
          class="logo"
          src="http://feathersjs.com/img/feathers-logo-wide.png"
          alt="Feathers Logo"
        />
        <span class="title">Chat</span>
      </div>
    </header>
    <div v-if="user" class="flex flex-row flex-1 clear">
      <UserList :users="users" @logout="logout" />

      <MessageList :messages="messages" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFind } from 'feathers-pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { useMessages } from '../store/messages'
import { useUsers } from '../store/users'
import UserList from '../components/Users.vue'
import MessageList from '../components/Messages.vue'
import { api as feathersClient } from '../feathers'

// Users
const auth = useAuth()
const user = computed(() => auth?.user ?? null)
const usersStore = useUsers()
const usersParams = computed(() => {
  return {
    query: {
      $sort: { email: 1 },
      $limit: 25
    }
  }
})
const { items: users } = useFind({ model: usersStore.Model, params: usersParams })

// Messages
const messagesStore = useMessages()
const messagesParams = computed(() => {
  return {
    query: {
      $sort: { createdAt: 1 },
      $limit: 25
    }
  }
})
const { items: messages } = useFind({
  model: messagesStore.Model,
  params: messagesParams
})

// Logout
const router = useRouter()
function logout() {
  feathersClient.logout()
    .then(() => {
      router.push('/login')
      window.location.reload()
    })
}
</script>

<style scoped>
main#chat {
  height: 100%;
}

/* Header */
header.title-bar {
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
}

header.title-bar img.logo {
  width: 100%;
  max-width: 140px;
}

header.title-bar span.title {
  color: #969696;
  font-weight: 100;
  text-transform: uppercase;
  font-size: 1.2em;
  margin-left: 7px;
}
</style>
