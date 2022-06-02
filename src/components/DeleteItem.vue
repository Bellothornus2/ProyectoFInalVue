<template>
    <div id="app" class="container">
        <div class="card">
            <div class="card-header">Eliminar Objetos de Ollivanders</div>
            <div class="card-body">
                <div class="input-group input-group-sm">
                    <button class="btn btn-sm btn-danger" style="visibility:hidden">Delete All</button>
                    <input type="text" ref="delete_id" class="form-control ml-2" placeholder="Id" />
                    <div class="input-group-append">
                        <button class="btn btn-sm btn-danger" @click="deleteDataById">Delete by Id</button>
                    </div>
                    <button class="btn btn-sm btn-warning ml-2" @click="clearDeleteOutput">Limpiar</button>
                </div>
                <div v-if="deleteResult" class="alert alert-secondary mt-2" role="alert"><pre>{{deleteResult}}</pre></div>      
            </div>
        </div>
    </div>
</template>
<script>
const baseURL = "http://localhost:5000/";
export default {
    name: "App",
    data() {
        return {
        deleteResult: null
        }
    },
    methods: {
        fortmatResponse(res) {
        return JSON.stringify(res, null, 2);
        },
        async deleteAllData() {
        try {
            const res = await fetch(`${baseURL}/tutorials`, { method: "delete" });
            const data = await res.json();
            const result = {
            status: res.status + "-" + res.statusText,
            headers: { "Content-Type": res.headers.get("Content-Type") },
            data: data,
            };
            this.deleteResult = this.fortmatResponse(result);
        } catch (err) {
            this.deleteResult = err.message;
        }
        },
        async deleteDataById() {
        const id = this.$refs.delete_id.value;
        if (id){
            try {
            const res = await fetch(`${baseURL}item/${id}`, { method: "delete" });
            const data = await res.json();
            const result = {
                status: res.status + "-" + res.statusText,
                mode:'cors',
                headers: { "Content-Type": res.headers.get("Content-Type") },
                data: data,
            };
            this.deleteResult = this.fortmatResponse(result);
            } catch (err) {
            this.deleteResult = err.message;
            }
        }
        },
        clearDeleteOutput() {
        this.deleteResult = null;
        }
    }
}
</script>
