window.addEventListener('load', function() {
    let storage = JSON.parse(sessionStorage.getItem('carrito'));
    storage ? carrito = storage: carrito = [];
    let ShoppingCart = document.getElementById('shopping-cart'); // ? aqui se agregaran los productos
    const tableHead = document.querySelector('thead');

    let calculation = () => {
        let cartIcon = document.getElementById("cartAmount");
        let totalItemsQ = carrito.map( (x) => x.quantity).reduce((x, y) => x + y, 0);
        cartIcon.innerHTML = totalItemsQ; // ? se manda los items y  cantidades al contador rojo del  icono del carrito 
    }; 
    

    let generateCartItems = () => {
        if (carrito.length !== 0) {
            const tbody = document.querySelector('.tbody')
            
            // tbody.innerHTML = ''
            return (ShoppingCart.innerHTML = carrito // ?  agrega los productos desde el localStorage
                .map((x) => {
                    let {id, quantity} = x;
                    let search = carrito.find((y) => y.id == id) || []; // encuentra los productos de los ids del carrito
                    const Content = `   
                    <tr class="itemCarrito ">
                <th class="columns" scope="columns"></th>
            <td class="table__productos">
            <input class="input__id id__class" type="number" value="${id}"  style="display:none;">
            <a class="cart-link" href="/juguetes/${id}"><img src=${search.img}  alt=""></a>
            <br></br>
            <h6 class="title">${search.name}</h6>
            </td>
            <td class="table__price"><p>$ ${search.price}</p></td>
            <td class="table__cantidad">
            <input  type="number" min="1" value=${quantity} class="input__elemento">
            <button class="delete btn btn-danger">x</button>
            </td>
            </tr>
                `  
                return Content    
            }).join("")) 
        }
        else {
            let hiding = document.querySelector('.esconder-titulo-tabla')
            hiding.style.display ='none'
            ShoppingCart.innerHTML = ``
            ShoppingCart.innerHTML = `
            <div class="empty-cart" style="min-height: 290px">
            <h2>El carrito de compras esta vacío</h2>
            <a href="/" style="text-decoration: none">
                <button class="add-to-cart-button2">Volver a Home</Button>
            </a>
            </div>
            `   
        }
    }
    
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
        calculation()
        // addSessionStorage()
    }

    const removeItemCarrito = (e) => {
        const buttonDelete = e.target
        const tr = buttonDelete.closest('.itemCarrito')
        const title = tr.querySelector('.title').textContent;
        for(let i=0; i < carrito.length ; i++){

            if(carrito[i].name.trim() === title.trim()){
            carrito.splice(i, 1);
        }

        tr.remove()
        
        CarritoTotal()
        addSessionStorage()

        if (carrito.length === 0) {
            tableHead.style.display = ('none')
            ShoppingCart.innerHTML = ``
            ShoppingCart.innerHTML = `
            <div class="empty-cart" style="min-height:220px;">
            <h2>El carrito de compras esta vacío</h2>
            <a href="/" style="text-decoration: none">
                <button class="add-to-cart-button2">Volver a Home</Button>
            </a>
            </div>
            `
        } else if ( carrito.length < 3) {
            
        }
      }
    }
 

    const incrementDecrement = function(e) {
        // console.log('buenas noches')
        const sumaInput  = e.target
        const tr = sumaInput.closest(".itemCarrito")
        // console.log(tr)
        const title = tr.querySelector('.title').textContent;
        carrito.forEach(item => {
          if(item.name.trim() == title.trim()){
            sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
            sumaInput.value > 20 ?  (sumaInput.value = 20) : sumaInput.value;
            item.quantity = Number(sumaInput.value);     
            addSessionStorage()
            CarritoTotal()    
            // calculation()
            console.log(carrito)  
          }
        })   
    }

    generateCartItems();  // ! renderiza los productos del carrito
    CarritoTotal()
    


    const deleteButtons = document.getElementsByClassName('delete')
    const inputElements = document.querySelectorAll('.input__elemento')
    const inputIds = document.getElementsByClassName('.input__id')
 
    for (let deleteButton of deleteButtons) {
        deleteButton.addEventListener('click', removeItemCarrito)
    }

    for (let inputElement of inputElements) {
        inputElement.addEventListener('change', incrementDecrement)
    }


    const fetchPostOrder = async function()  {
        try {
            let form = document.querySelector('.formulario-1')
            let formData = new FormData(form)
            console.log(formData.get('shop-date'))
            let data = new URLSearchParams(formData);
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
               
            Swal.fire({
                icon: "success",
                title: "Compra efectuada con éxito",
                text: "A la brevedad tu pedido será entregado"
            })
            misComprasButton.classList.add('show-button') 
            }
    }): "";


    function addSessionStorage(){
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
    }

})

