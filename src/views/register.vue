<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">注册</div>
            <div class="text-grey-8">注册以开启medtalk</div>
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
            <q-input dense outlined v-model="form.mail" label="邮箱" :rules="mailRules"></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              color="dark"
              rounded
              size="md"
              label="注册"
              no-caps
              class="full-width"
            ></q-btn>
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

const form = reactive({ username: "", password: "", mail: "" });

const usernameRules = [(val: string) => val?.length > 0 || "请输入用户名"];
const passwordRules = [(val: string) => val?.length > 0 || "请输入密码"];
const mailRules = [(val: string) => val?.length > 0 || "请输入您的邮箱"];

async function onSubmit() {
  Notify.create({ type: "info", message: "提交登录信息" });
  const { access_token, token_type } = await visit(form.username);
  const token = `${token_type} ${access_token}`;
  userStore.login({ token });

  const userData = await login(form.username, form.password);
  if (!userData) {
    Notify.create({ type: "negative", message: "认证失败" });
    return;
  }

  userStore.login({ token, data: userData });
  Notify.create({
    // color: "green-4",
    // textColor: "white",
    // icon: "cloud_done",
    type: "positive",
    message: `登录成功！欢迎 ${userData.userName[0] + "*".repeat(userData.userName.length - 1)}`,
  });
  $router.push({ name: "display" });
}
</script>

<style lang="scss">
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
