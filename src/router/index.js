import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '内容管理', icon: 'product'},
    children: [
      {
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/pms/productCate/index'),
        meta: {title: '商品分类', icon: 'product-cate'}
      },
      {
        path: 'addProductCate',
        name: 'addProductCate',
        component: () => import('@/views/pms/productCate/add'),
        meta: {title: '添加商品分类'},
        hidden: true
      },
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        component: () => import('@/views/pms/productCate/update'),
        meta: {title: '修改商品分类'},
        hidden: true
      },
      
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/pms/brand/index'),
        meta: {title: '品牌管理', icon: 'product-brand'}
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: {title: '添加品牌'},
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: {title: '编辑品牌'},
        hidden: true
      },
      {
        path: 'topic',
        name: 'topic',
        component: () => import('@/views/pms/topic/index'),
        meta: {title: '专题管理', icon: 'product-brand'}
      },
      {
        path: 'addTopic',
        name: 'addTopic',
        component: () => import('@/views/pms/topic/add'),
        meta: {title: '添加专题'},
        hidden: true
      },
      {
        path: 'updateTopic',
        name: 'updateTOpic',
        component: () => import('@/views/pms/topic/update'),
        meta: {title: '编辑专题'},
        hidden: true
      },
      {
        path: 'label',
        name: 'label',
        component: () => import('@/views/pms/label/index'),
        meta: {title: '标签管理', icon: 'product-brand'}
      },
      {
        path: 'addLabel',
        name: 'addLabel',
        component: () => import('@/views/pms/label/add'),
        meta: {title: '添加标签'},
        hidden: true
      },
      {
        path: 'updateLabel',
        name: 'updateLabel',
        component: () => import('@/views/pms/label/update'),
        meta: {title: '编辑标签'},
        hidden: true
      },
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/pms/article/index'),
        meta: {title: '文章管理', icon: 'product-brand'}
      },
      {
        path: 'addArticle',
        name: 'addArticle',
        component: () => import('@/views/pms/article/add'),
        meta: {title: '添加文章'},
        hidden: true
      },
      {
        path: 'updateArticle',
        name: 'updateArticle',
        component: () => import('@/views/pms/article/update'),
        meta: {title: '编辑文章'},
        hidden: true
      },
      {
        path: 'icon',
        name: 'icon',
        component: () => import('@/views/pms/icon/index'),
        meta: {title: '图标管理', icon: 'product-brand'}
      },
      {
        path: 'addIcon',
        name: 'addIcon',
        component: () => import('@/views/pms/icon/add'),
        meta: {title: '添加图标'},
        hidden: true
      },
      {
        path: 'updateIcon',
        name: 'updateIcon',
        component: () => import('@/views/pms/icon/update'),
        meta: {title: '编辑图标'},
        hidden: true
      },
    ]
  },

  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

