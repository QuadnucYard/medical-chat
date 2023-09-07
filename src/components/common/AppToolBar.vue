<template>
  <q-toolbar>
    <q-btn flat dense round icon="menu" aria-label="Menu" @click="emit('switch-left')" />

    <q-toolbar-title style="max-width: 160px"> Medtalk! </q-toolbar-title>

    <q-space />

    <q-btn flat round dense icon="person">
      <q-badge color="red" rounded floating>4</q-badge>
      <q-menu>
        <q-list style="min-width: 100px" dense>
          <q-item clickable v-close-popup>
            <q-item-section @click="showUserInfo">个人信息</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section @click="onLogout">退出</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <q-btn flat round dense class="q-mr-xs" icon="o_settings" @click="emit('switch-right')" />
  </q-toolbar>
</template>

<script lang="ts" setup>
import { logout } from "@/api/login";

const $router = useRouter();

const emit = defineEmits<{
  "switch-left": [];
  "switch-right": [];
}>();

const showUserInfo = () => {
  $router.push({ name: "user-info" });
};

async function onLogout() {
  console.log("logout");
  await logout();
  location.reload();
}
</script>
