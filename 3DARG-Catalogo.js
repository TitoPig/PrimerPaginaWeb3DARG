/*INICIALIZACION*/

let menubar = document.querySelector(".end");
let iconomenu = document.querySelector(".fa-bars");

let categorias = [];

let contenedor = document.querySelector(".main");
let myNode = document.querySelector(".contenido");
let contenedorCat = document.querySelector(".aside");
let nav = document.querySelector(".navegacion");

/*EVENTOS*/
iconomenu.addEventListener("click", ()=> {
    menubar.classList.toggle("show");
});

/*CLASES CATEGORIAS Y PRODUCTOS*/
class Categoria {
    constructor(nombre, productos) {
        this.nombre = nombre,
        this.productos = productos
    };

    mostrar() {
        return this.nombre;
    };

    agregar(producto) {
        this.productos.push(producto);
    };

    mostrarProductos() {
        return this.productos;
    };
};

function agregarCat(cat, prod) {
    for (c of categorias) {
        if (c.nombre == cat) {
            c.agregar(prod);
            return
        };
    };
    let productos = [];
    nuevaCat = new Categoria(cat, productos);
    nuevaCat.agregar(prod);
    categorias.push(nuevaCat);
};

class Producto {
    constructor(categoria, id, modelo, imagen, precio, estilos) {
        agregarCat(categoria, this),
        this.categoría = categoria,
        this.id = id,
        this.modelo = modelo,
        this.imagen = imagen,
        this.precio = precio,
        this.estilos = estilos
    };

    mostrar() {
        let est = false;
        if (this.estilos.length > 1) {
            return ["<img src="+ this.imagen +">", "<h2 class='titulo'>"+ this.modelo +"</h2>", "<b>$"+ this.precio +"</b>", "<b>Varios estilos</b>"];
        }
        else {
            return ["<img src="+ this.imagen +">", "<h2 class='titulo'>"+ this.modelo +"</h2>", "<b>$"+ this.precio +"</b>", "<b>Un solo estilo</b>"];
        }
    };
};

/*CARGAR PRODUCTOS*/

let p_1 = new Producto("Soportes",1,"Soporte de auriculares","soporteDorado.jpg",800,["Dorado","Rojo","Blanco","Negro"]);
let p_2 = new Producto("Soportes",2,"Soporte de Notebook","soporteNotebookCeleste.jpg",800,["Celeste"]);
let p_3 = new Producto("Soportes",3,"Soporte de Celular","soporteCeluCelesteFrente.jpg",800,["Celeste"]);
let p_4 = new Producto("Llaveros",4,"Llavero de Boca","llaveroBoca.jpg",100,["Boca"]);
let p_5 = new Producto("Llaveros",5,"Llavero de River","llaveroRiver.jpg",100,["River"]);
let p_6 = new Producto("Llaveros",6,"Llavero de Argentina","llaveroArg.jpg",100,["Arg"]);
let p_7 = new Producto("Llaveros",7,"Llavero de Messi","llaveroMessi.jpg",100,["Messi"]);
let p_8 = new Producto("Llaveros",8,"Llavero de Athletic","llaveroCAC.jpg",100,["CAC"]);
let p_9 = new Producto("Llaveros",9,"Llavero de Instituto","llaveroIACC.jpg",100,["Instituto"]);

/*LISTAR PROD Y CATEGORIAS*/
let documentFragment = document.createDocumentFragment();

function listarTodos() {
    for (c of categorias) {
        for (p of c.productos) {
            let div = document.createElement("DIV");
            div.classList.add("prod");
            div.classList.add("" + c.nombre + "");
            div.setAttribute("id", p.id);
            let token = p.mostrar();
            div.innerHTML = token[0] + token[1] + token[2] + token[3];
            documentFragment.appendChild(div);
        };
    };
};

listarTodos();
contenedor.appendChild(documentFragment);

let documentFragmentNav = document.createDocumentFragment();

let div = document.createElement("B");
div.classList.add("Categorias");
div.innerHTML = "Categorias";

let divDos = document.createElement("B");
divDos.classList.add("nav");
divDos.classList.add("navTodas");
divDos.innerHTML = ">Todas";

documentFragmentNav.appendChild(div);
documentFragmentNav.appendChild(divDos);
nav.appendChild(documentFragmentNav);

let documentFragmentCat = document.createDocumentFragment();

function listarCat() {
    for (c of categorias) {
        let div = document.createElement("A");
        let b = document.createElement("B");
        div.classList.add("cat");
        div.classList.add("" + c.nombre + "");
        let token = c.mostrar();
        b.innerHTML = token;
        div.appendChild(b);
        documentFragmentCat.appendChild(div);

        let documentFragmentNav = document.createDocumentFragment();
        let divTres = document.createElement("B");
        divTres.classList.add("nav");
        divTres.classList.add("nav"+c.nombre);
        divTres.innerHTML = ">"+c.nombre;
        divTres.classList.add("noshow");
        documentFragmentNav.appendChild(divTres);
        nav.appendChild(documentFragmentNav);
    };
};

function listarCatTodas() {
    let div = document.createElement("A");
    let b = document.createElement("B");
    div.classList.add("cat");
    div.classList.add("global");
    let token = "Todas";
    b.innerHTML = token;
    div.appendChild(b);
    documentFragmentCat.appendChild(div);
};

listarCat();
listarCatTodas();
contenedorCat.appendChild(documentFragmentCat);

/* Filtros */

let cat = document.querySelectorAll(".cat");
cat.forEach((c)=>{
    c.addEventListener("click", ()=>{
        /*Trabajo con la cat global*/
        let classnameCat = c.className;

        let navGlobal = document.querySelectorAll(".nav");
        navGlobal.forEach((n)=>{
            n.classList.add("noshow");
        });

        if (classnameCat.includes("global")){
            let prodMostrarTodos = document.querySelectorAll(".prod");
            prodMostrarTodos.forEach(p =>{
                p.classList.remove("noshow");
            });
            
            let navTodas = document.querySelector(".navTodas");
            navTodas.classList.remove("noshow");
        }
        else {
            /*trabajo con las otras cat*/
            let prodEsconder = document.querySelectorAll(".prod");
            prodEsconder.forEach(p => {
                p.classList.add("noshow");
            });

            let tipo = classnameCat.slice(4);
            let prodMostrar = document.querySelectorAll(".prod."+tipo);
            prodMostrar.forEach(p => {
                p.classList.remove("noshow");
            });

            let navMostrar = document.querySelector(".nav"+tipo);
            navMostrar.classList.remove("noshow")
        };
    });
});

/* Carrito */
let carrito = [];

function eliminarVisualCarrito() {
    let contenedor = document.querySelector(".main");
    let carrito = document.querySelector(".carrito");
    contenedor.removeChild(carrito);
}

function actualizarVisualCarrito(vacio){
    if (vacio){
        let documentFragment = document.createDocumentFragment();

        let div = document.createElement("DIV");
        div.classList.add("carrito");
        div.innerHTML = "<b>Carrito</b>";

        let cantidad = document.createElement("DIV");
        cantidad.classList.add("cantidad");
        cantidad.innerHTML = "" + carrito.length + "";

        div.appendChild(cantidad);
        documentFragment.appendChild(div);
        contenedor.appendChild(documentFragment);
        
        let btnCarritoVer = document.querySelector(".carrito");
            btnCarritoVer.addEventListener("click", ()=> {
                verCarrito();
        });
    };
    let c = document.querySelector(".cantidad");
    c.innerHTML =  "" + carrito.length + "";
};

function agregarAlCarrito(obj){
    let vacio = false;
    if (carrito.length < 1){
        vacio = true;
    }
    carrito.push(obj);
    actualizarVisualCarrito(vacio);
};

function volverCarrito() {
    let listaCarrito = document.querySelector(".listaCarrito");
    let carritoVisual = document.querySelector(".carritoVisual");
    let claseProd = document.querySelectorAll(".prod");
    let contenedorCat = document.querySelector(".aside");
    let foot = document.querySelector(".footer");

    carritoVisual.classList.add("noshow");
    claseProd.forEach(t => {
        t.classList.remove("noshow");
    });
    contenedorCat.classList.remove("noshow");
    foot.classList.remove("noshow");
}

let seleccionEstilo = null;

function cambiarSeleccion() {
    let claseInfo = document.querySelector(".info");
    if (claseInfo) seleccionEstilo = document.getElementById("mySelect").value;
    return seleccionEstilo;
}

function crearVisualCarrito() {
    //inicializo
    let contenedor = document.querySelector(".main");
    let claseInfo = document.querySelector(".info");
    let botones = document.querySelector(".contenedorBtn");
    let claseProd = document.querySelectorAll(".prod");
    let myNode = document.querySelector(".contenido");
    let claseCarrito = document.querySelector(".carrito");
    let carritoVisual = document.querySelector(".carritoVisual");
    let contenedorCat = document.querySelector(".aside");
    let foot = document.querySelector(".footer");

    let listaCarrito = document.querySelector(".listaCarrito");
    
    let total = 0;
    let txtWsp = "";

    for (let i in carrito) {
        total += carrito[i].precio;

        let documentFragment = document.createDocumentFragment();
        let linea = document.createElement("LI");
        linea.classList.add("lineaCarrito");
        linea.classList.add("productoCarrito");
        linea.setAttribute("id", "l" + i + "");
        let token = carrito[i].mostrar();
        linea.innerHTML = "<b>"+ carrito[i].modelo +"</b>" + "<b>" + carrito[i].estilos + "</b>" + token[2] + '<a class="quitar" id="q' + i + '"><b>Quitar</b></a>';
        documentFragment.appendChild(linea);
        listaCarrito.appendChild(documentFragment);

        let quitar = document.getElementById("q" + i + "");

        quitar.addEventListener("click", q=> {
            let id = quitar.getAttribute("id").slice(1);
            carrito.splice(id, 1);
            productoCarrito.forEach(t=> {
                listaCarrito.removeChild(t);
            });

            let lineaFinal = document.querySelector(".final");
            listaCarrito.removeChild(lineaFinal);
            let botones = document.querySelector(".contenedorBtnCarrito");
            listaCarrito.removeChild(botones);

            if (carrito.length == 0) {
                eliminarVisualCarrito();
                volverCarrito();
            }
            else crearVisualCarrito();
        });   

        txtWsp += "%0D%0AModelo:%20"+ carrito[i].modelo + "%20Estilo:%20"+ carrito[i].estilos + "%20Precio:%20$"+ carrito[i].precio;
    };

    let documentFragment = document.createDocumentFragment();
    let linea = document.createElement("LI");
    linea.classList.add("lineaCarrito");
    linea.classList.add("final");
    linea.innerHTML = '<b class="total">TOTAL</b>' + "<p></p>" + "<b>$" + total + "</b>" + "<p></p>";
    documentFragment.appendChild(linea);
    listaCarrito.appendChild(documentFragment);

    //botones
    let fragmento = document.createDocumentFragment();
    let contenedorBtnCarrito = document.createElement("DIV");
    contenedorBtnCarrito.classList.add("contenedorBtnCarrito");

    let btnVolverCarrito = document.createElement("A");
    let b10 = document.createElement("B");
    btnVolverCarrito.classList.add("btnVolverCarrito");
    b10.innerHTML = "Volver";
    btnVolverCarrito.appendChild(b10);

    let contenedorConfirmar = document.createElement("DIV");
    contenedorConfirmar.classList.add("contenedorConfirmar");
    contenedorConfirmar.innerHTML = '<a class="btnConfirmar" href="https://api.whatsapp.com/send?phone=5493517559057&text=Pedido:' + txtWsp +'%0D%0ATOTAL:%20' + total + '"><b>Confirmar</b></a>';

    contenedorBtnCarrito.appendChild(btnVolverCarrito);
    contenedorBtnCarrito.appendChild(contenedorConfirmar);
    fragmento.appendChild(contenedorBtnCarrito);
    listaCarrito.appendChild(fragmento);

    let productoCarrito = document.querySelectorAll(".productoCarrito");
    let final = document.querySelector(".final");
    let contenedorBtn = document.querySelector(".contenedorBtnCarrito");

    //funcionalidad de los botones
    btnVolverCarrito.addEventListener("click", ()=> {
        productoCarrito.forEach(t=> {
            listaCarrito.removeChild(t);
        });
        listaCarrito.removeChild(final);
        listaCarrito.removeChild(contenedorBtn);
        claseCarrito.classList.remove("noshow");
        volverCarrito();
    });
}

function verCarrito() {

    //inicializo
    let contenedor = document.querySelector(".main");
    let claseInfo = document.querySelector(".info");
    let botones = document.querySelector(".contenedorBtn");
    let claseProd = document.querySelectorAll(".prod");
    let myNode = document.querySelector(".contenido");
    let claseCarrito = document.querySelector(".carrito");
    let carritoVisual = document.querySelector(".carritoVisual");
    let contenedorCat = document.querySelector(".aside");
    let listaCarrito = document.querySelector(".listaCarrito");
    let lineaFinal = document.querySelector(".final");

    //lista carrito
    if (claseInfo) contenedor.removeChild(claseInfo);
    if (botones) contenedor.removeChild(botones);
    contenedorCat.classList.add("noshow");
    claseProd.forEach(el => {
        el.classList.add("noshow");
    });

    claseCarrito.classList.add("noshow");
    carritoVisual.classList.remove("noshow");

    //quito el footer
    let foot = document.querySelector(".footer");
    foot.classList.add("noshow");

    crearVisualCarrito();
};

/* Abrir info de un prod */
let claseProd = document.querySelectorAll(".prod");

claseProd.forEach(el => {
    el.addEventListener("click", e=> {
        let contenedor = document.querySelector(".main");
        let id = e.currentTarget.getAttribute("id");
        let productoSeleccionado = null;

        claseProd.forEach(t => {
            t.classList.add("noshow");
        });
        contenedorCat.classList.add("noshow");
        nav.classList.add("noshow");
        myNode.classList.add("alternativo");

        //let contenedorGrande = document.querySelector(".contenido");
        for (c of categorias) {
            for (p of c.productos) {
                if (p.id == id) {
                    let documentFragment = document.createDocumentFragment();

                    let div = document.createElement("DIV");
                    div.classList.add("info");

                    let informacion = document.createElement("DIV");
                    informacion.classList.add("informacionEscrita")

                    let estilos = document.createElement("DIV");
                    estilos.classList.add("estilos");

                    let b20 = document.createElement("B");
                    b20.innerHTML = "Estilos: ";

                    let form = document.createElement("FORM");
                    form.classList.add("formCombo");

                    let select = document.createElement("SELECT");
                    select.classList.add("selectCombo");
                    select.setAttribute("id", "mySelect");
                    select.setAttribute("onchange", "cambiarSeleccion()");

                    let optionPpal = document.createElement("OPTION");
                    optionPpal.innerHTML = "Seleccione";
                    optionPpal.setAttribute("value", "Seleccione");
                    select.appendChild(optionPpal);

                    for (e of p.estilos) {
                        let option = document.createElement("OPTION");
                        option.innerHTML = e;
                        option.setAttribute("value", e);
                        select.appendChild(option);
                    };

                    let token = p.mostrar();
                    productoSeleccionado = p;
                    div.innerHTML = token[0];
                    informacion.innerHTML = token[1] + token[2];

                    form.appendChild(select);
                    estilos.appendChild(b20);
                    estilos.appendChild(form);
                    informacion.appendChild(estilos);
                    div.appendChild(informacion);
                    documentFragment.appendChild(div);
                    contenedor.appendChild(documentFragment);

                };
            };
        };

        let divBotones = document.createElement("DIV");
        divBotones.classList.add("contenedorBtn");
        documentFragment.appendChild(divBotones);

        let btn = document.createElement("A");
        let b1 = document.createElement("B");
        btn.classList.add("btnVolver");
        b1.innerHTML = "Volver";

        let carrito = document.createElement("A");
        let b2 = document.createElement("B");
        carrito.classList.add("btnCarrito");
        b2.innerHTML = "Agregar al carrito";

        btn.appendChild(b1);
        carrito.appendChild(b2);
        divBotones.appendChild(carrito);
        divBotones.appendChild(btn);
        contenedor.appendChild(documentFragment);

        let boton = document.querySelector(".btnVolver");
        let btnAgregar = document.querySelector(".btnCarrito");
        let claseInfo = document.querySelector(".info");
        let botones = document.querySelector(".contenedorBtn");

        boton.addEventListener("click", ()=> {
            claseProd.forEach(t => {
                t.classList.remove("noshow");
            });
            contenedorCat.classList.remove("noshow");
            contenedor.removeChild(claseInfo);
            contenedor.removeChild(botones);
        });

        btnAgregar.addEventListener("click", ()=> {
            productoSeleccionado.estilos = [cambiarSeleccion()];
            if (cambiarSeleccion() == "Seleccione") {
                window.alert("seleccione un estilo");
                return
            }
            agregarAlCarrito(productoSeleccionado);
        });

        cambiarSeleccion();
    });
});

