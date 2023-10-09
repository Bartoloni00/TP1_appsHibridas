import { createPage } from './../utils/utils.js'

const secciones = [
    {'value':'pinturas'   ,'name': 'Pinturas'},
    {'value':'esculturas' ,'name':'Esculturas'},
    {'value':'artedigital','name':'Arte Digital'},
    {'value':'fotografias','name':'Fotografías'},
    {'value':'artesanias' ,'name':'Artesanías'}
]
export class ArtViews {
    static async home () {
        return await createPage({title: 'Home de la pagina'})
    }

    static async listAll({ arts }) {
        let html = `
        <form class="border p-4 mb-3" action="/arts" method="get">
            <div class="row mb-3">
                <div class="col-md-4">
                    <label for="section" class="form-label">Sección</label>
                    <select class="form-control d-block" id="section" name="section">
                        <option value="">Todas las secciones</option>
                        <option value="pinturas">Pinturas</option>
                        <option value="esculturas">Esculturas</option>
                        <option value="artedigital">Arte Digital</option>
                        <option value="fotografias">Fotografía</option>
                        <option value="artesanias">Artesanías</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="min" class="form-label">Precio Mínimo</label>
                    <input type="number" class="form-control" id="min" name="min" min="0">
                </div>
                <div class="col-md-4">
                    <label for="max" class="form-label">Precio Máximo</label>
                    <input type="number" class="form-control" id="max" name="max" min="0">
                </div>
            </div>
            <button class="btn btn-primary d-block mx-auto mb-3" type="submit">Filtrar</button>
        </form>`

        html += `<section class="row">`
    
        arts.forEach(art => {
            html += `
            <div class="col-4">
                <div class="card" style="width: 18rem;">
                    <img src="${art.img}" class="card-img-top" alt="${art.name}">
                    <div class="card-body">
                        <h2 class="card-title">${art.name}</h2>
                        <ul>
                            <li><span><b>${art.section}</b></span></li>
                            <li><span><b>Precio</b>: $ ${art.price}</span></li>
                        </ul>
                        <a href="/arts/${art._id}" class="btn btn-primary">Ver detalles</a>
                    </div>
                </div>
            </div>`
        });
    
        html += `</section>`
    
        return await createPage({ title: 'Obras de arte', content: html })
    }
    
    // href="/arts/delete/${art._id}"
    static async getByID({ art }) {
        let html = `
        <nav class="nav nav-pills flex-column flex-sm-row mb-3">
            <a class="flex-sm-fill text-sm-center nav-link active" aria-current="page" href="/arts/update/${art._id}">Editar</a>
            <a class="flex-sm-fill text-sm-center nav-link" aria-current="page" href="/arts/delete/${art._id}">Eliminar</a>
        </nav>
        <section class="row">
            <div class="col-md-6">
                <img src="${art.img}" class="img-fluid" alt="${art.name}">
            </div>
            <div class="col-md-6">
                <h2>${art.name}</h2>
                `
                if (art.owner != undefined && art.owner.username) {
                    html += `<a href="/users/${art.owner._id}"><b>Propietario</b>: ${art.owner.username}</a>`
                }
            html += `
                <p>${art.description}</p>
                <span><b>Precio</b>: $ ${art.price}</span>
                <a href="${art.link}" class="btn btn-primary">link hacia la obra</a>
            </div>
        </section>`
    
        return await createPage({ title: `Detalles de la obra: ${art.name}`, content: html })
    }    

    static async create({ users }) {
        let html = `
            <form action="/arts/create" method="post">
                <div class="mb-3 row">
                    <label for="name" class="col-sm-2 col-form-label">Nombre</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="name" name="name" required>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="description" class="col-sm-2 col-form-label">Descripción</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" id="description" name="description" rows="3" required></textarea>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="link" class="col-sm-2 col-form-label">Enlace</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="link" name="link">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="img" class="col-sm-2 col-form-label">URL de la Imagen</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="img" name="img">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="section" class="col-sm-2 col-form-label">Sección</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="section" name="section" required>
                            <option value="">Seleccionar la seccion a la que pertenece</option>
                            <option value="pinturas">Pinturas</option>
                            <option value="esculturas">Esculturas</option>
                            <option value="artedigital">Arte Digital</option>
                            <option value="fotografias">Fotografía</option>
                            <option value="artesanias">Artesanías</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="price" class="col-sm-2 col-form-label">Precio</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" id="price" name="price" required>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="owner" class="col-sm-2 col-form-label">Propietario</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="owner" name="owner" required>
                            <option value="">Seleccionar propietario</option>`;
                            users.forEach(user => {
                                html += `<option value="${user._id}">${user.username}</option>`;
                            });
                            html += `
                        </select>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-10 offset-sm-2">
                        <button type="submit" class="btn btn-primary">Enviar</button>
                    </div>
                </div>
            </form>
        </div>`;
    
        return await createPage({ title: 'Crear obra de arte', content: html });
    }
    
    static async delete({art}) {
        let html =`<section class="row">
        <div class="col-md-6">
            <img src="${art.img}" class="img-fluid" alt="${art.name}">
        </div>
        <div class="col-md-6">
            <h2>${art.name}</h2>
            `
            if (art.owner != undefined && art.owner.username) {
                html += `<a href="/users/${art.owner._id}"><b>Propietario</b>: ${art.owner.username}</a>`
            }
        html += `
            <p>${art.description}</p>
            <span><b>Precio</b>: $ ${art.price}</span>
            <a href="${art.link}" class="btn btn-primary">link hacia la obra</a>
        </div>
    </section>`
    html += `
    <form  action="/arts/delete/${art._id}" method="post">
        <button type="submit" class="btn btn-danger">Eliminar</button>
    </form>
    `

    return await createPage({ title: `¿Estas seguro que deseas eliminar la obra: ${art.name}?`, content: html })
    }

    static async update({datos, users}){
        let html = `
        <form action="/arts/update/${datos._id}" method="post">
            <div class="mb-3 row">
                <label for="name" class="col-sm-2 col-form-label">Nombre</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" name="name" value="${datos.name}" required>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="description" class="col-sm-2 col-form-label">Descripción</label>
                <div class="col-sm-10">
                    <textarea class="form-control" id="description" name="description" rows="3" required>${datos.description}</textarea>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="link" class="col-sm-2 col-form-label">Enlace</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="link" name="link" value="${datos.link}">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="img" class="col-sm-2 col-form-label">URL de la Imagen</label>
            <img src="${datos.img}" class="img-fluid" alt="${datos.name}">

                <div class="col-sm-10">
                    <input type="text" class="form-control" id="img" name="img">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="section" class="col-sm-2 col-form-label">Sección</label>
                <div class="col-sm-10">
                    <select class="form-control" id="section" name="section" required>
                        <option value="">Seleccionar la seccion a la que pertenece</option>`
            secciones.forEach(section => {
                if (datos.section == section.value) {
                    html += `<option value="${section.value}" selected>${section.name}</option>`
                } else {
                    html += `<option value="${section.value}">${section.name}</option>`
                }
            })            
                        
            html += `</select>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="price" class="col-sm-2 col-form-label">Precio</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="price" name="price" value="${datos.price}" required>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="owner" class="col-sm-2 col-form-label">Propietario</label>
                <div class="col-sm-10">
                    <select class="form-control" id="owner" name="owner" required>
                        <option value="">Seleccionar propietario</option>`;
                        users.forEach(user => {
                                if ((datos.owner?.username ?? '') == user.username) {
                                    html += `<option value="${user._id}" selected>${user.username}</option>`;
                                } else {
                                    html += `<option value="${user._id}">${user.username}</option>`;
                                }
                        });
                        html += `
                    </select>
                </div>
            </div>
            <div class="mb-3 row">
                <div class="col-sm-10 offset-sm-2">
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </div>
            </div>
        </form>
    </div>`

    return await createPage({ title: 'Editar Obra de arte', content: html })
    }
}