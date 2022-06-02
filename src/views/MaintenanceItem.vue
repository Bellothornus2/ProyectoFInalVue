<template>
	<div id="mantenimientos">
		<IndexAlcohol/>
		<GetItem/>
		<PostItem/>
		<PutItem/>
		<DeleteItem/>
		<FavoriteItem/>
	</div>
</template>

<script>
import IndexAlcohol from '@/components/IndexAlcohol.vue'
import GetItem from '@/components/GetItem.vue'
import PostItem from '@/components/PostItem.vue'
import PutItem from '@/components/PutItem.vue'
import DeleteItem from '@/components/DeleteItem.vue'
import FavoriteItem from '@/components/FavoriteItem.vue'
export default {
	components: { 
		IndexAlcohol,
		GetItem,
		PostItem,
		PutItem,
		DeleteItem,
		FavoriteItem,
	},
	name:'MaintenanceItem',
}
</script>