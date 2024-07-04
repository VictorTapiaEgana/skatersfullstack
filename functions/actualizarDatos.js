const pool = require('../db_config');


async function actualizarDatos(nombre,pass,experiencia,especialidad,correo){

    let client;

    try {

        client = await pool.connect();
        const consulta = `UPDATE skaters SET nombre = $1 , password = $2, anos_experiencia = $3, especialidad =$4 WHERE email = $5;`;
        const variables =[nombre,pass,experiencia,especialidad,correo];
        const resultado = await client.query(consulta,variables);
        return resultado;

        
    } catch (error) {

        console.log(`X Error al conectar a la base de datos : ${error}`);
        
    }


};

module.exports = actualizarDatos;
