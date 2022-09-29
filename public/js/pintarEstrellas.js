

window.addEventListener('load',function(){
  let formulario = document.querySelector('#review-form')
    
  formulario.addEventListener('change', ()=>{
    let inputRating = document.querySelector('#rating-input')
    let estrellas = document.querySelector('#starsInner')
           
      inputRating.addEventListener('blur', ()=>{
    
          estrellas.style.width = inputRating.value + "%"
         
 
            })


      })
   
            
        

  })
