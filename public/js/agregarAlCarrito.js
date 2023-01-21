
window.addEventListener('load',function(){

    let carrito =[];
    let storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        
      }

    let botones = document.querySelectorAll('.add-to-cart-button2')

    let url = 'http://localhost:3001/api/products';
    

    const getTheSelectedToy = async (url) => {
        try {
            const response = await fetch(url)
            const results = await response.json();
            // console.log(results.products)

            const losResultados = results.products
            // console.log(losResultados)
            losResultadosResumidos = losResultados.map ( e => {
                return {
                    id: e.id,
                    name: e.name, 
                    price: e.price,
                    img: e.img,
                    quantity: 1
                }
            })

            console.log(losResultadosResumidos)
            let botones = document.querySelectorAll('.add-to-cart-button2')

            for (let boton of botones) {
                boton.addEventListener('click',function(e){
                    e.preventDefault
                    console.log(boton.id)
                    selectedToy = losResultadosResumidos.find(toy => {
                        return toy.id == boton.id
                     })   
                    
                    for ( i = 0; i < carrito.length; i++) {
                        if (carrito[i].name.trim() === selectedToy.name.trim()) {
                            carrito[i].quantity++;
                            addLocalStorage()
                            return console.log(carrito)
                        }
                    }
                    carrito.push(selectedToy)
                    addLocalStorage()
                    console.log(carrito)

                })
            }
            } catch(error) {
            console.log(error);
        }
    }

    getTheSelectedToy(url)

    function addLocalStorage(){
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }
})

 
  
 

