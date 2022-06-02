<template>
	<div>
		<button class="btn btn-sm btn-danger ml-2" @click="applyItemLogic">Pasar Día</button>
	</div>
</template>
<script>
const baseURL = "http://localhost:5000/";
export default {
	name: "App",
	data(){
		return null
	},
	methods:{
		async applyItemLogic(){
			let decision = confirm("¿Estás seguro de actualizar los objetos de la tienda? ¡Esta accion es irreversible!")
			if (decision){
				try {
					const res = await fetch(`${baseURL}update_daily`,{
						method: "PUT",
						mode:"cors",
						headers: {
							"Content-Type":"application/json",
							"Access-Control-Allow-Origin": "*"
                    	}
					});
					if (!res.ok) {
						const message = `Un error ha ocurrido: ${res.status} - ${res.statusText}`;
						alert(message);
					} else {
						alert("Los objetos de la tienda han sido actualizadas!");
					}
					
				} catch (err) {
				this.getResult = err.message;
				}
			}
		} 
	}

}
</script>