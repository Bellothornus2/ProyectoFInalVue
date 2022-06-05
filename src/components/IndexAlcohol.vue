<template>
  <div id="app" class="container">
	<div id="filter_container">
		<button class="btn btn-sm btn-success" @click="Checkout()">Finalizar compra</button>
		<button class="btn btn-sm btn-primary" @click="$router.push('/orders')">Visualizar tus compras hechas</button>
		<p>Filtrar por Ingrediente</p>
		<select name="ingredient" id="selector_ingredient" @change="filterByIngredient($event)">
			<option value=""></option>
			<option v-for="index in list_ingredient" :key="index.id" :value="index.id">
				{{index.name}}
			</option>
		</select>
		<p>Filtrar por tipo de Alcohol:</p>
		<select name="type_alcohol" id="selector_type_alcohol" @change="filterByTypeAlcohol($event)">
			<option value=""></option>
			<option v-for="index in list_type_alcohol" :key="index.id" :value="index.id">
				{{index.name}}
			</option>
		</select>
		<br>
		<p>Filtrar por subtipo de Alcohol:</p>
		<select name="subtype_alcohol" id="selector_subtype_alcohol" @change="filterBySubtypeAlcohol($event)">
			<option value=""></option>
			<option v-for="index in list_subtype_alcohol" :key="index.id" :value="index.id">
				{{index.name}}
			</option>
		</select>
	</div>
	<div id="list_alcohol">
		<div v-for="index in getResult" :key="index.id">
			<p>
				<!--<span>Id: {{ index.id }}</span>
				<br>-->
				<span>Nombre: {{ index["name"] }}</span>
				<br>
				<span>Grado de Alcohol: {{ index["alcohol_grade"] }}</span>
				<br>
				<span>Precio: {{ index["price"] }}</span>
				<br>
				<span>Marca: {{ index["brand"] }}</span>
				<br>
				<span>Tipo Alcohol: {{ index["type_alcohol_name"] }}</span>
				<br>
				<span>SubTipo: {{ index["subtype_alcohol_name"] }}</span>
				<br>
				<span>Descripcion: {{ index["description"] }}</span>
				<br>
				<button class="btn btn-sm btn-success" @click="BuyAlcohol(index.id,index.price)">Comprar</button>
				<button class="btn btn-sm btn-primary" @click="WriteReview(index.id)">Escribir una reseña</button>
				<button :id="'show_button_'+index.id" class="btn btn-sm btn-primary" @click="ShowReview(index.id)">Mostrar las reseñas</button>
				<AlcoholReview :list_alcohol_reviews="list_alcohol_reviews" :alcohol_id="index.id" />
			</p>
		</div>
	</div>
  </div>
</template>
<script>
const baseURL = "http://localhost:5000/";
import AlcoholReview from '@/components/AlcoholReview.vue';
import UserOrderView from '@/views/UserOrderView.vue'
export default {
	name: "App",
	components:{
		AlcoholReview,
		UserOrderView
	},
	data() {
		return {
			getResult: null,
			list_type_alcohol: [],
			list_subtype_alcohol: [],
			list_ingredient: [],
			list_bought_alcohol: [],
			list_alcohol_reviews: []
		}
	},
	mounted(){
		this.getAllData()
		this.getListTypeAlcohol()
		this.getListSubtypeAlcohol()
		this.getListIngredient()
		this.getAllReviews()
	},
	methods: {
		async getListTypeAlcohol(ingredient=''){
			try {
				var res = ''
				if (ingredient == ''){
					res = await fetch(`${baseURL}type_alcohol`);
				} else {
					res = await fetch(`${baseURL}type_alcohol/by/ingredient/${ingredient}`);
				}
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
			this.list_type_alcohol = result["data"]["data"]
		} catch (err) {
			this.list_type_alcohol = err.message;
		}
		},
		async getListSubtypeAlcohol(type_alcohol_id=''){
			try {
				var res = ''
				if (type_alcohol_id == ''){
					res = await fetch(`${baseURL}subtype_alcohol`);
				} else {
					res = await fetch(`${baseURL}subtype_alcohol/by/type_alcohol/${type_alcohol_id}`);
				}
				
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
				this.list_subtype_alcohol = result["data"]["data"]
			} catch (err) {
				this.list_subtype_alcohol = err.message;
			}
		},
		async getListIngredient(){
			try {
				var res = await fetch(`${baseURL}ingredient`);
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
				this.list_ingredient = result["data"]["data"]
			} catch (err) {
				this.list_ingredient = err.message;
			}
		},
		async getAllData() {
			try {
				const res = await fetch(`${baseURL}alcohol/human`);
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
				this.getResult = result["data"]["data"]
			} catch (err) {
				this.getResult = err.message;
			}
		},
		async filterByTypeAlcohol(event){
			//console.log(event.target.value, this.key);
			var type_alcohol_id = event.target.value;
			try {
				const res = await fetch(`${baseURL}alcohol/by/type_alcohol/${type_alcohol_id}/human`);
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
				//this.getResult = this.fortmatResponse(result["data"]["data"]);
				this.getResult = result["data"]["data"]
				//this.list_alcohol = this.fortmatResponse(result);
				this.getListSubtypeAlcohol(type_alcohol_id)
			} catch (err) {
				this.getResult = err.message;
			}
		},
		async filterByIngredient(event){
			//console.log(event.target.value, this.key);
			var ingredient_id = event.target.value;
			try {
				this.getListTypeAlcohol(ingredient_id)
			} catch (err) {
				this.getResult = err.message;
			}
		},
		async filterBySubtypeAlcohol(event){
			//console.log(event.target.value, this.key);
			var subtype_alcohol_id = event.target.value;
			try {
				const res = await fetch(`${baseURL}alcohol/by/subtype_alcohol/${subtype_alcohol_id}/human`);
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
				//this.getResult = this.fortmatResponse(result["data"]["data"]);
				this.getResult = result["data"]["data"]
				//this.list_alcohol = this.fortmatResponse(result);
				
			} catch (err) {
				this.getResult = err.message;
			}
		},
		async WriteReview(alcohol_id){
			const user_id = 1;
			let user_review_message = prompt("Escribe la reseña aquí!")
			let user_rating = parseFloat(prompt("Escribe del 1.0 al 5.0 tu satisfacción!"))
			let user_sentiment = prompt("Escribe 'YES' o 'NO' si vas volver a comprar o no el producto!")
			const create_review = {
				user_id: user_id,
				message: user_review_message,
				user_rating:  user_rating,
				alcohol_id:  alcohol_id,
				order_id: 1,
				user_sentiment: user_sentiment
			};
			const res = await fetch("http://localhost:5000/review",{
				method: "POST",
				mode:"cors",
				headers: {
					"Content-Type":"application/json",
					"Access-Control-Allow-Origin": "*"
				},
				body: JSON.stringify(create_review)
			});
			if (!res.ok){
				const message = `Un error ha ocurrido: ${res.status} - ${res.statusText}`;
				alert(message);
			} else {
				alert("Tu reseña se ha guardado!");
			}
		},
		async BuyAlcohol(alcohol_id,price){
			let quantity = parseInt(prompt("Escribe cuantas botellas quieres"))
			this.list_bought_alcohol.push({
				alcohol_id: alcohol_id,
				quantity: quantity,
				price: price,
				discount: 0,
				total: price*quantity,
				order_id: 1
			})
		},
		async Checkout(){
			const user_id = 1;
			var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			var dateTime = date+' '+time;

			var total_amount_order = 0;
			this.list_bought_alcohol.forEach(element => {
				total_amount_order += element.total
			});
			var create_order = {
				user_id: user_id,
				address_send:1,
				address_bill:1,
				credit_card:1,
				total_amount: total_amount_order,
				date_str: dateTime
			};
			const res_order = await fetch("http://localhost:5000/order",{
				method: "POST",
				mode:"cors",
				headers: {
					"Content-Type":"application/json",
					"Access-Control-Allow-Origin": "*"
				},
				body: JSON.stringify(create_order)
			});
			const data_order = await res_order.json();
			var order_id_created = data_order["data"]["id"]
			var res_order_line = '';
			for (var value of this.list_bought_alcohol) {
				value.order_id = order_id_created
				res_order_line = await fetch("http://localhost:5000/order_line",{
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type":"application/json",
						"Access-Control-Allow-Origin": "*"
					},
					body: JSON.stringify(value)
				});
				if (res_order_line.ok){
					alert("Se ha finalizado la compra!");
				} else {
					alert("Ocurrió un problema al finalizar la compra");
				}
			}
		},
		async getAllReviews(){
			try {
				const res = await fetch(`${baseURL}review`);
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
				this.list_alcohol_reviews = result["data"]["data"]
			} catch (err) {
				this.list_alcohol_reviews = err.message;
			}
		},
		async ShowReview(alcohol_id){
			var review_container = document.getElementById("alcohol_review_"+alcohol_id);
			var button_show_review = document.getElementById("show_button_"+alcohol_id);
			console.log(review_container.style.display);
			console.log(alcohol_id);
			if (review_container.style.display == '') {
				review_container.style.display='none';
				button_show_review.innerText = 'Mostrar las reseñas';
			} else {
				review_container.style.display=''
				button_show_review.innerText = 'Ocultar las reseñas';
			}
		}
	}
}
</script>
