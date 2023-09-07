<template>
  <div class="row q-col-gutter-sm m-4">
    <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
      <q-card class="card-bg text-white no-shadow" bordered>
        <q-btn color="dark" label="返回主页" router-link to="/chat" />
        <q-card-section class="text-h6">
          <div class="text-h6">更新页面</div>
          <div class="text-subtitle2">补充信息 帮助我们更好地为您服务！</div>
        </q-card-section>
        <q-card-section class="q-pa-sm">
          <q-list class="row">
            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section side>
                <q-avatar size="100px">
                  <img :src="user_details.avatar_url" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-file
                  v-model="file"
                  outlined
                  label="更改头像"
                  filled
                  style="max-width: 300px"
                  @change="handleFileChange"
                />
                <img v-if="previewUrl" :src="previewUrl" alt="预览头像" />
                <button @click="uploadAvatar">上传头像</button>
              </q-item-section>
            </q-item>

            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  dark
                  color="white"
                  dense
                  v-model="user_details.username"
                  label="您的用户名"
                  readonly
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input dark color="white" dense v-model="user_details.email" label="您的邮箱" />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input dark color="white" dense v-model="user_details.phone" label="您的号码" />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input dark color="white" dense v-model="user_details.name" label="您的昵称" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn class="text-capitalize bg-info text-white" @click="update">更新您的信息</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
      <q-card class="card-bg text-white no-shadow" bordered>
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

    <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
      <q-card class="card-bg text-white no-shadow" bordered>
        <q-card-section class="text-h6 q-pa-sm">
          <div class="text-h6">更改密码</div>
        </q-card-section>
        <q-card-section class="q-pa-sm row">
          <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-item-section> 当前密码 </q-item-section>
          </q-item>
          <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                type="password"
                dark
                dense
                outlined
                color="white"
                round
                v-model="password_dict.current_password"
                label="Current Password"
              />
            </q-item-section>
          </q-item>
          <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-item-section> 新密码 </q-item-section>
          </q-item>
          <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                type="password"
                dark
                dense
                outlined
                color="white"
                round
                v-model="password_dict.new_password"
                label="New Password"
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
                dark
                dense
                outlined
                round
                color="white"
                v-model="password_dict.confirm_new_password"
                label="Confirm New Password"
              />
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn class="text-capitalize bg-info text-white" @click="updatePassword">更改密码</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
  <!-- </q-page> -->
</template>

<script setup lang="ts">
import { getUser, updateUserMe, updateUserMeAvatar } from "@/api/user";
import Message from "@/utils/message";
import { ref } from "vue";

const user_details = ref({});
const password_dict = ref({});

const file = ref({});
const previewUrl = ref({});

onMounted(async () => {
  try {
    user_details.value = await getUser();
  } catch (e) {
    console.log("get user_details error");
  }

  // hotTopics.value = await getTopics();
});
async function update(user_details: any) {
  try {
    Message.info("提交更新信息");
    user_details.value = await updateUserMe({
      email: user_details.email,
      phone: user_details.phone,
      name: user_details.name,
      password: "root",
      password2: "root",
    });
    Message.success(`更新成功！`);
  } catch (e) {
    console.log("update error");
  }
}
async function updatePassword(user_details: any) {
  try {
    Message.info("提交更新信息");
    user_details.value = await updateUserMe({
      email: user_details.email,
      phone: user_details.phone,
      name: user_details.name,
      password: "root",
      password2: "root",
    });
    Message.success(`更新成功！`);
  } catch (e) {
    console.log("update error");
  }
}
function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    this.previewUrl = null;
  }
}
async function uploadAvatar() {
  if (this.file) {
    const formData = new FormData();
    formData.append("avatar", this.file);

    const response = await updateUserMeAvatar(this.file);
  }
}
</script>

<style scoped>
.card-bg {
  background-color: #162b4d;
}
</style>
