window.addEventListener('load',function(){
  let formulario = document.getElementById('review-form');
  let inputRating = document.querySelector('#rating-input');
  let estrellas = document.querySelector('#starsInner');
  let button = document.querySelector('.form-button');

    inputRating.addEventListener('blur', ()=>{
       
          estrellas.style.width = `${inputRating.value}%`
           
  
          });

    button.addEventListener('click', (e)=>{   

        let inputRating = document.querySelector('#rating-input')
        let titulo = document.querySelector('#titulo-input')
        let review = document.querySelector('#review-input')

        let errores =[];
        let erroresUl = document.querySelector('div.erroresFront ul')
       

       while (erroresUl.firstChild) {
          erroresUl.removeChild(erroresUl.firstChild);
      }

        if(inputRating.value == ''){
                  errores.push('Debes ingresar un numero')
                  console.log(errores)
                }
                
       if(inputRating.value>100 || inputRating.value<0){
                  errores.push('Debes ingresar un numero del 0 al 100')
                  console.log(errores)
                      }
      
        if(titulo.value == ""){
          errores.push('el campo de titulo debe estar completo')
        }
      if(titulo.value.length < 3){
          errores.push("El titulo tiene que tener al menos 3 caracteres")
        }

        if(review.value == ''){
          errores.push("el campo de review no puede estar vacio")
        }
        if(review.value.length < 5){
          errores.push("El comentario tiene que tener al menos 5 caracteres")
        }
        
       
        if(errores.length>0){
          e.preventDefault();
          let erroresUl = document.querySelector('div.erroresFront ul')

        
         errores.map(element=>{
            erroresUl.innerHTML += "<li >" + element + "</li>"
          })

        }else{
          formulario.submit()
        }
    
    })     
  
  })