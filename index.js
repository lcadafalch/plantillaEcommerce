
let arrCategorias = [];

let arrProductos = [];

let arrCarrito = [];

// FUNCIÓN HTTP GET PRINCIPAL

function httpGet(theUrl, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(JSON.parse(xmlHttp.responseText));
        } else if (xmlHttp.readyState == 4) {
            error(xmlHttp.status);
        }
    }
    xmlHttp.open("GET", theUrl);
    xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xmlHttp.send();
};
 
// CALLBACK DE PRODUCTOS
 function getProductos(objProductos,categoria_id) {
     console.log(objProductos);

    
     arrProductos[categoria_id] = objProductos.products;


 }
//CALLBACK DE CATEGORIAS

function getCategorias(objCategorias){

     let categories = objCategorias.categories;
    for (let i = 0; i < categories.length; i++) {
        let categoria = categories[i];

        arrProductos[categoria.id] = []
        arrCategorias.push(categoria);
        httpGet("https://cors-anywhere.herokuapp.com/http://prana-solutions.com/neoland/ecommerce/?endpoint=products&category_id="+categoria.id, 
        function(response){
            getProductos(response,categoria.id)
        }
        )
    } 

   // console.log(arrCategorias);

    
}


//FUNCION GET DE LA PETICIÓN HTTTP

function getHome(){
    // let  = document.querySelectorAll(".apartadoHome")[0];
    // apartadoHome.innerHTML = 

     httpGet("https://cors-anywhere.herokuapp.com/http://prana-solutions.com/neoland/ecommerce/?endpoint=categories", getCategorias)
}

getHome()

