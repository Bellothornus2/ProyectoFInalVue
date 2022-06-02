<template>
  <div id="app" class="container">
	<div id="list_alcohol">
		<div v-for="index in getResult" :key="index.id">
			<p>
				<span>Id: {{ index.id }}</span>
				<br>
				<span>Nombre: {{ index["name"] }}</span>
				<br>
				<span>Calidad: {{ index["alcohol_grade"] }}</span>
				<br>
				<span>Precio: {{ index["price"] }}</span>
				<br>
				<span>Marca: {{ index["brand"] }}</span>
				<br>
				<span>Tipo Alcohol: {{ index["type_alcohol_name"] }}</span>
				<br>
				<span>SubTipo: {{ index["sub_type_alcohol_name"] }}</span>
				<br>
				<span>Descripcion: {{ index["description"] }}</span>
				<br>
				<button class="btn btn-sm btn-success" @click="BuyAlcohol(index.id)">Buy</button>
			</p>
		</div>
	  </div>
  </div>
</template>
<script>
const baseURL = "http://localhost:5000/";
//import LogicItem from '@/components/LogicItem.vue';
export default {
	name: "App",
	components:{
	},
	data() {
		return {
			getResult: null
		}
	},
	mounted(){
		this.getAllData()
	},
	methods: {
	fortmatResponse(res) {
		return JSON.stringify(res, null, 2);
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
		//this.getResult = this.fortmatResponse(result["data"]["data"]);
		this.getResult = result["data"]["data"]
		//this.list_alcohol = this.fortmatResponse(result);
		console.log(this.getResult)
	} catch (err) {
		this.getResult = err.message;
	}
	},
	async getDataById() {
		const id = this.$refs.get_id.value;
		if (id) {
			try {
				const res = await fetch(`${baseURL}item/${id}`);
				if (!res.ok) {
					const message = `An error has occured: ${res.status} - ${res.statusText}`;
					throw new Error(message);
				}
				const data = await res.json();
				const result = {
					status: res.status,
					statusText: res.statusText,
					headers: {
					"Content-Type": res.headers.get("Content-Type"),
					"Content-Length": res.headers.get("Content-Length"),
					},
					data: data
				};
				this.getResult = this.fortmatResponse(result);
			} catch (err) {
			this.getResult = err.message;
			}
		}
	},
	async getDataByTitle() {
		const title = this.$refs.get_title.value;
		if (title) {
			try {
				// const res = await fetch(`${baseURL}/tutorials?title=${title}`);
				let url = new URL(`${baseURL}/tutorials`);
				const params = { title: title };
				url.search = new URLSearchParams(params);
				const res = await fetch(url);
				if (!res.ok) {
					const message = `An error has occured: ${res.status} - ${res.statusText}`;
					throw new Error(message);
				}
				const data = await res.json();
				const result = {
					status: res.status + "-" + res.statusText,
					headers: {
					"Content-Type": res.headers.get("Content-Type"),
					"Content-Length": res.headers.get("Content-Length"),
					},
					data: data,
				};
				this.getResult = this.fortmatResponse(result);
			} catch (err) {
				this.getResult = err.message;
			}
		}
	},
	clearGetOutput() {
		this.getResult = null;
	},
	}
}
</script>
