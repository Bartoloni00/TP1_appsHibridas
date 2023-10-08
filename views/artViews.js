import { createPage } from './../utils/utils.js'

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
    
    
    static async getByID({ art }) {
        let html = `
        <section class="row">
            <div class="col-md-6">
                <img src="${art.img}" class="img-fluid" alt="${art.name}">
            </div>
            <div class="col-md-6">
                <h2>${art.name}</h2>
                `
                if (art.owner != undefined && art.owner.username) {
                    html += `<span><p>Propietario</p>: ${art.owner.username}</span>`
                }
            html += `
                <p>${art.description}</p>
                <span><b>Precio</b>: $ ${art.price}</span>
                <a href="${art.link}" class="btn btn-primary">link hacia la obra</a>
            </div>
        </section>`
    
        return await createPage({ title: `Detalles de la obra: ${art.name}`, content: html })
    }    
}