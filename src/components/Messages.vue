<template>
  <div class="flex flex-column col col-9">
    <main ref="chatPane" class="chat flex flex-column flex-1 clear">
      <SingleMessage
        v-for="message in messages"
        :key="message._id"
        :message="message"
      />
    </main>

    <ComposeMessage />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import ComposeMessage from './Composer.vue'
import SingleMessage from './Message.vue'

const props = defineProps({
  messages: {
    type: Array<any>,
    required: true
  }
})

// Chat Pane
const chatPane = ref<any>(null)
function scrollToBottom() {
  nextTick(() => {
    if (!chatPane.value) return
    chatPane.value.scrollTop = chatPane.value.scrollHeight
  })
}
onMounted(() => {
  watch(
    () => props.messages.length,
    () => scrollToBottom()
  )
})

</script>

<style>
main.chat {
  padding: 10px;
  overflow-y: auto;
}

main.chat img.avatar {
  border-radius: 100%;
  height: 45px;
  width: 45px;
  flex: none;
}

main.chat .message {
  flex: 0 0 auto;
}

main.chat .message img.avatar {
  margin-right: 10px;
}

main.chat .message p.message-header {
  margin: 0;
  font-size: 0.9em;
}

main.chat .message p.message-header span.sent-date {
  color: #969696;
}
</style>
