import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login'
import Login2 from '@/page/login2'
import Index from '@/page/index'
import Message from '@/page/message'
import BigData from '@/page/bigData'
import PublishNew from '@/page/publishNew'
import PublishDetails from '@/page/publishDetails'
import ShenpiList from '@/page/shenpiList'
import ShenpiRecords from '@/page/shenpiRecords'
import Peixun from '@/page/peixun'
import Yunying from '@/page/yunying'
import Zhaosheng from '@/page/zhaosheng'
import Shouzhi from '@/page/shouzhi'
import Clgk from '@/page/clgk'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      meta:{
        tabbar: false,
      },
      component: Login
    },
    {
      path: '/login2',
      name: 'login2',
      meta:{
        tabbar: false,
      },
      component: Login2
    },
    {
      path: '/index',
      name: 'index',
      meta:{
        tabbar: true,
      },
      component: Index
    },
    {
      path: '/message',
      name: 'message',
      meta:{
        tabbar: true,
      },
      component: Message
    },{
      path: '/publishNew',
      name: 'publishNew',
      meta:{
        tabbar: true,
      },
      component: PublishNew
    },{
      path: '/publishDetails',
      name: 'publishDetails',
      meta:{
        tabbar: true,
      },
      component: PublishDetails
    }
    ,{
      path: '/shenpiList',
      name: 'shenpiList',
      meta:{
        tabbar: true,
      },
      component: ShenpiList
    }
    ,{
      path: '/shenpiRecords',
      name: 'shenpiRecords',
      meta:{
        tabbar: true,
      },
      component: ShenpiRecords
    }
    ,{
      path: '/bigData',
      name: 'bigData',
      meta:{
        tabbar: true,
      },
      component: BigData
    }
    ,{
      path: '/peixun',
      name: 'peixun',
      meta:{
        tabbar: true,
      },
      component: Peixun
    }
    ,{
      path: '/yunying',
      name: 'yunying',
      meta:{
        tabbar: true,
      },
      component: Yunying
    }
    ,{
      path: '/zhaosheng',
      name: 'zhaosheng',
      meta:{
        tabbar: true,
      },
      component: Zhaosheng
    }
    ,{
      path: '/shouzhi',
      name: 'shouzhi',
      meta:{
        tabbar: true,
      },
      component: Shouzhi
    },
    {
    	path: '/clgk/:id',
    	name: 'clgk',
    	component: Clgk,
    	props: true
    }
  ]
})
