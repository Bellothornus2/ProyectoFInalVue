import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexAlcohol from '../components/IndexAlcohol.vue'
import MaintenanceItem from '../views/MaintenanceItem.vue'
import UserOrderView from '../views/UserOrderView.vue'
Vue.use(VueRouter)

const routes = [
	{
		path: '/alcohol/index',
		name: 'alcohol_index',
		component: IndexAlcohol
	},
	{
		path: '/',
		name: 'home',
		component: MaintenanceItem
	},
	{
		path: '/orders',
		name: 'orders',
		component: UserOrderView
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
