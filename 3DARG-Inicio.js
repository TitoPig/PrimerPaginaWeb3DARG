/*EVENTOS*/
let menubar = document.querySelector(".end");
let iconomenu = document.querySelector(".fa-bars");

iconomenu.addEventListener("click", ()=> {
    menubar.classList.toggle("show");
});

let contenedor = document.querySelector(".cont-img");
let punto = document.querySelectorAll(".punto");

function cambiarPunto() {
    let puntoActivo = document.getElementById("activo");
    let segundoPunto = document.querySelector(".segundoPunto");
    let primerPunto = document.querySelector(".primerPunto");
    let posicion = 0;
    if (puntoActivo.className == "punto primerPunto") {
        posicion = 1;
        primerPunto.setAttribute("id","");
        segundoPunto.setAttribute("id","activo");
    }
    else {
        primerPunto.setAttribute("id","activo");
        segundoPunto.setAttribute("id","");
    }
    let operacion = posicion * -50;
    contenedor.style.transform = "translateX(" +operacion+"%)";
}

const intervalo = setInterval(()=>{
    cambiarPunto();
}, 7000);

punto.forEach( (cadaPunto, i)=> {
    punto[i].addEventListener("click",()=>{
        cambiarPunto();
    });
});