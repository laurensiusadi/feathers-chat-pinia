<template>
  <div class="message flex flex-row">
    <img
      :src="message.user.avatar || placeholder"
      :alt="message.user.email"
      class="avatar"
    />
    <div class="message-wrapper">
      <p class="message-header">
        <span class="username font-600">{{ message.user.email }}</span>
        <span class="sent-date font-300 pl-2">{{ formattedDate }}</span>
      </p>
      <p class="message-content font-300">{{ message.text }}</p>
    </div>
    <div class="message-action">
      <button class="button-secondary" @click="message.remove()">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const placeholder = 'PLACEHOLDER'

const formattedDate = computed(() => format(props.message.createdAt, 'MMM do, hh:mm:ss'))

</script>

<style scoped>
.pl-2 {
  padding-left: 8px;
}

.message-wrapper {
  flex: 1;
}
</style>
