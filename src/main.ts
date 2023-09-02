import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Root from "./Root.vue";
import router from "./router";
import "@/static/reset.css";
import "@/static/style.css";
import "@/styles/index.scss";
import "element-plus/dist/index.css";

const app = createApp(Root);
const pinia = createPinia().use(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);
app.mount("#root");
