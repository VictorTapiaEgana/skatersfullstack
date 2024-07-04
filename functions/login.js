const pool = require('../db_config');
const jwt = require('jsonwebtoken');

async function login (correo,pass){

    let client;

    try {

        client = await pool.connect();
        const consulta = `SELECT nombre, password,anos_experiencia,especialidad, foto FROM skaters WHERE email = $1;`
        const variables = [correo];
        const resultado = await client.query(consulta,variables);
        

          if (resultado.rowCount > 0){
              if (resultado.rows[0].password == pass){

                var TOKEN = jwt.sign({ nombre: resultado.rows[0].nombre,
                                       correo,
                                       experiencia:resultado.rows[0].anos_experiencia,
                                       especialidad:resultado.rows[0].especialidad,
                                       foto:resultado.rows[0].foto,
                                       exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                     },process.env.SECRET_KEY);
                
                return TOKEN;

              }else{
              
                return `Contraseña incorrecta`
              
              }
          }else{
            
            return `Usuario no registrado`
            
          }
        
    } catch (error) {
        
        console.log(`X Error al conectar a la base da datos : ${error}`)
        
    } finally {

        client.release()
    }
};

module.exports = login;

