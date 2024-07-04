CREATE TABLE skaters (id SERIAL, 
					  email VARCHAR(50) NOT NULL, 
					  nombre VARCHAR(25) NOT NULL, 
					  password VARCHAR(25) NOT NULL, 
					  anos_experiencia INT NOT NULL, 
					  especialidad VARCHAR(50) NOT NULL, 
					  foto VARCHAR(255) NOT NULL, 
					  estado BOOLEAN NOT NULL
					 );


					 
					 
SELECT id, email, nombre,password,anos_experiencia,especialidad,estado FROM skaters;

SELECT  nombre,anos_experiencia, especialidad, foto, estado FROM skaters ORDER By nombre ASC;

UPDATE skaters SET nombre = $1 , password = $2, anos_experiencia = $3, especialidad =$4 WHERE email = $5;

DELETE FROM skaters WHERE id > 2;
