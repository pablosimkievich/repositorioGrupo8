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
            let hiding = document.querySelector('.esconder-titulo-tabla')
            hiding.style.display ='none'
            ShoppingCart.innerHTML = ``
            ShoppingCart.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html" style="text-decoration: none">
                <button class="add-to-cart-button2">Back to Home</Button>
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
        let inputMontoTotal = document.getElementById('introducir-monto-compra')
        inputMontoTotal.value = Total
        itemCartTotal.innerHTML = ``
        itemCartTotal.innerHTML = `Total $ ${ Total}`
        addSessionStorage()
    }


    function removeItemCarrito(e) {
        const buttonDelete = e.target
        const tr = buttonDelete.closest('.ItemCarrito')
        const title = tr.querySelector('.title').textContent;
        for(let i=0; i < carrito.length ; i++){
    
            if(carrito[i].title.trim() === title.trim()){
              carrito.splice(i, 1);
            }
        }
        const alert = document.querySelector('.remove')
        
          setTimeout( function(){
            alert.classList.add('remove')
          }, 1000)
            alert.classList.remove('remove')
        
        tr.remove()
        CarritoTotal()
    }


    const fetchPostOrder = async function()  {

        try {

            let form = document.querySelector('.formulario-1')
            let formData = new FormData(form)
            console.log(formData.get('shop-date'))
            let data = new URLSearchParams(formData);
            // let data = Object.fromEntries(formData)

            url = "http://localhost:3001/carrito-shop-order"

            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data
            }).then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))

            /*
            const idUserInput = document.getElementById("id-user").value
            const shopDateInput = document.getElementById("order-date").value
            const totalAmountInput = document.getElementById("introducir-monto-compra").value
            const addressInput = document.getElementById("user-address")
            const payMethodInput = document.getElementById("payment-method")
            const orderButton = document.getElementById('order-button')
            const orderStatus = 'Enviado'
    
            addressInput.addEventListener('change', (e) => {
                let addressIncoming = addressInput.value
                console.log(addressIncoming)
            })
            payMethodInput.addEventListener('change', (e) => {
               let payMethodIncoming = payMethodInput.value
               console.log(payMethodIncoming)
            })
            */
            /* orderButton.addEventListener('click', (e) => {
                e.preventDefault()
     
                console.log(idUserInput)
                console.log(shopDateInput)
                console.log(totalAmountInput)
                console.log(orderStatus)
            }) */
        } catch (error) {
            console.log(error);
        }

    }

    let botoncito2 = document.getElementById('order-button')
    botoncito2.addEventListener('click', (e) => {
        e.preventDefault()
        
        fetchPostOrder()
        // form(submit)
    })


    const fetchOrderDetail = async function () {
        let storage = JSON.parse(sessionStorage.getItem('carrito'));
        storage? carrito = storage: carrito = ["succes", "ok", "ye", "reintentando"]
    
        console.log(carrito)
    
        async function sendingJson()  {
            try {
                // console.log('Buen día')
                let response = await fetch("http://localhost:3001/carrito-order-detail", {
                method: "POST",
                /* mode: 'no-cors', */
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Content-Type": "application/json",  
                },
                body: JSON.stringify(carrito),
                
                })
                let data = await response.json();
                console.log(response);
                console.log(data)
                
            } catch (error) {
                console.log(error)
            }
            
        }
        sendingJson()
        
    }

    let botoncito = document.getElementById('order-detail-button')
    botoncito.addEventListener('click', (e) => {
        e.preventDefault()

        fetchOrderDetail();
    })


    function addSessionStorage(){
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
    }

})

