




document.getElementById("validar").addEventListener("submit", function(a){
    a.preventDefault()
    const usu = document.getElementById("email").value
    localStorage.setItem("usuario",usu)
    window.location.href="Inicio.html"
    
})


