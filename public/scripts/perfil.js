const nombre = document.getElementById('nombreProfile');            
const correo = document.getElementById('correoProfile');            
const foto = document.getElementById('imgProfile');                 
const nombreSkater = document.getElementById('nombre_skater');      
const passSkater = document.getElementById('contrasena_skater');    
const pass2Skater = document.getElementById('contrasena2_skater');  
const experiencia = document.getElementById('experiencia_skater');  
const especialidad = document.getElementById('especialidad_skater');
const btnActualizar = document.getElementById('btnActualizar');     
const btnEliminar = document.getElementById('btnEliminar');         
const btnEliminarSI = document.getElementById('btnConfirmarEliminacion');
const msjError = document.getElementById('alert');
const modal1 = document.querySelector("#modal");

let myModal = undefined;

//CARGAR DATOS
document.addEventListener('DOMContentLoaded',()=>{
   
  myModal = new bootstrap.Modal(modal1);

    const TOKEN = sessionStorage.getItem('token');

    if (TOKEN){

        const datos = window.jwt_decode(TOKEN);       

        foto.setAttribute('src',`/avatares/${datos.foto}`)
        nombre.textContent = `${datos.nombre}`;
        correo.textContent = `${datos.correo.toLowerCase()}`;
        nombreSkater.value = datos.nombre;
        experiencia.value = datos.experiencia;
        especialidad.value = datos.especialidad;

    }    

});

//ACTIALIZAR
btnActualizar.onclick = async(e) =>{

    e.preventDefault();

    let msgError = '';

    if (nombreSkater.value.trim() ==''){
        msgError +=`❌ El nombre no puede estar en blanco <br>`
    }

    if(passSkater.value.trim() != pass2Skater.value.trim() || pass2Skater.value.trim() == '' || passSkater.value.trim() == ''){
        msgError += `❌ La contraseña no coincide o esta en blanco <br>`
    }
    
    if(experiencia.value.trim() == ''){
        msgError += `❌ Faltan los años de experiencia <br>`
    }

    if(especialidad.value.trim() == ''){
        msgError +=`❌ Falta la especialidad <br>`
    }

    if (msgError !== '') {

        msjError.innerHTML = msgError;
        msjError.style.visibility = 'visible';

    } else {

        msjError.style.visibility = 'hidden';
  
        try {
                                                                          
            const resultado = await fetch('/perfil',{method:'PUT',
                                                     headers:{'Content-Type': 'application/json'},                                                     
                                                     body:JSON.stringify({nombre:nombreSkater.value,
                                                                          pass:passSkater.value,
                                                                          experiencia:experiencia.value,
                                                                          especialidad:especialidad.value,
                                                                          correo:correo.textContent  
                                                     })});

            const result  = await resultado.json();
            
            window.location.href ='/';

        } catch (error) {

            console.log(`X Error al actualizar los datos : ${error}`);

        }

    }


};

//ELIMINAR
btnEliminar.onclick = (e)=>{
    
    e.preventDefault();

    // const modal1 = document.querySelector("#modal");
    // const myModal = new bootstrap.Modal(modal1);
    myModal.show();    

};

//CONFIRMAR ELIMINACION
btnEliminarSI.onclick = (e) =>{

    e.preventDefault();

    try {
        
        fetch('/registro',{method:'DELETE',
                           headers:{'Content-type':'Application/json'}, 
                           body:JSON.stringify({correo:correo.textContent}) 
                        })
        .then(data => data.json())
        .then(result=>{        

            myModal.hide()
            window.location.href = '/';
        })

        
    } catch (error) {

        console.log(`X Error al eliminar el registro : ${error}`);
        
    }


};