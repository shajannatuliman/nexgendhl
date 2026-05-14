import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import UploadConsoleView from '../views/UploadConsoleView.vue'
import ViewerView from '../views/ViewerView.vue'
import SopDetailView from '../views/SopDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/upload-console',
      name: 'upload', // CHANGED from 'upload-console' to match sidebar
      component: UploadConsoleView,
      meta: { requiresAuth: true }
    },
    {
      path: '/viewer',
      name: 'viewer',
      component: ViewerView,
      meta: { requiresAuth: true }
    },
    {
      path: '/viewer/:id',
      name: 'viewer-detail',
      component: SopDetailView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (to.meta.requiresAuth && !user) {
    return next({ name: 'login' });
  }
  if (to.name === 'login' && user) {
    return next({ name: 'viewer' });
  }
  next();
});

export default router