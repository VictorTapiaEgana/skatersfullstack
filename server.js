const express = require('express');
const {create} = require('express-handlebars');
const expressFileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const guardarSkater = require('./functions/guardarSkater');
const listadoSkaters = require('./functions/listadoSkaters');
const login = require('./functions/login');
const actualizarDatos = require('./functions/actualizarDatos');
const eliminarSkater = require('./functions/eliminarSkater');

const PORT = process.env.SERVER_PORT || 3003;
const app = express();

app.use(express.json());

app.use('/css',express.static(path.join(process.cwd(),'/node_modules/bootstrap/dist/css')));
app.use('/cssJS',express.static(path.join(process.cwd(),'/node_modules/bootstrap/dist/js')));
app.use('/public',express.static(path.join(process.cwd(),'/public')));
app.use('/avatares',express.static(path.join(process.cwd(),'/avatares')));

// HANDLEBARS CONFIG
const hbs = create({ 
      extname: '.hbs',   
      layoutsDir:path.join(process.cwd(),'/views') ,
      partialsDir:path.join(process.cwd(),'/views/partials'),
      defaultLayout:false      
});

// CARGAR PARTIALS
const partialsDir = path.join(process.cwd(), '/views/partials');
const filenames = fs.readdirSync(partialsDir);

filenames.forEach(filename => {
  
  const matches = /^([^.]+).hbs$/.exec(filename);
  
  if (!matches) {
    return;
  }
  
  const name = matches[1];
  const template = fs.readFileSync(path.join(partialsDir, filename), 'utf8');
  hbs.handlebars.registerPartial(name, hbs.handlebars.compile(template));

});

// REGISTRAR HELPERS
hbs.handlebars.registerHelper('estado', function (value) {
  
    if (value) {
    
      return 'Aprobado';
    
    }else {
    
      return 'En revisión';
    }

});

hbs.handlebars.registerHelper('increment', function (value) {
      return parseInt(value) + 1;
});

hbs.handlebars.registerHelper('renderPartial', function(partialName, options) {

  const partial = hbs.handlebars.partials[partialName];

  if (partial) {
    return new hbs.handlebars.SafeString(partial(this));
  }

});  

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// UPLOAD FILES
app.use(expressFileUpload({
          limits: { fileSize: 5000000 },
          abortOnLimit: true,
          responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
       })
);

//INDEX
app.get('/',async (req,res)=>{

  try {

    const resultado =  await listadoSkaters();  
    res.render('index.hbs',{inicio :true,inscripcion:false,listado:resultado });  
    
  } catch (error) {
    
    console.log(`X Error al obteber el listado de skaters : ${error}`)

  }
    

});

// LOGIN
app.get('/login',(req,res)=>{

  const partialName = 'login';
  res.render('index', { partialName , login:true});
  
});

//VALIDAR USUARIO
app.post('/login',async(req,res)=>{  

    const { Correo1, Pass1 } = req.body;

    try {

      const resultado = await login(Correo1,Pass1)        
      // console.log(resultado)
      res.status(200).json({status:resultado});

    } catch (error) {

      console.log(`x Error al cosultar los registros : ${error}`);
      
    }

});

// INSCRIPCION
app.get('/inscripcion', (req, res) => {

    const partialName = 'inscripcion';
    res.render('index', { partialName,inicio : false,inscripcion:true });

});

//MIDDLEWARE VALIDARTOKEN
function ValidarToken(req,res,next){
  
  const { token } = req.query;
  
  if (token == null) return res.status(401).send('FALTA TOKEN DE VALIDACION !!!');

  jwt.verify(token, process.env.SECRET_KEY, (err) => {
  
      if (err) return res.status(403).send('TOKEN CADUCADO O INVALIDO !!!');     

      next();

  });

};

//PERFIL
app.get('/perfil',ValidarToken,(req,res)=>{

  const partialName = 'perfil';
  res.render('index.hbs',{partialName, inicio :false,inscripcion:false, perfil:true });     

});

//ACTUZALIZAR PERFIL
app.put('/perfil', async (req,res)=>{

  const {nombre, pass, experiencia, especialidad,correo } = req.body;

      try {
         
        const resultado = await actualizarDatos(nombre,pass,experiencia,especialidad,correo);        
        res.status(200).json({status:'Registro actualizado'});

      } catch (error) {

        console.log(`X Error al actualizar los datos : ${error}`);

      }
  
});

// GUARDRA SKATERS
app.post('/registro', async (req,res)=>{

  const { email, password, nombre, anos, especialidad } = req.body;
  const { foto }  = req.files;
  const { name }  = foto;    

  let guardado = false;

  // const extencion  = name.substr(name.length - 3, 3)
    
try {

  // foto.mv(path.join(process.cwd(),`/avatares/${email}.${extencion}`), (err) => {

    foto.mv(path.join(process.cwd(),`/avatares/${name}`), (err) => {

    if (err){
         
         console.log(`No se pudo crear el Archivo : ${err}`)
         guardado = false;
 
    } else{
 
       guardado = true;

    }       
 
    })
 
    if (guardado = true){

        const resultado = await guardarSkater(email, nombre, password, anos, especialidad,`${name}`,false);        
        res.status(200).send({status:'creado'});

    }
  
} catch (error) {

    console.log(`X Error al crear el nuevo registro : `, error);
  
}

});

//ELIMINAT SKATER
app.delete('/registro',(req,res)=>{

    const { correo } = req.body;

    try {

      const resultado = eliminarSkater ( correo );
      res.status(200).send({data:'OLI'})
      
    } catch (error) {

      console.log(`X Error al eliminar el registro : ${error}`);
      
    }

});

// SERVER START
app.listen(PORT,()=>{  

    console.clear();
    console.log(`Holiwis en port : ${PORT}`);

});
