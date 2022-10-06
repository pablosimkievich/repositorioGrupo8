window.addEventListener('load',function(){
  let formulario = document.querySelector('#review-form')
    
  
    let inputRating = document.querySelector('#rating-input')
    let estrellas = document.querySelector('#starsInner')

      inputRating.addEventListener('blur', ()=>{
       
          estrellas.style.width = `${inputRating.value}%`
           
  
          });


  

   formulario.addEventListener('submit', (e)=>{      

        let inputRating = document.querySelector('#rating-input')
        let titulo = document.querySelector('#titulo-input')
        let review = document.querySelector('#review-input')

        let errores =[]

        if(inputRating.value.isEmpty()){
                  errores.push('Debes ingresar un numero')
                }else if(inputRating.value>100 || inputRating.value<0){
                  errores.push('Debes ingresar un numero del 0 al 100')
                      }
        
        if(titulo.value = ""){
          errores.push('el campo de titulo debe estar completo')
        }else if(titulo.value.length < 3){
          errores.push("El titulo tiene que tener al menos 3 caracteres")
        }

        if(review.value = null){
          errores.push("el campo de review no puede estar vacio")
        }else if(review.value.length < 5){
          errores.push("El comentario tiene que tener al menos 5 caracteres")
        }
        
        if(errores.length >0){
          e.preventDefault()
          let erroresUl = document.querySelector('.errores ul')
        
         errores.map(element=>{
            erroresUl.innerHTML += "<li>" + element + "</li>"
          })

        }
    
          })
    
            
        

  })
