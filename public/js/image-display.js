window.addEventListener('load',()=>{
   
    const imagenPrincipal = document.querySelector('.imagen-principal');
    const imagenPrincipalDos = document.getElementById('imagen-principal-2')
    const imagenPrincipalTres = document.getElementById('imagen-principal-3')
    const imagenPrincipalCuatro = document.getElementById('imagen-principal-4')
    const imagenAdicionalUno = document.querySelector('.imagenAdicional-2');
    const imagenAdicionalDos = document.querySelector('.imagenAdicional-3');
    const imagenAdicionalTres = document.querySelector('.imagenAdicional-4');  
    const imagenAdicionalCuatro = document.querySelector('.imagenAdicional-5');  
    
    
    if(window.innerWidth < 750){
        imagenPrincipalDos.style.display='none';
        imagenPrincipalTres.style.display='none';
        imagenPrincipalCuatro.style.display='none';

    }else{
        imagenPrincipalDos.removeAttribute('style')
        imagenPrincipalTres.removeAttribute('style')
        imagenPrincipalCuatro.removeAttribute('style')


   


        imagenAdicionalUno.addEventListener('mouseover',() => {
          
           imagenPrincipal.classList.add('esconderImagen');
           imagenPrincipal.classList.remove('imagen-principal')

           imagenPrincipalTres.classList.add('esconderImagen');
           imagenPrincipalTres.classList.remove('imagen-principal')

           imagenPrincipalCuatro.classList.add('esconderImagen');
           imagenPrincipalCuatro.classList.remove('imagen-principal')

           imagenPrincipalDos.classList.remove('esconderImagen')
           imagenPrincipalDos.classList.add('mostrarImagenPrincipal');
           imagenPrincipalDos.classList.add('imagen-principal')
            })

        imagenAdicionalDos.addEventListener('mouseover', ()=> {
            imagenPrincipal.classList.add('esconderImagen');
            imagenPrincipal.classList.remove('imagen-principal');
            imagenPrincipal.classList.remove('mostrarImagenPrincipal');

           imagenPrincipalDos.classList.add('esconderImagen');
           imagenPrincipalDos.classList.remove('imagen-principal')
           imagenPrincipalDos.classList.remove('mostrarImagenPrincipal')

           imagenPrincipalCuatro.classList.add('esconderImagen');
           imagenPrincipalCuatro.classList.remove('imagen-principal')
           imagenPrincipalCuatro.classList.remove('mostrarImagenPrincipal')

           imagenPrincipalTres.classList.remove('esconderImagen')
           imagenPrincipalTres.classList.add('mostrarImagenPrincipal');
           imagenPrincipalTres.classList.add('imagen-principal')
        });

        imagenAdicionalTres.addEventListener('mouseover', ()=> {
            imagenPrincipal.classList.add('esconderImagen');
            imagenPrincipal.classList.remove('imagen-principal')
           imagenPrincipalDos.classList.add('esconderImagen');
           imagenPrincipalDos.classList.remove('imagen-principal')
           imagenPrincipalTres.classList.add('esconderImagen');
           imagenPrincipalTres.classList.remove('imagen-principal')
           imagenPrincipalCuatro.classList.remove('esconderImagen')
           imagenPrincipalCuatro.classList.add('mostrarImagenPrincipal');
           imagenPrincipalCuatro.classList.add('imagen-principal')
        });

       imagenAdicionalCuatro.addEventListener('mouseover', ()=> {
         imagenPrincipalCuatro.classList.add('esconderImagen');
            imagenPrincipalCuatro.classList.remove('imagen-principal')
           imagenPrincipalDos.classList.add('esconderImagen');
           imagenPrincipalDos.classList.remove('imagen-principal')
           imagenPrincipalTres.classList.add('esconderImagen');
           imagenPrincipalTres.classList.remove('imagen-principal')
           imagenPrincipal.classList.remove('esconderImagen')
           imagenPrincipal.classList.add('mostrarImagenPrincipal');
           imagenPrincipal.classList.add('imagen-principal')
        });

    

    }


})