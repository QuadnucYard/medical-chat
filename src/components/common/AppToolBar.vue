<template>
  <q-toolbar>
    <q-btn flat dense round icon="menu" aria-label="Menu" @click="emit('switch-left')" />

    <q-toolbar-title style="max-width: 160px"> MedTalk! </q-toolbar-title>

    <q-space />

    <template v-if="userStore.user?.data?.is_superuser">
      <q-btn flat round dense class="q-mr-xs" icon="supervisor_account" @click="toAdmin()">
        <q-tooltip> 后台管理 </q-tooltip>
      </q-btn>
    </template>

    <q-btn flat round dense icon="feed" @click="showSiteInfo">
      <q-tooltip> 关于我们 </q-tooltip>
    </q-btn>
    <template v-if="userStore.user?.data">
      <q-btn flat round dense icon="person">
        <!-- <q-badge color="red" rounded floating>4</q-badge> -->
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
        <q-tooltip> 用户 </q-tooltip>
      </q-btn>
    </template>
    <template v-else>
      <q-btn flat round dense icon="person" @click="toLogin">
        <q-tooltip> 登录 </q-tooltip>
      </q-btn>
    </template>

    <q-btn flat round dense class="q-mr-xs" icon="o_settings" @click="emit('switch-right')">
      <q-tooltip> 个性化 </q-tooltip>
    </q-btn>
  </q-toolbar>
</template>

<script lang="ts" setup>
import { logout } from "@/api/login";
import { getUser } from "@/api/user";
import { useUserStore } from "@/store/user";
import { toLogin } from "@/utils/router-utils";

const $router = useRouter();
const userStore = useUserStore();

const emit = defineEmits<{
  "switch-left": [];
  "switch-right": [];
}>();

const toAdmin = () => {
  $router.push({ name: "admin" });
};

const showUserInfo = () => {
  $router.push({ name: "user-info" });
};

const showSiteInfo = () => {
  $router.push({ name: "site-info" });
};

async function onLogout() {
  console.log("logout");
  await logout();
  location.reload();
}

onMounted(async () => {
  if (userStore.user) {
    try {
      userStore.user.data = await getUser();
    } catch (e) {}
  }
});
</script>
