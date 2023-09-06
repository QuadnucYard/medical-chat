<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-form @submit="onSubmit">
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
              <!-- <q-input dense outlined v-model="form.mail" label="邮箱"></q-input> -->
            </q-card-section>
            <q-card-section>
              <q-btn
                type="submit"
                style="border-radius: 8px"
                color="dark"
                rounded
                size="md"
                label="注册"
                no-caps
                class="full-width"
              ></q-btn>
            </q-card-section>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { register } from "@/api/login";
import { getUser } from "@/api/user";
import { Notify } from "quasar";
import { useUserStore } from "@/store/user";

const $router = useRouter();
const userStore = useUserStore();

const form = reactive({ username: "", password: "", mail: "" });

const usernameRules = [(val: string) => val?.length > 0 || "请输入用户名"];
const passwordRules = [(val: string) => val?.length > 0 || "请输入密码"];
// const mailRules = [(val: string) => val?.length > 0 || "请输入您的邮箱"];

async function onSubmit() {
  const userStore = useUserStore();
  try {
    Notify.create({ type: "info", message: "提交注册信息" });
    const response = await register(form.username, form.password);
    const userData = response;
    if (!userData) {
      Notify.create({ type: "negative", message: "注册失败" });
      return;
    }

    Notify.create({
      type: "positive",
      message: `注册成功！欢迎 ${userData.username[0] + "*".repeat(userData.username.length - 1)}`,
    });

    $router.push({ name: "login" });
  } catch (error) {
    console.log("注册失败", error);
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
