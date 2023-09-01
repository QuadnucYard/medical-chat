<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-ma-xs">
          <div class="">
            <q-card class="my-card" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs">
                  <div class="text-overline">medtalk</div>
                  <div class="text-h5 q-mt-sm q-mb-xs">lol</div>
                </q-card-section>

                <q-card-section class="col-5 flex flex-center">
                  <q-img
                    placeholder="点击更改头像"
                    class="rounded-borders"
                    src="https://cdn.quasar.dev/img/boy-avatar.png"
                  />
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-section class="custom-card-section">
                您可以在此修改个人数据 以便我们更好地为您服务 :D
              </q-card-section>
            </q-card>
          </div>
          <div class="">
            <q-card>
              <q-card-section>
                <q-form class="q-gutter-md" @submit="onSubmit">
                  <q-input filled v-model="user.username" label="用户名" lazy-rules />

                  <q-input filled v-model="user.email" label="邮箱" lazy-rules />

                  <q-input filled v-model="user.phone" label="电话号码" lazy-rules />

                  <q-input filled v-model="user.name" label="昵称" lazy-rules />

                  <div>
                    <q-btn label="更新" type="submit" color="primary" />
                    <q-btn label="返回" color="primary" router-link to="/chat" />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { updateUser, getUser } from "@/api/user";
import { Notify } from "quasar";
import { useUserStore } from "@/store/user";

// const userStore = useUserStore();
// console.log(userStore);
const user = ref({ username: "", email: "", phone: "", name: "", id: 0 });

onMounted(async () => {
  user.value = await getUser();
});

async function onSubmit() {
  try {
    Notify.create({ type: "info", message: "提交更新数据" });
    const response = await updateUser(user.value.id, user.value);
    const userData = response;
    if (!userData) {
      Notify.create({ type: "negative", message: "更新失败" });
      return;
    }

    Notify.create({
      type: "positive",
      message: `更新成功！`,
    });
  } catch (error) {
    console.log("更新失败", error);
  }
}
// if (!user) {
//   Notify.create({ type: "negative", message: "获取用户数据失败" });
// }
</script>

<style lang="scss">
.custom-card-section {
  font-size: 14px; /* 修改字体大小为 14 像素 */
  text-align: center; /* 文字居中 */
}
</style>
