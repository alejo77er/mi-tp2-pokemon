const contenedor = document.getElementById("favoritos");
const error = document.getElementById("error");

function obtenerFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}

async function cargarFavoritos() {
  let ids = obtenerFavoritos();

  if (ids.length === 0) {
    error.textContent = "No tenés personajes favoritos todavía.";
    return;
  }

  error.textContent = "";
  contenedor.innerHTML = "";

//recorro las ids para econtrar el personaje en la api
ids.forEach(async id=>{
  try{
let res=await fetch("https://rickandmortyapi.com/api/character/" + id);
let personaje= await res.json();

let tarjeta= document.createElement("div");
tarjeta.classList.add("tarjeta");

let img=document.createElement("img");
img.src= personaje.image;
img.alt= personaje.name;

let info=document.createElement("div");
info.classList.add("info");

let nombre=document.createElement("h2");
nombre.textContent=personaje.name;

let estado= document.createElement("p");
estado.classList.add("estado-personaje");
estado.classList.add(personaje.status.toLowerCase());
estado.textContent= personaje.status;

 info.appendChild(nombre);
 info.appendChild(estado);
 tarjeta.appendChild(img);
 tarjeta.appendChild(info);

 tarjeta.addEventListener("click", ()=>{
  window.location.href= "/detalles.html?id=" + personaje.id;
 });

 contenedor.appendChild(tarjeta);

} catch(e){
 console.log("Error: ", e);
}
});
}
cargarFavoritos();
