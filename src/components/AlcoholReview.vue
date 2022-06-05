<template>
	<div :id="'alcohol_review_'+alcohol_id" style="display:none">
		<div v-for="index in list_alcohol_reviews" :key="index.id" style="background-color:grey">
			<p v-if="index.alcohol_id == alcohol_id">
				<!--<span>index.id: {{ index.id }} alcohol_id: {{alcohol_id}}</span>
				<br>-->
				<span>Usuario: {{ index.user_name }}</span>
				<br>
				<span>Reseña: {{ index.message }}</span>
				<br>
				<span>Grado de satisfacción: {{ index.user_rating }}</span>
				<br>
				<span>Alcohol: {{ index.alcohol_name }}</span>
				<br>
				<span>¿Lo volverías a comprar?: {{ index.user_sentiment }}</span>
				<br>
			</p>
		</div>
	</div>
</template>
<script>
export default {
	props: ['list_alcohol_reviews',"alcohol_id"]
}
</script>