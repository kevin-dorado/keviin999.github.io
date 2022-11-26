let info


document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL + localStorage.getItem("catIDp") + ".json").then(function (resultObj) {
    if (resultObj.status === "ok") {
      info = resultObj.data
      relates = info.relatedProducts
      showProductInfo()

    }
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("catIDp") + ".json").then(function (resultObj) {
    if (resultObj.status === "ok") {
      comentario = resultObj.data
      showComments()

    }

  });

})


function showComments() {
  let comentarioshow = ""

  for (let coment of comentario) {

    comentarioshow += `
  
  <div class="media mt-2 " style="padding-top 20px;">
    <div class="media-body border-top border-2 border-dark" style="background-color:#f1f1f1;">
        <p class="nombre p-2" style="margin-bottom:1; font-size:20px;">${coment.user} :<span style="font-size:12px; color: #464646; margin-left:10px;">${coment.dateTime}</span></p>
        <p class="comentario p-2">   ${coment.description} </p>
        <p class="text-end" style="font-size:15px; color: #464646;">Puntuacion : ${coment.score} estrellas
        </p>
    </div>
  </div>


  `
  }
  document.getElementById("coments").innerHTML = comentarioshow;


}

function showProductInfo() {
  let htmlContentToAppend = "";
  let escribir = ""
  let relacionados = ""


  htmlContentToAppend += `
  <hr class="featurette-divider">
  <div class="row p-4">
    <div class="col-md-5  border-start border-1 border-dark" style="background-color:#f1f1f1;"" >
        <div class="">  
          <h2 class="featurette-heading fw-normal pt-3 ">${info.name}</h2>
          <p class="pt-1">${info.description}</p>
        </div>
        <div class="row row-cols-lg " style="">
            <p class="dark " style=" font-size:25px;">Precio: ${info.currency} ${info.cost}</p>
          
          <div class="col-md-12  text-center pt-4 ">
            <label class"form-label text-start ">Seleccione cantidad</label>
              <div class="mx-5">
                <input class="text-start form-control form-control-md" type="number" placeholder="ingrese cantidad" style="" value=1 id="cantidad" min="1"> </input>
              </div>
          </div>
          <div class="col-md-12 pt-4 ">
            <button type="submit" onclick="carrito()" class="btn btn-success btn-md form-control-bg
            col-md-12"  id="añadir">añadir al carrito</button>
          </div>
        </div>
    </div>
    <div class="col-md-7 bg-alert  pl-1 ">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active arrounded">
            <img   src="${info.images[0]}" class="d-block w-100 " alt="...">
          </div>
          <div class="carousel-item">
            <img src="${info.images[1]}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${info.images[2]}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${info.images[3]}" class="d-block w-100" alt="...">
          </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>  
  <hr class="featurette-divider">
  
    `
  document.getElementById("info-p").innerHTML = htmlContentToAppend;

  for (relate of relates) {
    relacionados += `
      <div class="mx-auto">
        <div class"col "  onclick="product_ID(${relate.id})"  role="button">
          <div class="card" style="width: 18rem;">
            <img src="${relate.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">${relate.name}</p>
            </div>
          </div>
        </div>
      </div>
      `
  }
  document.getElementById("rela-p").innerHTML = relacionados;



  escribir += `
  <hr class="featurette-divider">
  <form onsubmit="borrar(event)">
    <div class="form-group">
      <label style="font-size:20px;">Danos tu opinion </label>
    
        <input type="text" class="form-control form-control-lg rounded-0" style="margin-top:20px;" id="comentarioo" name="texto" placeholder="Ingrese su comentario" required>
    </div>
    <label style="margin-top:20px;font-size:20px;">Valora el comentario </label>
    <div class="mt-3 col-md-4">
      <select class=" form-select form-control-lg mb-3" style="widht:120px; height:30px;" id="inputGroupSelect01" required>
        <option selected>Seleccione</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
    <div class="mt-3 ">
      <button type="submit" class="btn btn-success btn-lg " onclick="escribircoment()" style="" id="btncoment">Enviar</button>
    </div>
  </form>
`
  document.getElementById("comentar").innerHTML = escribir;
}

function carrito() {
  let cantidad = parseInt(document.getElementById("cantidad").value)

  let newpcart = {
    id: info.id,
    name: info.name,
    image: info.images[0],
    currency: info.currency,
    cost: info.cost,
    cantidad: parseInt(cantidad)
  }



  if (localStorage.getItem("prodcarrito")) {
    let licarrito = JSON.parse(localStorage.getItem("prodcarrito"))
    let found = licarrito.find(({ id }) => id === info.id)
    if (found === undefined) {
      licarrito.push(newpcart)

    } else {
      found.cantidad += newpcart.cantidad
    }
    localStorage.setItem("prodcarrito", JSON.stringify(licarrito))
  } else {
    let licarrito = []
    licarrito.push(newpcart)
    localStorage.setItem("prodcarrito", JSON.stringify(licarrito))
  }

}

function borrar(a) {
  a.preventDefault()
  document.getElementById("comentarioo").value = ""
  document.getElementById("inputGroupSelect01").value = undefined

}

function product_ID(id) {
  localStorage.setItem("catIDp", id);
  window.location.href = "product-info.html"
}

function escribircoment() {
  let redactado = document.getElementById("comentarioo").value
  let puntua = document.getElementById("inputGroupSelect01").value
  let usuario = localStorage.getItem("usuario")
  let h = new Date()
  let dia = (h.getDate())
  let mes = (h.getMonth() + 1)
  let año = (h.getFullYear())
  let hora = (h.getHours())
  let minutos = (h.getMinutes())
  let segundos = (h.getSeconds())



  if (redactado != "" && puntua != "Seleccione") {
    let mostrar = ""
    mostrar += `  <div class="media mt-2 " style="padding-top 20px;">
    <div class="media-body border-top border-2 border-dark" style="background-color:#f1f1f1;">
        <p class="nombre p-2" style="margin-bottom:1; font-size:20px;">${usuario} :<span style="font-size:12px; color: #464646; margin-left:10px;">${año}-${mes}-${dia}  ${hora}:${minutos}:${segundos} </span></p>
        <p class="comentario p-2">   ${redactado} </p>
        <p class="text-end" style="font-size:15px; color: #464646;">Puntuacion : ${puntua} estrellas
        </p>
    </div>
    </div>`

    document.getElementById("coments").innerHTML += mostrar;
  }

}