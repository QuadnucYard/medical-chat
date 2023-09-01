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

      <chat-area
        class="q-pa-md"
        v-if="selectedSession"
        style="margin-top: 60px; flex: 2"
        :sessionId="selectedSession"
      />
      <div class="q-pa-md q-gutter-sm">
        <q-btn color="black" label="登出" router-link to="/auth/login" />
        <q-btn color="black" label="个人信息" router-link to="/user/info" />
        <!-- <q-card>
          <q-card-section>
            <h4 class="text-h6">热门话题</h4>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-list bordered>
              <q-item
                v-for="(topic, index) in hotTopics"
                :key="index"
                clickable
                v-ripple
                @click="selectTopic(topic.id)"
                class="cursor-pointer"
              >
                <q-item-section>
                  <q-item-label lines="1">
                    <span class="text-weight-medium">{{ topic.title }}</span>
                  </q-item-label>
                  <q-item-label caption lines="1">{{ topic.description }}</q-item-label>
                </q-item-section>

                <q-item-section side v-if="topic.count">
                  <q-badge color="primary" floating>{{ topic.count }}</q-badge>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatSession, getSessions } from "@/api/chat";
import ChatArea from "@/views/components/ChatArea.vue";

const sessions = ref<ChatSession[]>([]);

const selectedSession = ref<int | undefined>(undefined);
// const selectedTopic = ref<int | undefined>(undefined);

onMounted(async () => {
  sessions.value = await getSessions();
  // hotTopics.value = await getTopics();
});

function selectSession(sessionId: int) {
  selectedSession.value = sessionId;
}

// function selectTopic(topicId: int) {
//   selectedTopic.value = topicId;
// }
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
.q-item-selected {
  background-color: #f0f0f0; /* 修改选中项的背景颜色 */
  font-weight: bold; /* 修改选中项的字体加粗 */
}

/* 其他样式规则 */
</style>
