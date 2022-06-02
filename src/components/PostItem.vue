<template>
    <div class="card" id="post_form_object">
        <div class="card-header">Crear Objeto de Ollivanders</div>
        <div class="card-body">
            <div class="form-group">
                <label for="name">Nombre</label>
                <input type="text" class="form-control" name="name" id="post_name"/>
            </div>
            <div class="form-group">
                <label for="sell_in">Precio</label>
                <input type="text" class="form-control" name="sell_in" id="post_sell_in">
            </div>
            <div class="form-group">
                <label for="quality">Grado de calidad</label>
                <input type="text" class="form-control" name="quality" id="post_quality"/>
            </div>
            <button class="btn btn-sm btn-primary" @click="create_item">Crear nuevo Objeto</button>
            <button class="btn btn-sm btn-warning ml-2" @click="clear_post_output">Limpiar</button>
            <br>
            <button v-if="post_result" class="alert alert-secondary mt-2" role="alert"><pre>{{post_result}}</pre></button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostItem',
    data(){
        return{
            post_result: ''
        }
    },
    methods:{
        format_response(res){
            return JSON.stringify(res,null,2);
        },
        async create_item(){
            this.post_result = '';
            const create_item = {
                name: document.getElementById("post_name").value,
                sell_in:  document.getElementById("post_sell_in").value,
                quality:  document.getElementById("post_quality").value
            };
            if (typeof parseInt(create_item.sell_in) != 'number' || typeof parseInt(create_item.sell_in) == NaN  || create_item.sell_in == '' || typeof parseInt(create_item.quality) != 'number' || typeof parseInt(create_item.quality) == NaN || create_item.quality == ''){
                this.post_result += "los campos numéricos solo pueden ser numéricos\n";
            }
            if (create_item.name == ''){
                this.post_result += "los campos no pueden estar vacíos\n"
            }
            if (this.post_result != ''){
                return this.post_result
            }
            try{
                const res = await fetch("http://localhost:5000/item",{
                    method: "POST",
                    mode:"cors",
                    headers: {
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify(create_item)
                });
                if (!res.ok){
                    const message = `Un error ha ocurrido: ${res.status} - ${res.statusText}`;
                    throw new Error(message);
                }
                const data = await res.json();
                const result = {
                    status: res.status + "-" + res.statusText,
                    headers: {
                        "Content-Type": res.headers.get("Content-Type"),
                        "Content-Length": res.headers.get("Content-Length"),
                    },
                    data:data
                };
                this.post_result = this.format_response(result);
            } catch (err){
                this.post_result = err.message;
            }
        },
        clear_post_output(){
            this.post_result = null;
        }
    }
}
</script>