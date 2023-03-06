import ContainerMongodb from '../container/containerMongodb.js'
import ContainerUser from '../container/containerUser.js'
import { EMAILADMIN } from '../config.js'


const users = new ContainerUser('users')
const cart = new ContainerMongodb('cart')

 
 function controladorLogout(req, res) {
  if(req.session.user) { 
    req.session.destroy();
    res.status(200).json({"mensaje": "Usuario deslogueado"})
  } else
    res.json({"mensaje": "No hay Usuario logueado"})
}
   

function controladorLoginp(req, res) {
  
  req.session.user = req.body.username
 
  if(!req.isAuthenticated) { 
      return res.status(401)
  } else {
     res.status(200).json({"usuario": req.session.user })
  }
  
}


async function controladorRegistro(req, res) {
  res.status(201);
  const objeto = req.body; 

  //Doy de alta un carrito para este usuario
  const productos = []

  const carrito = {
    usuario: req.body.username,
    productos: productos
  }

  cart.save(carrito)

  res.json(objeto)

  //Envio correo al administrador con los datos del usuario dado de alta
  const html = `<h1 style="color: blue;">Datos del Usuario creado: </h1> <strong>Usuario: </strong> ${req.body.username} <br> <strong>Contraseña: </strong> ${req.body.password} <br> <strong>Nombre: </strong> ${req.body.nombre} <br> <strong>Apellido: </strong> ${req.body.apellido} <br> <strong>Tipo de Usuario: </strong> "Usuario" <br>`
  nodemailer("Mailer", EMAILADMIN, "nuevo registro", html, null)
  res.json(objeto)

 }


async function controladorInfousuario(req, res){

  if(req.session.user){
    console.log("entro!!" + req.session.user)
    const usuario = await users.buscar_usuario(req.session.user)
    //console.log(usuario)
    res.json(usuario)
  } else {
    res.json({"mensaje": "No hay usuario logueado"})
  }

 }
  
export {controladorLoginp, controladorRegistro, controladorLogout, controladorInfousuario}
