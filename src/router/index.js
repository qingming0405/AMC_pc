import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from 'pages/Index'
import Login from 'pages/Login'
import Test from 'pages/Test'

// 1.通过Vue.use(插件)，安装插件
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/index',
    redirect: '/index/project'
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
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

//2.创建Router对象
const router = new VueRouter({
  routes,
  //路由模式：默认是hash模式
  mode: 'hash',
  //修改选中的标签的类名(默认为router-link-active)
  linkActiveClass: 'active',
})

// // 前置钩子(hook)-全局导航守卫
// router.beforeEach((to,from,next) => {
//   // 从from跳转到to
//   //实现组件跳转时改变浏览器标题
//   // document.title = to.meta.title;
//   document.title = to.matched[0].meta.title
//   // console.log(to)
//   //必须调用next方法
//   next() 
// })

// // 后置钩子(hook)
// router.afterEach((to, from) => {
//   // console.log('---')
// })

//3.导出
export default router
