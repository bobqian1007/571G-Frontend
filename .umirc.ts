import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", redirect: '/campaigns'},
    { path: "/campaigns", component: "campaign", name:"campaigns" },
    { path: "/requests/:address", component: "request", name: "requests" },
    //{ path: "/requests", component: "request", name: "requests" },
  ],
  plugins: ['@umijs/plugins/dist/antd','@umijs/plugins/dist/dva','@umijs/plugins/dist/model'],
  npmClient: 'npm',
  antd: {},
  dva: {},
  model: {},
});
