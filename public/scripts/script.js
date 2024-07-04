const btninscripcion = document.getElementById('btnInscripcion');

btninscripcion.onclick = (e) =>{    
    
    e.preventDefault();
    console.log(e)
    window.location.href = '/inscripcion'

};