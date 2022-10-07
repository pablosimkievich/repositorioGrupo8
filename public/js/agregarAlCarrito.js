



window.addEventListener('load',function(){

    console.log('Hola')
    
    let botones = document.querySelectorAll('.add-to-cart-button')
    
            for(let boton of botones){
                boton.addEventListener('click',function(){

                    let inputs = document.querySelectorAll('.input-carrito')
                    for (let input of inputs) {
                        
                        console.log(input.value)
                    }
                    

                    let input = document.querySelector('.input-carrito')
                    console.log(input)

                    })
            }
  
  })

 


