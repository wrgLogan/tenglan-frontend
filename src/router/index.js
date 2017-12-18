import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/indexPage/index'
import project from '@/page/projectPage/index'
import projectInfo from '@/page/projectInfoPage/index'
import login from '@/page/loginPage/index'
import files from '@/page/filesPage/index'
import upload from '@/page/uploadPage/index'
import userCenter from '@/page/userCenterPage/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: index
    },
    {
      path: '/project/',
      name: '项目列表',
      component: project
    },
    {
      path: '/projectInfo/:projectObjectId',
      name: '项目详情',
      component: projectInfo
    },
    {
      path: '/login',
      name: '登录',
      component: login
    },
    {
      path: '/files',
      name: '资料下载',
      component: files
    },
    {
      path: '/upload/:projectObjectId',
      name: '资料上传',
      component: upload
    },
    {
      path: '/usercenter',
      name: '个人中心',
      component: userCenter
    }
  ]
})
