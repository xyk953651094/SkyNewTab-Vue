import {createApp} from 'vue'
import App from './App.vue'
// import PopupComponent from "@/components/popupComponent.vue";
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);
// const app = createApp(PopupComponent);

app.use(ArcoVue);
app.use(ArcoVueIcon);
app.mount("#app");
