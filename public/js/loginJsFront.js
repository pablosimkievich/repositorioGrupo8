window.addEventListener("load", function() {
let formLogin = document.querySelector("#formLogin");
let botonForm = document.querySelector("#botonLogin")

/*
let storage = JSON.parse(sessionStorage.getItem('carrito'));
storage ? carrito = storage: carrito = []; 
*/
botonForm.addEventListener("click", function(e) {
/*
 e.preventDefault();
  let formData = new FormData(formLogin)

  for (i = 0; i < carrito.length; i++) {
    formData.append(  carrito[i].name, carrito[i].quantity)
  }
  
  let data = Object.fromEntries(formData) // se puede estringuificar a un JSON
  
  console.log(Object.keys(data)) 
  
  formLogin.submit() */

let errores = [];

let ulErrores = document.querySelector('div.errores ul');
        while (ulErrores.firstChild) {
            ulErrores.removeChild(ulErrores.firstChild);
        }
        console.log(ulErrores);


 let mailLogin = document.querySelector("input.emailLogin");
 if (mailLogin.value == "") {
    errores.push("Debes completar el campo con un email")     
 }


 let passwordLogin = document.querySelector("input.passwordLogin");
  if (passwordLogin.value.length <= 8) {
    errores.push("La password debe tener al menos 8 caracteres")
  }
 
  if (errores.length > 0) {
    e.preventDefault();
    let ulErrores = document.querySelector("div.errores ul");
    for (let i = 0; i < errores.length; i++) {
        ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
    }
  }

 })



})