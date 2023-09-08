<template>
  <div class="q-pa-md">
    <q-parallax :height="730">
      <template v-slot:media>
        <video
          width="720"
          height="440"
          poster="https://cdn.quasar.dev/img/polina.jpg"
          autoplay
          loop
          muted
        >
          <source type="video/webm" src="https://cdn.quasar.dev/img/polina.webm" />
          <source type="video/mp4" src="https://cdn.quasar.dev/img/polina.mp4" />
        </video>
      </template>

      <q-card flat class="bg-white text-black">
        <div class="row">
          <div class="col-md-6 col-xs-12 q-pa-md"></div>
          <div class="col-md-6 col-xs-12">
            <div class="q-pa-md">
              <div class="text-h6 q-pb-md text-blue-8 text-center text-weight-bolder">
                Back Office
              </div>
              <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input
                  filled
                  v-model="form.username"
                  label="Username"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Please type Username']"
                />
                <q-input
                  filled
                  type="password"
                  v-model="form.password"
                  label="Password"
                  lazy-rules
                  :rules="[(val) => (val !== null && val !== '') || 'Please type your password']"
                />
                <div>
                  <q-btn label="Login" type="submit" color="primary" />
                  <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
              </q-form>
            </div>
          </div>
        </div>
      </q-card>
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

const usernameRules = [(val: string) => val?.length > 0 || "请输入用户名"];
const passwordRules = [(val: string) => val?.length > 0 || "请输入密码"];

async function onSubmit() {
  console.log(arguments);
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
      $router.push($route.query.redirect as string);
    } else {
      $router.push({ name: "chat" });
    }
  } catch (error) {
    console.log("登录失败", error);
  }
}
function onReset() {
  form.username = "";
  form.password = "";
}
</script>

<style scoped>
.my_card {
  width: 50rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
