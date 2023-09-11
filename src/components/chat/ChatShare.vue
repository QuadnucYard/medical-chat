<template>
  <div></div>
</template>

<script setup lang="ts">
import { createShare } from "@/api/share";
import { ChatSession } from "@/api/chat";

const props = defineProps<{ session: ChatSession }>();

const share_data = ref({
  chat_id: 0,
  expire_time: "",
  max_uses: 0,
  readonly: false,
});
const share_link = ref("");

async function onCreateShare(session_id: int) {
  share_data.value.chat_id = session_id;
  const response = await createShare(share_data.value);
  const share_link = response.id;
}
</script>

<style scoped></style>
