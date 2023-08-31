<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-ma-xs">
          <div class="">
            <q-card class="my-card" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs">
                  <div class="text-overline">US Region</div>
                  <div class="text-h5 q-mt-sm q-mb-xs">Mayur Patel</div>
                  <div class="text-caption text-grey">
                    Sales and Marketing Executive | Graduate and past committee | Keynote speaker on
                    Selling and Recruiting Topics
                  </div>
                </q-card-section>

                <q-card-section class="col-5 flex flex-center">
                  <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-section>
                Assessing clients needs and present suitable promoted products. Liaising with and
                persuading targeted doctors to prescribe our products utilizing effective sales
                skills.
              </q-card-section>
            </q-card>
          </div>
          <div class="">
            <q-card>
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input filled v-model="user.first_name" label="First Name" lazy-rules />

                  <q-input filled v-model="user.last_name" label="Last Name" lazy-rules />

                  <q-input filled v-model="user.age" label="Age" lazy-rules />

                  <q-input filled v-model="user.email" label="Email" lazy-rules />

                  <q-input filled v-model="user.phone" label="Phone" lazy-rules />

                  <div>
                    <q-btn label="Update" type="submit" color="primary" />
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
import { login, visit } from "@/api/login";
import { Notify } from "quasar";
import { useUserStore } from "@/store/user";
const user = reactive([]);
user: [
  {
    first_name: "Mayur",
    last_name: "Patel",
    age: 30,
    email: "m******@****.com",
    phone: "97******92",
  },
];
</script>

<style lang="scss"></style>
