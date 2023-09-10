<template>
  <q-chat-message
    v-if="message.type !== 2"
    :name="getMessageName(message)"
    :avatar="MyAvatar"
    :stamp="formatDate(message.send_time)"
    :sent="message.type === 0"
    class="message-container"
  >
    <div>
      <div class="icon-wrapper" v-if="message.type === 1">
        <q-btn
          flat
          round
          push
          :color="message.own_feedback?.mark_like ? 'primary' : 'dark'"
          icon="thumb_up"
          @click="like()"
        />
        <q-btn
          flat
          round
          push
          :color="message.own_feedback?.mark_dislike ? 'primary' : 'dark'"
          icon="thumb_down"
          @click="dislike()"
        />
        <q-btn flat round push color="primary" icon="textsms" @click="comment()" />
      </div>
      <div class="whitespace-pre-wrap leading-6">
        {{ message.content }}
      </div>
    </div>
  </q-chat-message>
</template>

<script setup lang="ts">
import MyAvatar from "@/assets/chatbot.jpg";
import UserAvatar from "@/assets/knight.png";
import { ChatMessage, ChatFeedback } from "@/api/chat";
import { addFeedback } from "@/api/chat";
import Message from "@/utils/message";
import { formatDate } from "@/utils/date-utils";

const props = defineProps<{ message: ChatMessage }>();

const $q = useQuasar();

async function like() {
  const mark = !props.message.own_feedback?.mark_like;
  await sendFeedback({ mark_like: mark });
}
async function dislike() {
  const mark = !props.message.own_feedback?.mark_dislike;
  await sendFeedback({ mark_dislike: mark });
}

async function comment() {
  $q.dialog({
    title: "评价",
    message: "感谢您的反馈",
    prompt: {
      model: props.message.own_feedback?.content ?? "",
      isValid: (val) => val.length > 3, // << here is the magic
      type: "text", // optional
    },
    cancel: true,
    persistent: true,
  }).onOk(async (data) => {
    await sendFeedback({ content: data });
    Message.success("评价成功！");
  });
}

async function sendFeedback(mod: Partial<ChatFeedback>) {
  const response = await addFeedback(Object.assign({}, mod, { msg_id: props.message.id }));
  props.message.own_feedback = response;
}

function getMessageName(message: any): string {
  return message.type === 1 ? "MedBot" : "Me";
}
</script>

<style scoped lang="scss">
.message-container {
  position: relative;
}

.icon-wrapper {
  position: absolute;
  left: 10px;
  bottom: -30px; /* 调整图标与消息之间的水平间距 */
  opacity: 0; /* 初始时将图标隐藏 */
  transition: opacity 0.3s ease; /* 添加平滑过渡效果 */
  display: flex; /* 将图标容器设置为弹性布局 */
  align-items: center; /* 垂直居中对齐图标 */
  > .icon {
    margin-right: 10px; /* 调整thumb-up图标与thumb-down图标之间的间距 */
  }
}
.message-container:hover .icon-wrapper {
  opacity: 1; /* 鼠标悬停时显示图标 */
}
</style>
