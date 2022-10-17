window.addEventListener("load", function() {

const buttonform = document.querySelector('#form-button');
const form =  document.querySelector('.create-form');

buttonform.addEventListener('click', (e) => {
 console.log('hola click')
e.preventDefault()

const name = document.getElementById('input-name');
const description = document.querySelector('.textarea');
const img = document.getElementById('ppal-img-input');

let errores =[];
let erroresUl = document.querySelector('div.erroresFront ul');


while (erroresUl.firstChild) {
    erroresUl.removeChild(erroresUl.firstChild);
};

if(name.value == ''){
    errores.push('Debes completar este campo')
    
  }
if(name.value.length < 5){
    errores.push("El titulo tiene que tener al menos 5 caracteres")
  }
  console.log('hice click')

if(errores.length>0){
    e.preventDefault();
    let erroresUl = document.querySelector('div.erroresFront ul')
    console.log(erroresUl)
  errores.map(element=>{
    erroresUl.innerHTML += "<li >" + element + "</li>"
  })

}else{
  form.submit()
}


})


})