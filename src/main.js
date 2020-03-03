import Vue from 'vue';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

import App from './App.vue';

import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

Vue.component('InputText', InputText);
Vue.component('Button', Button);
Vue.component('TabView', TabView);
Vue.component('TabPanel', TabPanel);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
