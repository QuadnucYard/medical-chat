<template>
  <q-chat-message
    :name="getMessageName(messages[0])"
    :avatar="messages[0].type === MessageType.Answer ? '/img/chatbot.jpg' : userStore.avatar"
    :stamp="formatDate(messages.at(-1)!.send_time)"
    :sent="messages[0].type === MessageType.Question"
    class="message-container"
  >
    <div v-for="msg in messages" :key="msg.id">
      <div class="icon-wrapper" v-if="msg.type === MessageType.Answer">
        <q-btn
          flat
          round
          push
          :color="msg.own_feedback?.mark_like ? 'primary' : 'grey'"
          icon="thumb_up"
          @click="chatStore.sendFeedbackLike(msg)"
        />
        <q-btn
          flat
          round
          push
          :color="msg.own_feedback?.mark_dislike ? 'primary' : 'grey'"
          icon="thumb_down"
          @click="chatStore.sendFeedbackDislike(msg)"
        />
        <q-btn
          flat
          round
          push
          :color="msg.own_feedback?.content.length ? 'primary' : 'grey'"
          icon="textsms"
          @click="comment(msg)"
        />
      </div>
      <div class="whitespace-pre-wrap leading-5 msg-content" v-html="messageContent(msg)" />
    </div>
  </q-chat-message>
</template>

<script setup lang="ts">
import { MessageType } from "@/enums";
import type { ChatMessage } from "@/interfaces";
import { useChatStore } from "@/stores/chat";
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/date-utils";
import Message from "@/utils/message";

const props = defineProps<{ messages: ChatMessage[] }>();

const $q = useQuasar();
const userStore = useUserStore();
const chatStore = useChatStore();

const messageContent = (msg: ChatMessage) =>
  msg.content
    .replace(/<a>(.*)<\/a>/, `<a href="https://zh.wikipedia.org/wiki/$1">$1</a>`)
    .split(/<br>|\n/)
    .map((s) => `<p>${s}</p>`)
    .join("");

async function comment(msg: ChatMessage) {
  $q.dialog({
    title: "评价",
    message: "感谢您的反馈",
    prompt: {
      model: msg.own_feedback?.content ?? "",
      isValid: (val) => val.length > 3, // << here is the magic
      type: "text", // optional
    },
    cancel: true,
    persistent: true,
  }).onOk(async (data) => {
    await chatStore.sendFeedback(msg, { content: data });
    Message.success("评价成功！");
  });
}

function getMessageName(message: ChatMessage): string {
  return message.type === MessageType.Answer ? "MedBot" : userStore.user?.username ?? "Me";
}
</script>

<style scoped lang="scss">
.message-container {
  position: relative;
}

.icon-wrapper {
  position: absolute;
  left: 100%;
  bottom: 0;
  display: flex;
  align-items: center;
  opacity: 0; /* 初始时将图标隐藏 */
  transition: opacity 0.3s ease; /* 添加平滑过渡效果 */
  > .icon {
    margin-right: 10px; /* 调整thumb-up图标与thumb-down图标之间的间距 */
  }
}
.message-container:hover .icon-wrapper {
  opacity: 1; /* 鼠标悬停时显示图标 */
}
</style>
<style lang="scss">
.msg-content {
  p + p {
    margin-top: 0.75ex;
  }
  a {
    color: var(--q-primary-dark) !important;
    font-weight: bolder;
    cursor: pointer;
    @apply hover:underline decoration-dotted decoration-2;
  }
}
</style>
