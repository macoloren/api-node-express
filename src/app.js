//solo configuracines de la app de express
import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import { createRoles } from "./libs/initialSetup";

import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/user.routes";


const app = express();
createRoles();  // cargando roles por defecto

app.set('pkg', pkg); //accediendo a package.json
app.use(express.json());  //la app entienda los formatos json forma global
app.use(morgan('dev')) //intercepta los endpoint visitados por el client

app.use('/api/products', productsRoutes);  //uso de las rutas y su prefijo(api)
app.use('/api/auth', authRoutes);  //uso de las rutas y su prefijo(api)
app.use('/api/users', usersRoutes);  //uso de las rutas y su prefijo(api)




//usando la informacion del package.json
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
});


export default app