import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Category from '@/pages/Category'
import Article from '@/pages/Article'
import User from '@/pages/User'
import Main from '@/pages/Main'
import Setting from '@/pages/setting'
import SettingInfo from '@/pages/setting/Info'
import SettingAuth from '@/pages/setting/Auth'
import SettingAdv from '@/pages/setting/Adv'
Vue.use(Router)

export default new Router({
  routes: [
    /*{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },*/
    {
      path:'/Main',
      component:Main
    },
    {
      path: '/Category',
      component: Category
    },{
      path: '/Article',
      component: Article
    },{
      path: '/User',
      component: User
    },{
      path: '/Setting',
      component: Setting
    },{
      path: '/Setting',
      component: Setting,
      children:[{
      path:'info',
      component: SettingInfo
      },{
      path:'auth',
      component: SettingAuth
      },{
      path:'adv',
      component: SettingAdv
      }]
    },

  ]
})
