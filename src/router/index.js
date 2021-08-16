import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Query from '../views/Query.vue'
import CarNormal from '../views/CarNormal.vue'
import CarSpecial from '../views/CarSpecial.vue'
import Chu from '../views/Chu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/query',
    name: 'query',
    component:Query
  },
  {
    path: '/normal_list',
    name: 'normal_list',
    component: CarNormal
  },
  {
    path: '/special_list',
    name: 'special_list',
    component: CarSpecial
  },
  {
    path: '/chu',
    name: 'chu',
    component: Chu
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
