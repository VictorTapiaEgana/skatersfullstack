const pool = require('../db_config');

async function guardarSkater(email, nombre, password, anos, especialidad, archivo, estado){

let client;

  try {

        client = await pool.connect();
        const consulta = `INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7);`
        const variables = [ email, nombre, password, anos, especialidad, archivo, estado ];
        const resultado = await client.query(consulta,variables);

        return resultado;      
    
  } catch (error) {

        console.log(`X Error al conectar a la base de datos : ${error}`);
    
  } finally {

        client.release();   

  }    

};

module.exports = guardarSkater;