import App from "./App.vue";
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import locale from "element-ui/lib/locale/lang/pt";

import router from "./routers";

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });
Vue.use(VueRouter);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
