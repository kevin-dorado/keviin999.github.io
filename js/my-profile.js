document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault()
  let email = localStorage.getItem("usuario")
  let name1 = localStorage.getItem("nombre1")
  let name2 = localStorage.getItem("nombre2")
  let surname1 = localStorage.getItem("apellido1")
  let surname2 = localStorage.getItem("apellido2")
  let telef = localStorage.getItem("telefono")

  document.getElementById("correo").value = email
  document.getElementById("nombre1").value = name1
  document.getElementById("nombre2").value = name2
  document.getElementById("apellido1").value = surname1
  document.getElementById("apellido2").value = surname2
  document.getElementById("telefono").value = telef


  //Cargar foto
  let url = localStorage.getItem("fotoperfil")
  if (url) {
    document.querySelector("#imgperfil").setAttribute("src", url)
  }

  //mostrar nombre y apellido
  if (name1 != "" && name1 != undefined) {
    document.getElementById("seename").innerHTML = name1
  }

  if (surname1 != "" && surname1 != undefined) {
    document.getElementById("seesurname").innerHTML = surname1
  }

})

let formperfil = document.getElementById("formperfil")
formperfil.addEventListener("submit", function (a) {


  let nombre1 = document.getElementById("nombre1").value
  let nombre2 = document.getElementById("nombre2").value
  let apellido1 = document.getElementById("apellido1").value
  let apellido2 = document.getElementById("apellido2").value

  let telefono = document.getElementById("telefono").value

  if (nombre1 != "" && apellido1 != "") {
    localStorage.setItem("nombre1", nombre1)
    localStorage.setItem("nombre2", nombre2)
    localStorage.setItem("apellido1", apellido1)
    localStorage.setItem("apellido2", apellido2)
    localStorage.setItem("telefono", telefono)

    // Subir foto al local storage
    let fotoperfil = document.getElementById("fotoperfil")
    const fr = new FileReader()
    fr.readAsDataURL(fotoperfil.files[0])
    fr.addEventListener("load", () => {
      const url = fr.result
      localStorage.setItem("fotoperfil", url)
    })

  }








})



const forms = document.querySelectorAll('.needs-validation')
// Loop over them and prevent submission
Array.from(forms).forEach(form => {
  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  }, false)
}) 