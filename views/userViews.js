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
        <section class="row">
            <div class="col-md-6">
                <img src="${user.image}" class="img-fluid" alt="${user.username}">
            </div>
            <div class="col-md-6">
                <h1>${user.username}</h1>
                <p>${user.description}</p>
            </div>`
        html += `</section>`
        html += `
        <section class="row">`
        if (user.arts.length > 0 && user.arts) {
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
}