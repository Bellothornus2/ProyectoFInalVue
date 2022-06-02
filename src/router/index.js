import Vue from 'vue'
import VueRouter from 'vue-router'
import GetItem from '../components/GetItem.vue'
import PostItem from '../components/PostItem.vue'
import PutItem from '../components/PutItem.vue'
import DeleteItem from '../components/DeleteItem.vue'
import MaintenanceItem from '../views/MaintenanceItem.vue'
import IndexAlcohol from '../components/IndexAlcohol.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/alcohol/human',
		name: 'alcohol_human',
		component: IndexAlcohol
	},
	{
		path: '/',
		name: 'home',
		component: MaintenanceItem
	},
	{
		path: '/getItem',
		name: 'get_item',
		component: GetItem
	},
	{
		path: '/postItem',
		name: 'post_item',
		component: PostItem
	},
	{
		path: '/putItem/:id',
		name: 'put_item',
		component: PutItem
	},
	{
		path: '/deleteItem',
		name: 'delete_item',
		component: DeleteItem
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
