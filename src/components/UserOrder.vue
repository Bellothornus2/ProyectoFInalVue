<template>
	<div :id="'user_order'+user_id">
		<div v-for="index in list_user_orders" :key="index.id" >
			<p v-if="index.user_id == user_id">
				<!--<span>index.id: {{ index.id }} user_id: {{user_id}}</span>
				<br>-->
				<span>Usuario: {{ index.user_name }}</span>
				<br>
				<span>Direccion de Entrega: {{ index.address_bill_name }}</span>
				<br>
				<span>Direccion de Facturación: {{ index.address_send_name }}</span>
				<br>
				<span>Total: {{ index.total_amount }}</span>
				<br>
				<span>Fecha de Albarán: {{ index.date_str }}</span>
				<br>
				<button :id="'show_button_'+index.id" class="btn btn-sm btn-primary" @click="ShowOrderLine(index.id)">Mostrar las líneas de Albarán</button>
				<UserOrderLine :order_id="index.id" />
			</p>
		</div>
	</div>
</template>
<script>
const baseURL = "http://localhost:5000/";
import UserOrderLine from '@/components/UserOrderLine.vue'
export default {
	components: {
		UserOrderLine
	},
	props: ['user_id'],
	data() {
		return {
			list_user_orders: []
		}
	},
	mounted(){
		this.getAllUserOrders()
	},
	methods:{
		async getAllUserOrders() {
			try {
				const res = await fetch(`${baseURL}order`);
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
				this.list_user_orders = result["data"]["data"]
			} catch (err) {
				this.list_user_orders = err.message;
			}
		},
		async ShowOrderLine(order_id){
				var review_container = document.getElementById("order_lines_"+order_id);
				var button_show_review = document.getElementById("show_button_"+order_id);
				if (review_container.style.display == '') {
					review_container.style.display='none';
					button_show_review.innerText = 'Mostrar las líneas de Albarán';
				} else {
					review_container.style.display=''
					button_show_review.innerText = 'Ocultar las líneas de albarán';
				}
			}
	}
}
</script>