<template>
  <div class="modern-black-page">
    <div class="q-pa-md" style="display: flex">
      <div class="q-gutter-md" style="flex: 1">
        <div class="logo-container">
          <img
            src="https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?w=740&t=st=1693359039~exp=1693359639~hmac=e1c4b87396670f03b3fad1745015b3048e9f7224a5785073d789e63ae23c82be"
            alt="Logo"
            style="width: 50px; height: 50px"
          />
          <!-- 使用 logo 文件夹中的 logo.svg 文件 -->
        </div>

        <q-list bordered>
          <q-item
            v-for="(session, index) in sessions"
            :key="index"
            :class="{ 'q-item-selected': selectedSession === session.id }"
            clickable
            v-ripple
            @click="selectSession(session.id)"
          >
            <q-item-section avatar>
              <q-avatar
                :color="session.unread ? 'primary' : 'grey-4'"
                text-color="white"
                :rounded="true"
              >
                <q-icon name="account_circle" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ session.title }}</q-item-label>
              <q-item-label caption>{{ session.subject }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="q-pa-md" v-if="selectedSession" style="margin-top: 60px; flex: 2">
        <h1 class="text-h4">{{ selectedSession.title }}</h1>
        <p>创建时间: {{ selectedSession.createTime }}</p>
        <p>更新时间: {{ selectedSession.updateTime }}</p>

        <div class="chat-container" style="flex: 1; overflow-y: auto">
          <div class="chat-messages">
            <div v-for="(message, index) in selectedSession.messages" :key="index">
              <p>{{ message.text }}</p>
              <p class="message-time">{{ message.time }}</p>
            </div>
          </div>

          <div class="input-field" style="margin-top: 10px">
            <q-input
              v-model="newMessage"
              rounded
              filled
              dense
              placeholder="在此输入消息..."
              @keyup.enter="sendMessage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sessions: [
        {
          id: 1,
          title: "会话1",
          subject: "关于主题1的讨论",
          createTime: "2023-08-01",
          updateTime: "2023-08-15",
          unread: true,
          messages: [
            { text: "你好！", time: "08:00 AM" },
            { text: "有什么问题需要帮助吗？", time: "08:05 AM" },
          ],
        },
        {
          id: 2,
          title: "会话2",
          subject: "关于主题2的讨论",
          createTime: "2023-08-05",
          updateTime: "2023-08-20",
          unread: false,
          messages: [
            { text: "Hi there!", time: "09:00 AM" },
            { text: "How can I assist you today?", time: "09:05 AM" },
          ],
        },
        {
          id: 3,
          title: "会话3",
          subject: "关于主题3的讨论",
          createTime: "2023-08-10",
          updateTime: "2023-08-25",
          unread: true,
          messages: [],
        },
      ],
      selectedSession: null,
      newMessage: "",
    };
  },
  methods: {
    selectSession(sessionId) {
      this.selectedSession = this.sessions.find((session) => session.id === sessionId);
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        const newMessage = {
          text: this.newMessage.trim(),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        this.selectedSession.messages.push(newMessage);
        this.newMessage = "";
      }
    },
  },
};
</script>

<style scoped>
.input-field {
  background-color: transparent;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  padding: 5px;
  box-shadow: 0 1px 0 0 #fff;
}

/* 其他样式规则 */
</style>
