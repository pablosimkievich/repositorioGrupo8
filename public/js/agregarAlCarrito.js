
window.addEventListener('load',function() {

    // localStorage.clear('carrito')
    // let carrito =[]; 
    let storage = JSON.parse(localStorage.getItem('carrito'));
    storage ? carrito = storage: carrito = [];
    
    let url = 'https://rayuela.onrender.com/api/products';
    

    const getTheSelectedToy = async (url) => {
        try {
            const response = await fetch(url)
            const results = await response.json();
            const losResultados = results.products
           
            losResultadosResumidos = losResultados.map ( e => {
                return {
                    id: e.id,
                    name: e.name, 
                    price: e.price,
                    img: e.img,
                    quantity: 1
                }
            })         
            let botones = document.querySelectorAll('.add-to-cart-button2')

            for (let boton of botones) {
                boton.addEventListener('click', function(e){
                    // console.log(e.target)
                    // console.log(boton.id)
                    selectedToy = losResultadosResumidos.find(toy => {
                        return toy.id == boton.id
                     })   
                    
                    for ( i = 0; i < carrito.length; i++) {
                        if (carrito[i].id === selectedToy.id) {
                            carrito[i].quantity = carrito[i].quantity + 1;
                            calculation();
                            addlocalStorage()
                            
                            console.log(carrito)
                            return 
                        }
                    }
                    carrito.push(selectedToy)
                    // carrito = []
                    calculation();
                    addlocalStorage()
                    console.log(carrito)
                })
            }
            } catch(error) {
            console.log(error);
        }
    }

    getTheSelectedToy(url)


    let calculation = () => {
        let cartIcon = document.getElementById("cartAmount");
        let totalItemsQ = carrito.map( (x) => x.quantity).reduce((x, y) => x + y, 0);
        cartIcon.innerHTML = totalItemsQ; // ? se manda los items y  cantidades al contador rojo del  icono del carrito 
    };
    
    calculation()

    
    function addlocalStorage(){
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }
})


 
  
 

