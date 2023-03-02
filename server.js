import { STRING_CONEXION_MONGO, USUARIO_CONEXION_MONGO, PASSWORD_CONEXION_MONGO,  BD_MONGO} from './config.js'
import {PUERTO_POR_DEFECTO} from './config.js'
import mongoose from 'mongoose'
import express from 'express';
import routerApiProducts from './routers/routerApiProducts.js'
import routerApiShoppingCart from './routers/routerApiShoppingCart.js'
import { Server as HttpServer } from 'http'



const servidor = express()

const httpServer = new HttpServer(servidor)

//Middlewares para resolver los datos que viene por el Post
//Si viene por un Json o si viene de un formulario (Form)
servidor.use(express.json())
servidor.use(express.urlencoded({ extended: true }))

//Middlewares para los routers
servidor.use('/api/products', routerApiProducts)
servidor.use('/api/shoppingcart', routerApiShoppingCart)
servidor.use(express.static('public'))

//Si viene de una ruta no implementada
servidor.all('*', (req, res) => {
  res.status(404).json({error: "404", descripcion: "ruta " + req.url + " método " + req.method + " no implementado"})
})


const yargs = process.argv.slice(2)

let puerto

if(yargs[0] === 'cluster' || yargs[0] === 'fork')   
  puerto = PUERTO_POR_DEFECTO
else
  puerto = yargs[0] ?? PUERTO_POR_DEFECTO





function conectar() {

  try {
    const mongo = mongoose.connect(STRING_CONEXION_MONGO + USUARIO_CONEXION_MONGO + ':' + PASSWORD_CONEXION_MONGO + BD_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected DB");
  } catch (error) {
    console.log(`Error en conexión de Base de datos: ${error}`);
  }

  return new Promise((resolve, reject) => {
    const servidorConectado = httpServer.listen(puerto, () => {
      resolve(servidorConectado)
    })

  })
}

 

 export default  conectar 


















