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
                  <q-tab label="用户名登录" name="one" />
                  <q-tab label="手机号登录" name="two" />
                </q-tabs>
                <q-separator />
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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
                  <div>
                    <q-btn label="登录" type="submit" color="primary" />
                    <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
                    <q-btn
                      label="没有账户？点击注册"
                      color="primary"
                      flat
                      class="q-ml-sm"
                      size="sm"
                      @click="toRegister"
                    />
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
import { login } from "@/api/login";
import { getUser } from "@/api/user";
import Message from "@/utils/message";
import { useUserStore } from "@/store/user";

const $router = useRouter();
const $route = useRoute();

const form = reactive({ username: "", password: "" });
let tab = ref("one");

async function onSubmit() {
  const userStore = useUserStore();
  try {
    Message.info("提交登录信息");
    // 获取token
    const { access_token, token_type } = await login(form.username, form.password);
    console.log("登录成功", access_token, token_type);
    const token = `${token_type} ${access_token}`;
    userStore.login({ token }); // 存token
    // 获取用户
    const user = await getUser();
    console.log("获取用户", user);
    userStore.login({ token, data: user });
    Message.success(`登录成功！`);

    if ($route.query.redirect) {
      $router.replace($route.query.redirect as string);
    } else {
      $router.replace({ name: "chat" });
    }
  } catch (error) {
    console.log("登录失败", error);
  }
}
// Submit2手机号
function onReset() {
  form.username = "";
  form.password = "";
}
function toRegister() {
  $router.replace({ name: "register", query: $route.query });
}
</script>

<style lang="scss"></style>
