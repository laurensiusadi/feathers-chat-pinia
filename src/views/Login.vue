<template>
  <main class="login container">
    <div class="row">
      <div class="col-12 col-6-tablet push-3-tablet text-center">
        <h1 class="font-100">Welcome Back</h1>
      </div>
    </div>
    <div class="row">
      <div
        class="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop"
      >
        <div v-if="error" class="error">
          {{ error.message }}
          <a class="close" href="javascript://" @click.prevent="dismissError"
            >dismiss</a
          >
        </div>

        <form
          class="form"
          method="post"
          @submit.prevent="onSubmit"
        >
          <fieldset>
            <input
              v-model="email"
              class="block"
              type="email"
              name="email"
              placeholder="email"
            />
          </fieldset>

          <fieldset>
            <input
              v-model="password"
              class="block"
              type="password"
              name="password"
              placeholder="password"
            />
          </fieldset>

          <button type="submit" class="button button-primary block login">
            Login
          </button>

          <router-link
            as="button"
            :to="{ name: 'Home' }"
            class="button button-secondary block"
            >Back</router-link
          >
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'

const router = useRouter()
const authStore = useAuth()

const email = ref<string | null>(null)
const password = ref<string | null>(null)
const error = ref<any>(null)

function dismissError() {
  error.value = null
}

function onSubmit() {
  if (!email.value || !password.value) { return }
  error.value = null
  authStore.authenticate({
    strategy: 'local',
    email: email.value,
    password: password.value
  })
    .then(() => {
      router.push('/chat')
    })
    // Just use the returned error instead of mapping it from the store.
    .catch((err: any) => {
      // Convert the error to a plain object and add a message.
      let type = err.className
      err = Object.assign({}, err)
      err.message =
        type === 'not-authenticated'
          ? 'Incorrect email or password.'
          : 'An error prevented login.'
      error.value = err
    })
}
</script>
