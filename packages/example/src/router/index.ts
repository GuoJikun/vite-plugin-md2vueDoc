import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/index.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "index",
      path: "/",
      component: Home,
    },
    {
      name: "test",
      path: "/test",
      component: () => import("@/views/test.md"),
    },
    {
      name: "test1",
      path: "/test1",
      component: () => import("../../../../README.md"),
    },
  ],
});
