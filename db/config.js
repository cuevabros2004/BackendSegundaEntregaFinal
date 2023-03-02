import fs from 'fs';
import {MYSQL_CONEXTION_STRING, BD_MYSQL} from '../config.js'
import { STRING_CONEXION_MONGO, USUARIO_CONEXION_MONGO, PASSWORD_CONEXION_MONGO,  BD_MONGO} from '../config.js'

//MongoDB
//export const CNX_STR = 'mongodb+srv://root:12345@cluster0.mqhwyzp.mongodb.net/test'
export const CNX_STR = STRING_CONEXION_MONGO + USUARIO_CONEXION_MONGO + ':' + PASSWORD_CONEXION_MONGO + BD_MONGO
//mongodb+srv://root:12345@cluster0.mqhwyzp.mongodb.net/test


//FireStore
export const serviceAccount = JSON.parse(await fs.promises.readFile('./db/ecommerce-edf6f-firebase-adminsdk-at3mn-33e510bb7e.json', 'utf-8'));
 

//Sqlite3
export const sqlite3Config = {
    client: 'sqlite3',
    connection: {
        filename: "./db/ecommerce/mydb.sqlite"
    },
    useNullAsDefault: true   
}


export default sqlite3Config
export const user = 'root'
export const DB_NAME = 'ecommerce'
export const PERSISTENCIA = 'mongodb'