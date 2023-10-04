import express from "express"
import ArtRoutes from './routes/routes.js'

const app = new express()
const port = 3333

app.use(express.urlencoded({extended: true}))
app.use('/',express.static('public'))

app.use(ArtRoutes)

app.listen(port,() => {
    console.log(`App listening on port http://localhost:${port}`);
})