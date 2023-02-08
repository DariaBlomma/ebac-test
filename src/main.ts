import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'maz-ui/css/main.css';
import App from './App.vue';

import './assets/main.scss';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
