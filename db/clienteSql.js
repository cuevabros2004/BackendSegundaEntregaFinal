import mysqlConfig from './config.js'
import crearKnex from 'knex'
import crearTablas from '../db/createTables.js'

export const clienteSql = crearKnex(mysqlConfig)

// crearTablas()

 