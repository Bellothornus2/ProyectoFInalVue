<template>
	<div id="mantenimientos">
		<button class="btn btn-sm btn-primary" @click="$router.push('/')">Volver al principio</button>
		<UserOrder :user_id="user_id"/>
	</div>
</template>

<script>
import UserOrder from '@/components/UserOrder.vue'
export default {
	components: { 
		UserOrder,
	},
	name:'MaintenanceItem',
	data(){
		return{
			user_id: 1
		}
	}
}
</script>