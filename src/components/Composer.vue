<template>
  <form class="flex flex-row flex-space-between" @submit.prevent="onSubmit">
    <input v-model="message.text" type="text" class="flex flex-1" />

    <button class="button-primary" type="submit">
      Send
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessages } from '../store/messages'

const messagesStore = useMessages()
const { Model: Message } = messagesStore

const message = ref<any>(new Message({ text: '' }))

function reset() {
  message.value = new Message({ text: '' })
}
function onSubmit() {
  if (!message.value?.text) {
    return
  }
  message.value.save()
  reset()
}
</script>
