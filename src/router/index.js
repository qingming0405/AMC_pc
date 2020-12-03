import { createRouter, createWebHistory } from 'vue-router'
import Index from 'pages/Index'
import Login from 'pages/Login'

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/index',
    redirect: '/index/user'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    meta: {
      title: '主页'
    },
    children: [
      {
        path: 'project',
        component: () => import('views/center/project/Project')
      },
      {
        path: 'user',
        component: () => import('views/center/user/User')
      },
      {
        path: 'official',
        component: () => import('views/center/official/Official')
      },
      {
        path: 'rights',
        component: () => import('views/center/rights/Rights')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
