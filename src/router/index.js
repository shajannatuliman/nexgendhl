import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DraftBuilderView from '../views/DraftBuilderView.vue'
import UploadConsoleView from '../views/UploadConsoleView.vue'
import ViewerView from '../views/ViewerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/draft-builder',
      name: 'draft', // CHANGED from 'draft-builder' to match sidebar
      component: DraftBuilderView
    },
    {
      path: '/upload-console',
      name: 'upload', // CHANGED from 'upload-console' to match sidebar
      component: UploadConsoleView
    },
    {
      path: '/viewer',
      name: 'viewer',
      component: ViewerView
    }
  ]
})

export default router