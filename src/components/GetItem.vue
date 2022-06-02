<template>
  <div id="app" class="container">
	<div class="card">
	  <div class="card-header">Listar Objetos de Ollivanders</div>
	  <div class="card-body">
		<div class="input-group input-group-sm">
		  <button class="btn btn-sm btn-primary" @click="getAllData">Coger Todos</button>
		  <input type="text" ref="get_id" class="form-control ml-2" placeholder="Id" />
		  <div class="input-group-append">
			<button class="btn btn-sm btn-primary" @click="getDataById">Coger por ID</button>
			<button class="btn btn-sm btn-warning ml-2" @click="clearGetOutput">Limpiar</button>
			<LogicItem/>
		  </div>
		  <input type="text" ref="get_title" class="form-control ml-2" placeholder="Title" style="visibility:hidden;" />
		  <div class="input-group-append">
			<button class="btn btn-sm btn-primary" @click="getDataByTitle" style="visibility:hidden;">Find By Title</button>
		  </div>
		</div>
		<div v-if="getResult" class="alert alert-secondary mt-2" role="alert"><pre>{{getResult}}</pre></div>
		
	  </div>
	</div>
  </div>
</template>
<script>
const baseURL = "http://localhost:5000/";
import LogicItem from '@/components/LogicItem.vue';
export default {
	name: "App",
	components:{
		LogicItem
	},
	data() {
		return {
			getResult: null
		}
	},
	methods: {
	fortmatResponse(res) {
		return JSON.stringify(res, null, 2);
	},
	async getAllData() {
	try {
		const res = await fetch(`${baseURL}`);
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
		this.getResult = this.fortmatResponse(result);
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
