import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TaskOverview from '@/views/TaskOverview.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/tasks',
    name: 'tasks',
    component: TaskOverview,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
