import { inject } from "vue";
import type { VueCookies } from "vue-cookies";

export const useCookies = () => inject<VueCookies>("$cookies")!;
