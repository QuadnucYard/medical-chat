<template>
  <div>
    <q-parallax :height="720">
      <!-- <template v-slot:media>
        <video width="720" height="440" poster="/login-video.mp4" autoplay loop muted>
          <source type="video/mp4" src="/img/login-video.mp4" />
        </video>
      </template> -->

      <div class="w-1/2 mx-auto">
        <q-card flat class="bg-white text-black">
          <div class="row">
            <div class="col-md-6 col-xs-12 q-pa-md" style="width: 50%; height: 50%">
              <q-img
                class="w-full h-full mx-auto object-cover"
                placeholder-src="/img/bot.jpg"
                src="/img/bot.jpg"
                spinner-color="white"
              ></q-img>
            </div>
            <div class="col-md-6 col-xs-12">
              <div class="q-pa-md">
                <q-card-section>
                  <div class="text-h6 q-pb-md text-blue-8 text-center text-weight-bolder">MedTalk!</div>
                  <div class="text-subtitle text-blue-8 text-center text-weight-bolder">遇见您的智慧医疗专家</div>
                </q-card-section>
                <q-tabs v-model="tab" class="text-primary">
                  <q-tab label="用户名注册" name="one" />
                  <q-tab label="手机号注册" name="two" />
                </q-tabs>
                <q-separator />
                <q-form @submit="onSubmit1" @reset="onReset" class="q-gutter-md">
                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="one">
                      <q-input
                        filled
                        v-model="form.username"
                        label="用户名"
                        lazy-rules
                        :rules="[(val) => val?.length > 0 || '请输入您的用户名']"
                      />
                      <q-input
                        filled
                        type="password"
                        v-model="form.password"
                        label="密码"
                        lazy-rules
                        :rules="[(val) => val?.length > 0 || '请输入您的密码']"
                      />
                    </q-tab-panel>

                    <q-tab-panel name="two">
                      <q-input
                        filled
                        v-model="form.username"
                        label="用户名"
                        lazy-rules
                        :rules="[(val) => val?.length > 0 || '请输入您的用户名']"
                      />
                      <q-input
                        filled
                        type="password"
                        v-model="form.password"
                        label="手机号"
                        lazy-rules
                        :rules="[(val) => val?.length > 0 || '请输入您的手机号']"
                      />
                    </q-tab-panel>
                  </q-tab-panels>
                  <div class="button-container">
                    <q-btn label="注册" type="submit" color="primary" />
                    <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
                    <q-btn label="已有账号？点击登录" color="primary" flat class="q-ml-sm" size="sm" @click="toLogin" />
                  </div>
                </q-form>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </q-parallax>
  </div>
</template>

<script setup lang="ts">
import { register } from "@/api/login";
import { Notify } from "quasar";
import { useUserStore } from "@/store/user";

const $router = useRouter();
const $route = useRoute();
const userStore = useUserStore();

const form = reactive({ username: "", password: "", mail: "", phone: "" });
let tab = ref("one");

const usernameRules = [(val: string) => val?.length > 0 || "请输入用户名"];
const passwordRules = [(val: string) => val?.length > 0 || "请输入密码"];
// const mailRules = [(val: string) => val?.length > 0 || "请输入您的邮箱"];

async function onSubmit1() {
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
      message: `注册成功！`,
    });

    $router.replace({ name: "login", query: $route.query });
  } catch (error) {
    console.log("注册失败", error);
  }
}
function onReset() {
  form.username = "";
  form.password = "";
  form.phone = "";
}
function toLogin() {
  $router.replace({ name: "login", query: $route.query });
}
</script>

<style lang="scss"></style>
