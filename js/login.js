




document.getElementById("validar").addEventListener("submit", function(a){
    a.preventDefault()
    const usu = document.getElementById("email").value
    localStorage.setItem("usuario",usu)
    window.location.href="Inicio.html"
    
})


function jwtDecode(res) {
    let user = decode(res.credential)
    localStorage.setItem("usuario", user.email)
    window.location.href = "inicio.html"
}
function decode(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};