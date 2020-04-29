import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomePage/index"),
      meta: { needToken: true, toAction: false },
    },
    {
      path: "/welcome",
      component: () => import("@/views/WelcomePage/index"),
      meta: { needToken: false, toAction: true },
    },
    {
      path: "/welcome/sign-in",
      component: () => import("@/views/SignIn/index"),
      meta: { needToken: false, toAction: true },
    },
    {
      path: "/welcome/sign-up",
      component: () => import("@/views/SignUp/index"),
      meta: { needToken: false, toAction: true },
    },
    {
      path: "/test",
      component: () => import("@/views/Test"),
      meta: { needToken: false, toAction: false },
    },
    {
      path: "/admin-panel",
      component: () => import("@/views/AdminPanel/index"),
      meta: { needToken: true, toAction: false },
      children: [
        {
          path: "users",
          component: () => import("@/views/AdminPanel/AdminUsers"),
          meta: { needToken: true, toAction: false },
        },
        {
          path: "stats",
          component: () => import("@/views/AdminPanel/AdminStats"),
          meta: { needToken: true, toAction: false },
        },
      ],
    },
  ],
});

export default router;
