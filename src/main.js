import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import axiosInstance from "./plugins/axios";

loadFonts(); // 폰트 로드를 먼저 수행

const app = createApp(App);

app.config.globalProperties.$axios = axiosInstance; // Axios를 전역 프로퍼티로 추가

app.use(vuetify); // Vuetify를 사용

app.mount("#app"); // 앱을 마운트
