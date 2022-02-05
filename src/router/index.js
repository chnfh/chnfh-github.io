import { createRouter, createWebHistory } from 'vue-router'
const Home = ()=> import('../views/Home.vue')
const About = ()=> import('../views/About.vue')
const addWords = ()=> import('../views/addWords.vue')
const daily = ()=> import('../views/daily.vue')
const test = ()=> import('../views/test.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/addWords',
    name: 'addWords',
    component: addWords
  },
  {
    path: '/daily',
    name: 'daily',
    component: daily
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
