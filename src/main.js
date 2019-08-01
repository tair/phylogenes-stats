import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
// import VueGoogleCharts from 'vue-google-charts'
// Vue.use(VueGoogleCharts)
import { routes } from "./routes";
import VueRouter from 'vue-router';
import "@/plugins/echarts";
import Chart from 'chart.js';


Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
