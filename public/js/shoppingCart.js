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
            <input id="${search.id}"  type="number" min="1" value=${search.quantity} class="input__elemento">
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
            <div class="empty-cart" style="min-height: 270px">
            <h2>El carrito de compras esta vacío</h2>
            <a href="/" style="text-decoration: none">
                <button class="add-to-cart-button2">Back to Home</Button>
            </a>
            </div>
            `
            
        }
        /* tr = document.getElementsByClassName('ItemCarrito')
        tr.querySelector('.delete').addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', CarritoTotal) */

        // CarritoTotal()
    }
    
    function CarritoTotal() {
        console.log('buenas')
        // let theTarget = document.getElementById(`${search.id}`)
        // console.log(theTarget)
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

    generateCartItems();  // ! renderiza los productos del carrito
    


    const tableRows = document.getElementsByClassName('ItemCarrito')
    const deleteButtons = document.getElementsByClassName('.delete')
    const inputElements = document.getElementsByClassName('input__elemento')

    for ( let tableRow of tableRows) {
        tableRow.querySelector('tr')
    }

    for (let deleteButton of deleteButtons) {
        deleteButton.addEventListener('click', removeItemCarrito)
    }

    for (let inputElement of inputElements) {
        inputElement.addEventListener('change', CarritoTotal)
    } 


    const removeItemCarrito = (e) => {
        console.log('buenos dias')
    }


    CarritoTotal()

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

        } catch (error) {
            console.log(error);
        }

    }

    let botoncito2 = document.getElementById('order-button')
    
    botoncito2? botoncito2.addEventListener('click', (e) => {
        e.preventDefault()
        if (carrito.length > 0) {
            fetchPostOrder()
            botoncito2.disabled= ('disabled')
            botoncito2.style.backgroundColor = ('#DDD')
            botoncito2.classList.remove('button-new-class')
            botoncito2.classList.add('button-new-class2')
        }

        
    }): "";


    const fetchOrderDetail = async function () {
        let storage = JSON.parse(sessionStorage.getItem('carrito'));
        storage? carrito = storage: carrito = ["succes", "ok", "ye", "reintentando"]
        // console.log(carrito)

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
    let misComprasButton = document.getElementById('new-button')

    botoncito? botoncito.addEventListener('click', (e) => {
        e.preventDefault()

        if (botoncito2.disabled) {
            fetchOrderDetail();
            botoncito.disabled = ('disabled')
            botoncito.style.backgroundColor = ('#DDD')
            botoncito.classList.remove('button-new-class')
            botoncito.classList.add('button-new-class3')
            
            // e.target(submit)
            sessionStorage.clear('carrito')
            misComprasButton.classList.add('show-button')    
            Swal.fire({
                icon: "success",
                title: "Compra efectuada con éxito",
                text: "A la brevedad tu pedido será entregado"
            })
            }
    }): "";


    function addSessionStorage(){
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
    }

})

