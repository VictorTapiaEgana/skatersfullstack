const pool = require ('../db_config');

async function listadoSkaters(){

    let client;

    try {

        client = await pool.connect()
        const resultado =  await client.query(`SELECT nombre,anos_experiencia, especialidad, foto, estado FROM skaters ORDER By nombre ASC;`);
        return resultado.rows;
        
    } catch (error) {

        console.log(`X Error al obtener los registros : ${error}`);
        
    } finally {

        client.release();

    }

};

module.exports = listadoSkaters;