document.addEventListener('DOMContentLoaded',() =>{
    get_Contactos()
})

function RenderTable(Contacto){
    let tabHeader = `
    <a href="/api/v1/contactos"><button class="btn btn-outline-secondary mt-4 mx-4">See JSON</button></a>
    <h1 class="text-center">Contacto List</h1>
    <table class="table table-striped table-dark  table-bordered p-2 mt-5">
        <thead>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th><button onclick="createLayoutContacto()" class="btn btn-success">Add Contacto</button></th>
            </tr>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tel</th>
                <th>Num_libros</th>
                <th>Fecha_nacimiento</th>
                <th>Show</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        <tbody>`


            Contacto.forEach(e => {
                    tabHeader +=
                    `
            <tr>
                <th>${e.id}</th>
                <th>${e.nombre}</th>
                <th>${e.tel}</th>
                <th>${e.num_libros}</th>

                <th>${e.fecha_nacimiento}</th>
                <th><button class="btn btn-primary" onclick="showContacto(${e.id})">Show</buttons> </th>
                <th><button class="btn btn-warning" onclick="editContacto(${e.id})">Edit</buttons> </th>
                <th><button class="btn btn-danger" onclick="deleteContacto(${e.id})">Delete</buttons> </th>
            </tr>`
            
    })
    return tabHeader + '</tbody></table>'
    
}

function get_Contactos(){
    fetch('http://127.0.0.1:8000/api/v1/contactos')
    .then(res => res.json())
    .then(data => {
        document.getElementById('parent').innerHTML = RenderTable(data)
    })
}


function createLayoutContacto() {
    // alert("layout create")
    let layoutCreate = `
    <div>
        <button onclick="returnBack()"  class="float-end btn btn-danger">Back</button>
    </div>
    <h2 class="text-center ">Add new Contacto</h2>

    <form  class="d-flex justify-content-around align-items-center mt-5 flex-column h-100" >
        <label  for="nombre">Nombre:</label>
        <input   type="text" nombre="nombre" id="create_nombre" placeholder="Nombre">

        <label for="tel">Tel:</label>
        <input  type="text" nombre="tel" id="create_tel" placeholder="Tel">

        <label for="tel">Num_libros:</label>
        <input  type="text" nombre="num_libros" id="create_num_libros" placeholder="Num_libros">

        <label for="fecha_nacimiento">Fecha_nacimiento:</label>
        <input  type="text" nombre="fecha_nacimiento" id="create_fecha_nacimiento" placeholder="Fecha_nacimiento">

        <input  type="submit" onclick="addContacto()" class="btn btn-success" value="Add Contacto">
    </form>
    `
    document.getElementById('parent').innerHTML = layoutCreate
}

function returnBack () {
    return window.location.href =  window.location.href.split("?")[0]
}

function addContacto(){
    let nameValue = document.getElementById('create_nombre').value
    let surnameValue = document.getElementById('create_tel').value
    let phoneValue = document.getElementById('create_num_libros').value
    let ageValue = document.getElementById('create_fecha_nacimiento').value

        fetch('api/v1/contactos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre:nameValue,
                tel: surnameValue,
                num_libros: phoneValue,
                fecha_nacimiento: ageValue
                //nombre: document.getElementById('create_nombre').value,
                //tel: document.getElementById('create_tel').value,
                //num_libros: document.getElementById('create_num_libros').value,
                //fecha_nacimiento: document.getElementById('create_fecha_nacimiento').value
                }),
            })
        returnBack()
}


function showContacto() {
    // document.getElementById('parent').innerHTML = "work fine"
}


function editContacto(idd) {
    fetch(`http://127.0.0.1:8000/api/v1/contactos/${idd}`,{
        method: 'GET'
    })
    .then(res => res.json())
    .then(Contacto => {
        layoutEdit = `
        <div>
            <button onclick="returnBack()" class="float-end btn btn-danger">Back</button>
        </div>
        <h1 class="text-center">Edit Contant</h1>
        <form class=" d-flex  justify-content-around h-100 align-items-center flex-column mt-5" >
            <label for="nombre">New Nombre:</label>
            <input  type="text" nombre="nombre" id="edit_name" placeholder="New Nombre" value="${Contacto.nombre}">
    
            <label for="tel">New Tel:</label>
            <input  type="text" nombre="tel" id="edit_surname" placeholder="New Tel" value="${Contacto.tel}">
    
            <label for="tel">New Num_libros:</label>
            <input  type="text" nombre="tel" id="edit_phone" placeholder="New Tel" value="${Contacto.num_libros}">

            <label for="fecha_nacimiento">New Fecha_nacimiento:</label>
            <input  type="text" nombre="fecha_nacimiento" id="edit_age" placeholder="New Fecha_nacimiento" value="${Contacto.fecha_nacimiento}">
            <input type="submit" class="btn btn-success" onclick="update_Contacto(${idd})" value="Update Contacto">
        </form>
        `
        document.getElementById('parent').innerHTML = layoutEdit

    })
}

function update_Contacto(id){
    let nameValue = document.getElementById('edit_name').value
    let surnameValue = document.getElementById('edit_surname').value
    let phoneValue = document.getElementById('edit_phone').value
    let ageValue = document.getElementById('edit_age').value

    fetch(`api/v1/contactos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nameValue,
            tel: surnameValue,
            num_libros: phoneValue,
            fecha_nacimiento: ageValue
        }),
        })
    returnBack()
}

function deleteContacto(id) {
    fetch(`api/v1/contactos/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: null,
    })
    returnBack()
}
