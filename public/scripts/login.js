const correo = document.getElementById('email1');
const pass = document.getElementById('password2');
const btnLogin = document.getElementById('btnlogin');
const msjError = document.getElementById('alert');

btnLogin.onclick = async (e) =>{

    e.preventDefault();

    if ( correo.value != '' && pass.value != '' ) {
        
        const Correo1 = correo.value.trim();
        const Pass1 = pass.value.trim();

        const resultado = await fetch('/login',{ method:'POST',
                                                 headers:{'Content-Type': 'application/json'},
                                                 body: JSON.stringify({ Correo1,Pass1 })
                                               }
                                     );

        const result = await resultado.json();
        

                if (result.status.length > 100){
                    
                        sessionStorage.setItem('token',result.status);
                        window.location.href = `/perfil?token=${result.status}`


                }else{

                        msjError.innerHTML = `❌ ${result.status}`;
                        msjError.style.visibility = 'visible';
                }


    }else{
        
        msjError.innerHTML = "❌ Ingrese usuario y contraseña ";
        msjError.style.visibility = 'visible';

    }

}

