<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">登录</div>
            <div class="text-grey-8">登录以开启medtalk</div>
          </q-card-section>
          <q-card-section>
            <q-input
              dense
              outlined
              v-model="form.username"
              label="用户名"
              :rules="usernameRules"
            ></q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
              v-model="form.password"
              type="password"
              label="密码"
              :rules="passwordRules"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              @click="onSubmit"
              style="border-radius: 8px"
              color="dark"
              rounded
              size="md"
              label="登录"
              no-caps
              class="full-width"
            ></q-btn>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              还没有账号?
              <router-link
                to="/auth/register"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                >点击注册.</router-link
              >
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { login, visit } from "@/api/login";
import { Notify } from "quasar";
import { useUserStore } from "@/store/user";

const $router = useRouter();
const userStore = useUserStore();

const form = reactive({ username: "", password: "" });

const usernameRules = [(val: string) => val?.length > 0 || "请输入用户名"];
const passwordRules = [(val: string) => val?.length > 0 || "请输入密码"];

async function onSubmit() {
  const userStore = useUserStore();
  try {
    Notify.create({ type: "info", message: "提交登录信息" });
    const response = await login(form.username, form.password);
    console.log("登录成功", response);

    const userData = response.data;
    userStore.login(response);

    Notify.create({
      // color: "green-4",
      // textColor: "white",
      // icon: "cloud_done",
      type: "positive",
      message: `登录成功！欢迎 ${userData.username[0] + "*".repeat(userData.username.length - 1)}`,
    });

    $router.push({ name: "chat" });
  } catch (error) {
    console.log("登录失败", error);
  }
}
</script>

<style lang="scss">
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
