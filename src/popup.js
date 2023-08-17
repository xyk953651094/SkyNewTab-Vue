import {createApp} from 'vue'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import popupComponent from '../src/components/popupComponent.vue'

const app = createApp(popupComponent);

app.use(ArcoVue);
app.use(ArcoVueIcon);
app.mount("#popupRoot");