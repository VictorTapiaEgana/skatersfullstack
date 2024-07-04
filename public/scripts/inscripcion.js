const btnGuardar = document.getElementById('btnGuardarRegistro');

const email = document.getElementById('email');
const nombre = document.getElementById('nombre');
const pass = document.getElementById('password');
const pass2 = document.getElementById('password2');
const anos = document.getElementById('anos');
const espe = document.getElementById('especialidad');
const foto = document.getElementById('formFileSm');
const mensajeError = document.getElementById('alert');

btnGuardar.onclick =  async (e) =>{

    e.preventDefault();

    let msgError = ''; 
    
    if (email.value.trim() == ''){
        msgError += `❌ El correo no puedo estar en blanco<br>`
    }

    if (nombre.value.trim() == ''){
        msgError += `❌ El nombre no puede estar en Blanco<br>`
    }

    if (pass.value.trim() != pass2.value.trim() || pass.value.trim() == '' || pass2.value.trim() == ''){
        msgError += `❌ Las contraseñas no coninciden o estan en blanco<br>`
    }

    if (anos.value.trim() == ''){
        msgError += `❌ Indique los años de experiencia<br>`
    }

    if (espe.value.trim() == ''){
        msgError += `❌ Indique la especialidad<br>`
    }

    if (foto.files[0] == undefined){
        msgError += `❌ Seleccione una Imagen de perfil`
    }

    if (msgError !== '') {

        mensajeError.innerHTML = msgError;
        mensajeError.style.visibility = 'visible';

    } else {

        mensajeError.style.visibility = 'hidden';

    }   

    // console.log(foto.files[0])

    if (msgError === ''){  
        const foto = document.getElementById('formFileSm');
        
        const SkAtErS = new FormData();
        
        SkAtErS.append('nombre', nombre.value);
        SkAtErS.append('email', email.value);
        SkAtErS.append('password', pass.value);
        SkAtErS.append('anos', anos.value);
        SkAtErS.append('especialidad', espe.value);
        SkAtErS.append('foto', foto.files[0]);
        
        try {

             const resultado = await fetch('/registro', { method:'POST',                                
                                                          body: SkAtErS,
                               })
            .then(response =>{               

                if (response.ok){

                      const toastLiveExample = document.getElementById('liveToast')
                      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)                                          
                      toastBootstrap.show()

                      nombre.value = '';
                      email.value = '';
                      pass.value = '';
                      pass2.value = '';
                      anos.value = '';
                      espe.value = '';
                      foto.value = '' ;

                }
                              
            })
            
        } catch (error) {

            console.log(`X Error al crear el registro : `,error);

        }
    }

};