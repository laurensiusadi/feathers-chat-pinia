<template>
  <main class="login container">
    <div class="row">
      <div class="col-12 col-6-tablet push-3-tablet text-center">
        <h1 class="font-100">Create an Account</h1>
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
          @submit.prevent="onSubmit(email, password)"
        >
          <fieldset>
            <input
              v-model="email"
              class="block"
              type="email"
              name="email"
              placeholder="email"
              required
            />
          </fieldset>

          <fieldset>
            <input
              v-model="password"
              class="block"
              type="password"
              name="password"
              placeholder="password"
              required
            />
          </fieldset>

          <button type="submit" class="button button-primary block signup">
            Signup
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
import { useUsers } from '../store/users'

const router = useRouter()
const auth = useAuth()
const usersStore = useUsers()
const { Model: User } = usersStore

const email = ref('')
const password = ref('')

const error = ref<any>(null)
function dismissError() {
  error.value = null
}

function onSubmit(email: string, password: string) {
  dismissError()

  // Automatically log the user in after successful signup.
  new User({ email, password })
    .save()
    .then(() =>
      auth.authenticate({
        strategy: 'local',
        email,
        password
      })
      .then(() => {
        router.push('/chat')
      })
    )
    
    // Just use the returned error instead of mapping it from the store.
    .catch((err: any) => {
      // Convert the error to a plain object and add a message.
      let type = err.errorType
      err = Object.assign({}, err)
      err.message =
        type === 'uniqueViolated'
          ? 'That email address is unavailable.'
          : 'An error prevented signup.'
      error.value = err
    })
}

</script>
