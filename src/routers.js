import HomePage from "./page/Home";
import Sigin from "./page/Sigin";
import VueRouter from "vue-router";

const routes = [
  {
    name: "Home",
    component: HomePage,
    path: "/home",
  },
  {
    name: "Sigin",
    component: Sigin,
    path: "/",
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;
