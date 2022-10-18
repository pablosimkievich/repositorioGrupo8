window.addEventListener("load", function() {
    
    let registerButton = document.querySelector(".register-button")

    registerButton.addEventListener("click", function(e) {
    console.log("hice click")
    let errores = [];

    let ulErrores = document.querySelector('div.errores ul');
    while (ulErrores.firstChild) {
        ulErrores.removeChild(ulErrores.firstChild);
        }
        console.log(ulErrores);

                
        let nombreRegister = document.querySelector("input.name-register");
         if (nombreRegister.value == "") {
            // console.log("El Name está vacío")
            errores.push("Debes completar el campo con un nombre")     
         }
    
         let apellidoRegister = document.querySelector("input.apellido-register");
         if (apellidoRegister.value == "") {
            errores.push("Debes completar el campo con un apellido")     
         }

         let emailRegister = document.querySelector("input.email-register");
         if (emailRegister.value == "") {
            errores.push("Debes completar el campo con un email")     
         }

         let imgRegister = document.querySelector("input.register-look-for-img");
         if (imgRegister.value.includes(".jpg") || imgRegister.value.includes(".jpeg") 
         || imgRegister.value.includes(".png") || imgRegister.value.includes(".gif")) {
            errores.push("Debes cargar una imagen con formato jpg o png")     
         }

         let passwordRegister = document.querySelector("input.password-register");
          if (passwordRegister.value.length <= 8) {
            errores.push("La password debe tener al menos 8 caracteres")
          }

          let passwordConfirmRegister = document.querySelector("input.password-confirm-register");
          if (passwordConfirmRegister.value.length <= 8) {
            errores.push("La confirmación de la password debe tener al menos 8 caracteres")
          }

          if (passwordConfirmRegister.value == "") {
            errores.push("Debes completar la confirmación de la password")
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