const pool = require('../db_config');


async function eliminarSkater (correo){

    let client;

    try {

        client = await pool.connect();
        const consulta = `DELETE FROM skaters WHERE email = $1;`;
        const variables = [correo];
        const resultado = await client.query(consulta,variables);
        return resultado;

        
    } catch (error) {

        console.log(`X Error al eliminar le registro : ${error}`);

    }


};

module.exports = eliminarSkater;