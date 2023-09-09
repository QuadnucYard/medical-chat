<template>
  <admin-page>
    <admin-section-card>
      <q-card-section>
        <div class="row q-col-gutter-lg">
          <progress-card title="总用户数" caption=" " :value="9999" :progress="1.0" class="col-3" />
          <progress-card
            title="今日注册"
            caption="今日新注册用户数"
            :value="9999"
            :progress="0.1"
            color="green"
            class="col-3"
          />
          <progress-card
            title="今日登录"
            caption="今日登录系统用户数"
            :value="9999"
            :progress="0.7"
            color="orange"
            class="col-3"
          />
          <progress-card
            title="今日活跃"
            caption="今日聊天用户数"
            :value="9999"
            :progress="0.8"
            color="purple"
            class="col-3"
          />
        </div>
      </q-card-section>
    </admin-section-card>
    <admin-section-card>
      <user-table />
    </admin-section-card>
  </admin-page>
</template>

<script setup lang="ts">
import UserTable from "./components/UserTable.vue";
</script>

<style scoped></style>
