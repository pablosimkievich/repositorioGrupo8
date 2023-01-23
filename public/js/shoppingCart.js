window.addEventListener('load', function() {
    let storage = JSON.parse(sessionStorage.getItem('carrito'));
    storage ? carrito = storage: carrito = [];
    
    let ShoppingCart = document.getElementById('shopping-cart'); // ? aqui se agregaran los productos

    let generateCartItems = () => {
        if (carrito.length !== 0) {
            // console.log('basket is not empty')
            
            return (ShoppingCart.innerHTML = carrito // ?  agrega los productos desde el localStorage
                .map((x) => {
                    let {id, quantity} = x;
                    let search = carrito.find((y) => y.id == id) || []; // encuentra los productos de los ids del carrito
                    
                    return `
                    <tr class="ItemCarrito">
                <th class="columns" scope="columns"></th>
            <td class="table__productos">
            <input type="number" value="${search.id}" id="id-search" style="display:none;">
            <img src=${search.img}  alt="">
            <h6 class="title">${search.name}</h6>
            </td>
            <td class="table__price"><p>$ ${search.price}</p></td>
            <td class="table__cantidad">
            <input type="number" min="1" value=${search.quantity} class="input__elemento">
            <button class="delete btn btn-danger">x</button>
            </td>
            </tr>
                `
            }).join(""))
            
           
        }
        else {
            // console.log('basket is totally empty')
            ShoppingCart.innerHTML = ``
            label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="HomeBtn">Back to Home</Button>
            </a>
            `



            
        }
        tr = document.getElementsByClassName('ItemCarrito')
        tr.querySelector('.delete').addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', CarritoTotal)

        CarritoTotal()
    }
    
    generateCartItems();  // ! renderiza los productos del carrito
    CarritoTotal()

    function CarritoTotal() {
        let Total = 0;
        const itemCartTotal= document.querySelector('.itemCartTotal');
        carrito.forEach( item => {
            let precio =  Number(item.price.replace("$", ""))
            Total  = Total + precio * item.quantity
        })
        itemCartTotal.innerHTML = ``
        itemCartTotal.innerHTML = `Total $ ${ Total}`
        addSessionStorage()
    }

    function removeItemCarrito(e) {
        const buttonDelete = e.target
        const tr = buttonDelete.closest('.ItemCarrito')
        // const title = tr.querySelector('.title').textContent;
        const idToyElement = document.getElementById("id-search")
        const idToy = idToyElement.value
        console.log(idToy)
        for(let i=0; i < carrito.length ; i++){
    
            if(carrito[i].id == idToy){
              carrito.splice(i, 1);

            }
        }
        
        // const alert = document.querySelector('.remove')
        /*
          setTimeout( function(){
            alert.classList.add('remove')
          }, 1000)
            alert.classList.remove('remove')
        */
        tr.remove()
        CarritoTotal()
    }

    function addSessionStorage(){
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
    }

})

