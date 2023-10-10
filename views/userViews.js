import { createPage } from './../utils/utils.js'

export class userViews{
    static async listAll({users}){
        let html = `
        <section class="row">`
    
        users.forEach(user => {
            html += `
            <div class="col-4">
                <div class="card" style="width: 18rem;">
                    <img src="${user.image}" class="card-img-top" alt="${user.username}">
                    <div class="card-body">
                        <h2 class="card-title">${user.username}</h2>
                        <p>${user.description}</p>
                        <a href="/users/${user._id}" class="btn btn-primary">Ver detalles</a>
                    </div>
                </div>
            </div>`
        })
    
        html += `</section>`
    
        return await createPage({ title: 'Usuarios', content: html });
    }

    static async getByID({user}){
        let html = `
        <nav class="nav nav-pills flex-column flex-sm-row my-3 ">
        <a class="flex-sm-fill text-sm-center nav-link active" aria-current="page" href="/users/update/${user._id}">Editar</a>
        <a class="flex-sm-fill text-sm-center nav-link" aria-current="page" href="/users/delete/${user._id}">Eliminar</a>
    </nav>`
        html += `
        <section class="row">
            <div class="col-md-6 my-3">
                <img src="${user.image}" class="img-fluid" alt="${user.username}">
            </div>
            <div class="col-md-6">
                <h1>${user.username}</h1>
                <p>${user.description}</p>
            </div>`
        html += `</section>`
        html += `
        <section class="row">`
        if (user.arts && user.arts.length > 0) {
            user.arts.forEach(art => {
                html += `
                <div class="col-4">
                    <div class="card" style="width: 18rem;">
                        <img src="${art.img}" class="card-img-top" alt="${art.name}">
                        <div class="card-body">
                            <span><b>${art.section}</b></span>
                            <h2 class="card-title">${art.name}</h2>
                            <p>${art.description}</p>
                            <a href="/arts/${art._id}" class="btn btn-primary">Ver detalles</a>
                        </div>
                    </div>
                </div>`
            })
        }
        html +=`</section>`
    
        return await createPage({ title: `Detalles de la obra: ${user.username}`, content: html, h1: false })
    }

    static async create({ arts }) {
        let html = `
            <form action="/users/create" method="post">
                <div class="mb-3 row">
                    <label for="username" class="col-sm-2 col-form-label">Nombre de usuario</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="username" name="username" required>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="description" class="col-sm-2 col-form-label">Descripción</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" id="description" name="description" rows="3" required></textarea>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="image" class="col-sm-2 col-form-label">URL de la Imagen</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="image" name="image">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="arts" class="col-sm-2 col-form-label">Propietario de:</label>
                    <div class="col-sm-10">
                        <div class="row">
                            ${arts.map(art => `
                                <div class="col-md-6 col-12 mb-2">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="${art._id}" name="arts" value="${art._id}">
                                        <label class="form-check-label" for="${art._id}">
                                            ${art.name}
                                        </label>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-10 offset-sm-2">
                        <button type="submit" class="btn btn-success">Enviar</button>
                    </div>
                </div>
            </form>
        </div>`;
    
        return await createPage({ title: 'Crear un nuevo usuario', content: html });
    }

    static async delete ({user}) {
        let html = `
        <nav class="nav nav-pills flex-column flex-sm-row my-3 ">
        <a class="flex-sm-fill text-sm-center nav-link active" aria-current="page" href="/users/update/${user._id}">Editar</a>
        <a class="flex-sm-fill text-sm-center nav-link" aria-current="page" href="/users/delete/${user._id}">Eliminar</a>
    </nav>`
        html += `
        <section class="row">
            <div class="col-md-6 my-3">
                <img src="${user.image}" class="img-fluid" alt="${user.username}">
            </div>
            <div class="col-md-6">
                <h1>${user.username}</h1>
                <p>${user.description}</p>
            </div>`
        html += `</section>`
        html += `
        <form action="/users/delete/${user._id}" method="post">
            <button type="submit" class="btn btn-danger">Eliminar</button>
        </form>`
    
        return await createPage({ title: `¿Estas seguro que desea eliminar al usuario: ${user.username}?`, content: html, h1: false })
    }

    static async update({ datosActuales , arts }) {
        let html = `
            <form action="/users/update/${datosActuales._id}" method="post">
                <div class="mb-3 row">
                    <label for="username" class="col-sm-2 col-form-label">Nombre de usuario</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="username" name="username" value="${datosActuales.username}" required>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="description" class="col-sm-2 col-form-label">Descripción</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" id="description" name="description" rows="3" required>${datosActuales.description}</textarea>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="image" class="col-sm-2 col-form-label">URL de la Imagen</label>
                    <img src="${datosActuales.image}" class="img-fluid" alt="${datosActuales.username}">
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="image" name="image">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="arts" class="col-sm-2 col-form-label">Propietario</label>
                    <div class="col-sm-10">
                        <div class="row">
                            ${arts.map(art => `
                                <div class="col-md-6 col-12 mb-2">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="${art._id}" name="arts" value="${art._id}" ${datosActuales.arts.some(a => a.name === art.name) ? 'checked' : ''}>
                                        <label class="form-check-label" for="${art._id}">
                                            ${art.name}
                                        </label>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-10 offset-sm-2">
                        <button type="submit" class="btn btn-warning">Editar</button>
                    </div>
                </div>
            </form>
        </div>`;
    
        return await createPage({ title: `Editar al usuario: ${datosActuales.username}`, content: html });
    }
}