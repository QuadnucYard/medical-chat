<template>
  <div class="row q-col-gutter-sm p-4 bg-primary-1">
    <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
      <q-card class="bg-primary-2 no-shadow" bordered v-if="user">
        <q-banner rounded class="text-center bg-primary-3">
          <span class="text-h5"> 更新您的信息</span>
        </q-banner>

        <q-card-section class="q-pa-sm">
          <q-list class="row">
            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section side>
                <q-btn round @click="uploadState = !uploadState" title="点击上传新头像">
                  <q-avatar size="100px" class="shadow-2">
                    <img :src="userStore.avatar" />
                  </q-avatar>
                </q-btn>
              </q-item-section>
              <q-item-section>
                <q-uploader
                  v-if="uploadState"
                  style="max-width: 240px; max-height: 200px"
                  label="新头像"
                  accept=".jpg, image/*"
                  :factory="uploadAvatar"
                />
              </q-item-section>
            </q-item>

            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input filled stack dense v-model="user.username" label="您的用户名" readonly />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input filled stack dense v-model="userInfo.email" label="您的邮箱" :readonly="!editing" />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input filled stack dense v-model="userInfo.phone" label="您的号码" :readonly="!editing" />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input filled stack dense v-model="userInfo.name" label="您的昵称" :readonly="!editing" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <template v-if="editing">
            <q-btn color="primary" @click="endEditing">确认</q-btn>
            <q-btn @click="cancelEditing">取消</q-btn>
          </template>
          <template v-else>
            <q-btn color="primary" @click="editing = true">更新信息</q-btn>
          </template>
        </q-card-actions>
      </q-card>

      <q-card class="bg-primary-2 no-shadow" bordered>
        <q-form @submit="updatePassword">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">更改密码</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> 当前密码 </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password" dense filled stack v-model="passwordForm.old_password" label="当前密码" />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> 新密码 </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dense
                  filled
                  color="blue"
                  stack
                  v-model="passwordForm.new_password"
                  label="新密码"
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> 确认新密码 </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  filled
                  dense
                  stack
                  v-model="passwordForm.confirm_password"
                  label="确认新密码"
                  :rules="[
                    (val) => passwordForm.new_password.length === 0 || val?.length > 0 || '请输入密码',
                    (val) => val === passwordForm.new_password || '密码不一致！',
                  ]"
                />
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" type="submit">更改密码</q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
    <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
      <q-card class="bg-primary-2 no-shadow" bordered>
        <q-card-section class="text-center bg-transparent">
          <q-avatar size="100px" class="shadow-10">
            <img
              src="https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?w=740&t=st=1693359039~exp=1693359639~hmac=e1c4b87396670f03b3fad1745015b3048e9f7224a5785073d789e63ae23c82be"
            />
          </q-avatar>
          <div class="text-subtitle2 q-mt-lg">by MedChat</div>
          <div class="text-h6 q-mt-md">MedChat</div>
        </q-card-section>
        <q-card-section>
          <div class="text-body2 text-justify">
            作为医疗问答系统，我是您的个人医疗助手。我旨在为您提供准确、可靠的医疗信息和答案，帮助您解答各种健康问题和疑虑。无论是关于常见疾病、症状解释、治疗选项还是预防措施，我都可以为您提供专业建议和指导。我会根据您提供的症状描述和问题，给出可能的诊断建议，但请注意，这不应替代实际就医和专业医生的意见。
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <!-- </q-page> -->
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import Message from "@/utils/message";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const editing = ref(false);

const userInfo = reactive({
  email: user.value?.email || "",
  phone: user.value?.phone || "",
  name: user.value?.name || "",
});

const passwordForm = reactive({
  old_password: "",
  new_password: "",
  confirm_password: "",
});

const uploadState = ref(false);

function cancelEditing() {
  editing.value = false;
  userInfo.email = user.value?.email || "";
  userInfo.phone = user.value?.phone || "";
  userInfo.name = user.value?.name || "";
}

async function endEditing() {
  await userStore.updateMe(userInfo);
  Message.success("更新成功！");
  cancelEditing();
}

async function updatePassword() {
  await userStore.updateMyPassword(passwordForm);
  Message.success("成功更改密码！");
}

async function uploadAvatar(files: readonly File[]) {
  const file = files[0];
  if (file) {
    await userStore.updateMyAvatar(file);
    Message.success("成功更新头像！");
    uploadState.value = false;
  } else {
    Message.warning("你没有选择文件！");
  }
  return { url: "" };
}
</script>

<style scoped></style>
