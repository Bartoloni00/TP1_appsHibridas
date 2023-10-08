export class Components {
    static async navBar(){
        const navBar = `<nav class="navbar navbar-dark bg-dark justify-content-center">
        <ul class="nav justify-content-center">
            <li class="nav-item">
                <a class="nav-link font-weight-bolder"  href="/">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link font-weight-bolder"  href="/arts/">Obras de arte</a>
            </li>
            <li class="nav-item">
                <a class="nav-link font-weight-bolder"  href="/users/">Usuarios</a>
            </li>

            <li class="nav-item">
                <a class="nav-link font-weight-bolder"  href="/arts/create/">Agregar una obra de arte</a>
            </li>
            <li class="nav-item">
                <a class="nav-link font-weight-bolder"  href="/users/create/">Crear usuario</a>
            </li>
        </ul>
    </nav>`
    
    return navBar
    }

    static async footer(){
        const footer = `<footer class="bg-dark py-5 mt-5">
            <p class="text-center text-light">TP1 Aplicaciones hibridas | by Jonathan Abraham Bartoloni | Profesor: Villafañe Victor Emanuel</p>
        </footer>`

        return footer
    }
}