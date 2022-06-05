<template>
	<div :id="'order_lines_'+order_id" style="display:none">
		<div v-for="index in list_order_lines" :key="index.id" style="background-color:grey">
			<p v-if="index.order_id == order_id">
				<!--<span>index.id: {{ index.id }} alcohol_id: {{alcohol_id}}</span>
				<br>-->
				<span>Alcohol: {{ index.alcohol_name }}</span>
				<br>
				<span>Cantidad: {{ index.quantity }}</span>
				<br>
				<span>Precio: {{ index.price }}€</span>
				<br>
				<span>Descuento: {{ index.discount }}%</span>
				<br>
				<span>Neto: {{ index.total }}€</span>
				<br>
			</p>
		</div>
	</div>
</template>
<script>
const baseURL = "http://localhost:5000/";
export default {
	props: ['order_id'],
	data(){
		return{
			list_order_lines: []
		}
	},
	mounted(){
		this.getAllOrderLines()
	},
	methods:{
		async getAllOrderLines() {
			try {
				const res = await fetch(`${baseURL}order_line`);
				if (!res.ok) {
					const message = `An error has occured: ${res.status} - ${res.statusText}`;
					throw new Error(message);
				}
				const data = await res.json();
				const result = {
					status: res.status + "-" + res.statusText,
					mode: "cors",
					headers: {
						"Content-Type": res.headers.get("Content-Type"),
						"Content-Length": res.headers.get("Content-Length"),
					},
					length: res.headers.get("Content-Length"),
					data: data,
				};
				this.list_order_lines = result["data"]["data"]
			} catch (err) {
				this.list_order_lines = err.message;
			}
		},
	}
}
</script>