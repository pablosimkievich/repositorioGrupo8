window.addEventListener("load", function() {
let formLogin = document.querySelector("#formLogin");
let botonForm = document.querySelector("#botonLogin")

botonForm.addEventListener("click", function(e) {
 console.log("algo funciona");

let errores = [];

 let mailLogin = document.querySelector("input.emailLogin");
 if (mailLogin.value == "") {
    errores.push("Debes completar el campo con un email")     
 }

 let passwordLogin = document.querySelector("input.passwordLogin");
  if (passwordLogin.value.length <= 4) {
    errores.push("La password debe tener al menos 4 catacteres")
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