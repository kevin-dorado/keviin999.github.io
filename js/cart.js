let a = JSON.parse(localStorage.getItem("prodcarrito"))
let subtotal


document.addEventListener("DOMContentLoaded", function (e) {
    if (a) {
        showCart(a)
        subtotalprod()
    } else {
        showCartempty()
    }


})
function showCartempty() {
    let alerta = ""

    alerta += `
    <div class="alert alert-primary fade show mt-5" role="alert">
    
  
        <h4 class="alert-heading">¡Aun no has comprado nada!</h4>
        <p>vuelve a nuestra pagina a buscar tu producto ideal a un buen precio</p>
        <hr>
        <p class="mb-0">Siempre que lo necesites, lo encontraras </p>
    </div>
    `
    document.getElementById("alerta").innerHTML = alerta;
}

function showCart(a) {
    let carritoo = ""
    let envio = ""
    let costo = ""
    let pago = ""


    carritoo += `
        
        <div class="media-body ">
            <table class="table table-success table-striped">
                <thead>
                    <tr>
                            <th><imagen</th>
                            <th>Nombre </th>
                            <th>Costo</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Eliminar</th>
                    </tr>
                </thead>`
    for (let prod of a) {

        carritoo += `    <tr>
                    <td><img  class="rounded"  width="100" height ="60" src="${prod.image}"></td>
                    <td> <p class="pt-3">  ${prod.name} </p></td>
                    <td><p class="pt-3">  ${prod.currency}${prod.cost} </p></td>
                    
                    <td><div class="pt-2" style="width:70px; height:30px; ">
                        <input type="number" class="form-control "  min="1" id="cantidad-${prod.id}" onclick="subtotalprod()" value="1"> 
                    </div> </td>
                    
                    <td class="pt-4" id="subtotal-${prod.id}"> ${prod.cost}</td>
                    <td class="pt-3"><button  onclick="borrarArt(${prod.id})" type="button" id="btneliminar" class="btn btn-outline-danger "><i class="bi bi-trash "></i></button></td>
                </tr>
        `}
    carritoo += `    </table>
            
        </div>
        `





    document.getElementById("carritoo").innerHTML = carritoo;

    for (let i = 0; i < a.length; i++) {
        const prod = a[i]
        document.getElementById(`cantidad-${prod.id}`).addEventListener("input", function cant(event) {
            let costo = parseInt(prod.cost)
            let cantidad = document.getElementById(`cantidad-${prod.id}`).value
            subtotal = costo * cantidad
            document.getElementById(`subtotal-${prod.id}`).innerHTML = subtotal;

        })
    }
    envio += `
    <label style="font-size:20px;">Tipo de envio</label>

<form onsubmit="borrar(event)" class="needs-validation" id="formenv"  novalidate>
    <div class="">
        <input class="form-check-input" type="radio" id="r3" name="envio" onclick="subtotalprod()" value="option1">
        <label class="form-check-label" for="inlineRadio1">Premium 2 a 5 dias(15%)</label>
    </div>
    <div class="">
        <input class="form-check-input" type="radio" id="r2" name="envio" onclick="subtotalprod()" value="option2" >
        <label class="form-check-label" for="inlineRadio2">Express 5 a 8 dias (7%)</label>
    </div>
    <div class="">
        <input class="form-check-input" type="radio" id="r1" name="envio" onclick="subtotalprod()" value="option3" checked>
        <label class="form-check-label" for="inlineRadio3">Standard 12 a 15 dias (5%)</label>
    </div>



    <div class="row">
        <div class=" col-md-6">
            <label class="pt-2">Calle</label>
            <input type="text" class="form-control"  id="validationTooltip02" placeholder="Republica" required>
            <div class="invalid-feedback">
            Por favor seleccione una calle.
            </div>
        </div>
        <div class=" col-md-6">
            <label class="pt-2">Numero Postal</label>
            <input type="number" class="form-control" id="Numero" min="1" placeholder="11300" required>
            <div class="invalid-feedback">
            Por favor seleccione un numero postal
            </div>
        </div>
        
    </div>
    <div class="form-group">
        <label class="pt-2">Esquina</label>
        <input type="text" class="form-control" id="Direccion" placeholder="Varela" required>
        <div class="invalid-feedback">
            Por favor seleccione un numero postal
            </div>
    </div>

   
    

</form>
`

    'use strict'



    document.getElementById("envio").innerHTML = envio;
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            // if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            //  }

            form.classList.add('was-validated')
        }, false)
    })

    costo += `
    
    <div class="pt-4">
        <div class="card mx-auto" style="width: 90%; ">
        <div class="card-header card-title bg-transparent border-secondary text-center "><h4 class="my-0">Costo</h4>
        </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="row ">  
                    <p class="col my-0">Subtotal :<p class="col my-0 text-end" style="font-size:20px; color: #464646; " id="totalprod"></p> </p>
                    </div> 
                <p class="my-0 text-secondary">Costo unitario del producto por cantidad</p></li>

                <li class="list-group-item">
                    <div class="row">  <p class="col my-0">Costo de envio :<p class="col my-0 text-end" style="font-size:20px; color: #464646; " id="enviop"></p> </p>
                    </div> 
                <p class="my-0 text-secondary">Según el tipo de envio</p></li>


                <li class="list-group-item">
                    <div class="row">  
                    <p class="col my-0">Total($) :<p class="col text-end my-0" style="font-size:20px; color: #464646; "id="totalallp"></p> </p>
                    </div> 
                </li>

                
            </ul>
        </div>
    </div>
    `
    document.getElementById("costo").innerHTML = costo;

    pago += ` 
    <div class="mx-auto text-center pt-2">
        <label class="mx-auto" style="font-size:20px;">Metodo de Pago</label>
        <p class"">No se ha seleccionado --> <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Metodo de pago
        </button>
        <div class="invalid-feedback">
            Por favor seleccione un metodo de pago
        </div>
        </p>
      
    </div>
    
        
    

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Forma de pago</h1>
      </div>
      <div class="modal-body">
        <form class="row g-3" class="needs-validation" id="formmodal"  novalidate>
            <div class="">
                <input class="form-check-input" type="radio" id="tarjeta" name="tipopago" value="option1"  >
                <label class="form-check-label" for="inlineRadio2">Tarjeta de crédito</label>
                <div class="invalid-feedback">
                    Por favor seleccione un metodo de pago
                </div>
            </div>
            <hr class="featurette-divider">
        
                <div class="col-md-6">
                    <label for="validationDefault02" class="form-label">Número de tarjeta</label>
                    <input type="text" class="form-control " id="numtarj" required>
                    <div class="invalid-feedback">
                        Por favor introduzca el número de su tarjeta
                    </div>
                </div>
                <div class="col-sm-5">
                    <label for="validationDefault02" class="form-label">Código de seg.</label>
                    <input type="text" class="form-control " id="codseg" required>
                    <div class="invalid-feedback">
                        Por favor introduzca el código de seguridad
                    </div>
                </div>
            
                <div class="col-md-6">
                    <label for="validationDefault02" class="form-label">Vencimiento (MM/AA)</label>
                    <input type="text" class="form-control" id="vence" required>
                    <div class="invalid-feedback">
                        Por favor introduzca la fecha de vencimiento de su tarjeta
                    </div>
                </div>   
            

            <div class="pt-4">
                <input class="form-check-input" type="radio" id="banco" name="tipopago" value="option2" >
                <label class="form-check-label" for="inlineRadio2">Transferencia bancaria</label>
                <div class="invalid-feedback">
                    Por favor seleccione un metodo de pago
                </div>
            </div>
            <hr class="featurette-divider">
            <div class="col-md-6">
                <label for="validationDefault02" class="form-label">Número de cuenta</label>
                <input type="text" class="form-control" id="numcuenta" required>
                <div class="invalid-feedback">
                    Por favor introduzca la fecha de vencimiento de su tarjeta
                </div>
            </div>   
        </form>   
      </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" id="modalboton" >Listo</button>
      </div>
    </div>
  </div>
</div>

<div class="d-grid gap-2 col-6 mx-auto pt-4">
<button type="submit" class="btn btn-success text-center"  style="" id="comprar">Comprar</button>
</div>

    `

    document.getElementById("pago").innerHTML = pago;


    //input credito
    let numtarj = document.getElementById("numtarj")
    let codseg = document.getElementById("codseg")
    let vence = document.getElementById("vence")
    //input banco
    let numcuenta = document.getElementById("numcuenta")

    //radio buttons
    tarjeta.addEventListener("click", function () {
        numcuenta.setAttribute("disabled", "true");
        numtarj.removeAttribute("disabled");
        codseg.removeAttribute("disabled");
        vence.removeAttribute("disabled");
    })

    //radio buttons
    banco.addEventListener("click", function () {
        numtarj.setAttribute("disabled", "true");
        codseg.setAttribute("disabled", "true");
        vence.setAttribute("disabled", "true");
        numcuenta.removeAttribute("disabled");
    })
    //boton comprar
    let comprar = document.getElementById("comprar")
    //form envio
    let formenv = document.getElementById("formenv")
    // form modal
    let formmodal = document.getElementById("formmodal")
    // boton modal
    let modalboton = document.getElementById("modalboton")

    modalboton.addEventListener("click", function () {
        formmodal.checkValidity()


        formmodal.classList.add("was-validated")



    })

    comprar.addEventListener("click", function () {

        if (formmodal.checkValidity() && formenv.checkValidity()) {
            borrar()
            setTimeout(() => {
                window.location.href = "cart.html"
            }, "3000")
            /*  setTimeout(function () {
                    window.location.href="cart.html"
                },5000) */



        }
        formenv.classList.add("was-validated")


    })




}




function borrar() {
    let alerta = ""

    alerta += `
    <div class="alert alert-success fade show" role="alert">
        <h4 class="alert-heading">¡Su compra se ha realizado con éxito!</h4>
        <p>Oh, sí, leísto con éxito este importante mensaje de alerta. Este texto de ejemplo se extenderá un poco más para que puedas ver cómo funciona el espaciado dentro de una alerta con este tipo de contenido.</p>
        <hr>
        <p class="mb-0">Siempre que lo necesites, asegúrate de usar utilidades de margen para mantener las cosas ordenadas y ordenadas.</p>
    </div>
    `
    document.getElementById("alerta").innerHTML = alerta;

    localStorage.removeItem("prodcarrito")

}

function subtotalprod() {
    let totalp = 0
    let envio = 0
    let r1 = document.getElementById("r1")
    let r2 = document.getElementById("r2")
    let r3 = document.getElementById("r3")
    for (const info of a) {
        let costo = parseInt(info.cost)

        let cantidadp = document.getElementById(`cantidad-${info.id}`).value

        let subtotalp = parseInt(costo * cantidadp)

        totalp = parseInt(subtotalp + totalp)

    }

    if (r1.checked) {
        envio = Math.round(totalp * (5 / 100))
    } else if (r2.checked) {
        envio = Math.round(totalp * (7 / 100))
    } else if (r3.checked) {
        envio = Math.round(totalp * (15 / 100))
    }

    let totalall = Math.round(totalp + envio)

    document.getElementById("totalprod").innerHTML = "$" + totalp;
    document.getElementById("enviop").innerHTML = "$" + envio;
    document.getElementById("totalallp").innerHTML = "$" + totalall;

}



function borrarArt(id) {
eliminarArt(id)
}
const eliminarArt = (id) => {

    const foundId = a.find(element => element.id === id)
    a = a.filter((aId) => {
        return aId !== foundId

    })
    localStorage.setItem("prodcarrito",JSON.stringify(a|) )
    showCart(a)
}
