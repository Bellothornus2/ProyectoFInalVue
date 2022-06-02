<template>
  <div id="app" class="container">
	<div class="card">
	  <div class="card-header">Listar Objetos Favoritos de Ollivanders</div>
	  <div class="card-body">
		<div class="input-group input-group-sm">
		  <input type="text" ref="get_id_favorite" class="form-control ml-2" placeholder="Id" />
		  <div class="input-group-append">
			<button class="btn btn-sm btn-primary" @click="addFavoriteById">Añadir a Favoritos</button>
		  </div>
		  <div class="input-group-append">
			<button class="btn btn-sm btn-primary" @click="showFavorites">Mostrar/Ocultar</button>
		  </div>
		</div>
		<div v-if="getResult" class="alert alert-secondary mt-2" role="alert"><pre>{{getResult}}</pre></div>
	  </div>
	  <div id="contenido_favoritos">
		<div v-for="(index,n) in favorites" :key="index.id">
			<p>
				<span>Id: {{ index["id"] }}</span>
				<br>
				<span>Nombre: {{ index["name"] }}</span>
				<br>
				<span>Calidad: {{ index["quality"] }}</span>
				<br>
				<span>Precio: {{ index["sell_in"] }}</span>
				<br>
				<button class="btn btn-sm btn-danger" @click="deleteFavorite(n)">Eliminar</button>
			</p>
		</div>
	  </div>
	</div>
	<div id="anchor"></div>
  </div>
</template>
<script>
const baseURL = "http://localhost:5000/";
export default {
	name: "App",
	data() {
		return {
			getResult: null,
			favorites: [],
		}
	},
	mounted() {
		console.log(localStorage.getItem('favorites'));
		if (localStorage.getItem('favorites')) {
			try {
				this.favorites = JSON.parse(localStorage.getItem('favorites'));
				this.favorites = this.favorites.filter(element => {
					return element !== null;
				});
			} catch(e) {
				localStorage.removeItem('favorites');
			}
		}
	},
	methods: {
	fortmatResponse(res) {
		return JSON.stringify(res, null, 2);
	},
	async showFavorites(){
		let contenidos = document.getElementById("contenido_favoritos")
		if (contenidos.style.display != "none"){
			contenidos.style.display = "none";
		} else {
			contenidos.style.display = "";
			document.querySelector('#anchor').scrollIntoView();
		}
	},
	async addFavoriteById(){
		const id = this.$refs.get_id_favorite.value;
		if (id){
			try{
				const res = await fetch(`${baseURL}item/${id}`);
				if(!res.ok){
					const message = `An error has occured: ${res.status} - ${res.statusText}`;
					throw new Error(message);
				}
				const data = await res.json();
				console.log(data["data"])
				if (data["data"]!=undefined){
					this.favorites.push(data["data"]);
					this.saveFavorite();
				} else {
					alert(`Ha ocurrido un error al añadir favoritos el:${id}`)
				}
			} catch (error){
				alert(`Ha ocurrido un error: ${error}` )
			}
		}
	},
	async deleteFavorite(favorite){
		this.favorites.splice(favorite, 1);
      	this.saveFavorite();
	},
	async saveFavorite(){
		const parsed = JSON.stringify(this.favorites);
		localStorage.setItem('favorites',parsed );
	},
	}
}
</script>
