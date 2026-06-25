//agarro el id del personaje de la url
let url= window.location.href;
let partes=url.split("id=");
let id=partes[1];

//busco el personaje en la api con el id
fetch("https://rickandmortyapi.com/api/character/" + id)
.then(res=> res.json())
.then(personaje =>{

    let color="";
    if(personaje.status==="Alive"){
      color="green";
    }else if(personaje.status==="Dead"){
     color="red";
    }else{
      color="gray";
    }

let detalle=document.getElementById("detalle");

let card= document.createElement("div");
card.classList.add("detalle-card");

let img= document.createElement("img");
img.src= personaje.image;
img.alt= personaje.name;

let info= document.createElement("div");
info.classList.add("detalle-info");

let nombre= document.createElement("h2");
nombre.textContent= personaje.name;

let estado= document.createElement("p");
estado.classList.add("estado-personaje");
estado.classList.add(personaje.status.toLowerCase());
estado.textContent= personaje.status;

let especie= document.createElement("p");
especie.textContent= "Especie: " + personaje.species;

let genero= document.createElement("p");
genero.textContent= "Genero: " + personaje.gender;

let origen= document.createElement("p");
origen.textContent= "Origen: " + personaje.origin.name;

let ubicacion= document.createElement("p");
ubicacion.textContent= "Ubicacion: " + personaje.location.name;

let primerEp= document.createElement("p");
primerEp.textContent= "First seen in: ";

fetch(personaje.episode[0])
.then(res=> res.json())
.then(ep=>{
  primerEp.textContent= "Primera aparicion: " + ep.name;
});

let episodios= document.createElement("p");
episodios.textContent= "Episodios: " + personaje.episode.length;

//juntos las cosas
info.appendChild(nombre);
info.appendChild(estado);
info.appendChild(especie);
info.appendChild(genero);
info.appendChild(origen);
info.appendChild(ubicacion);
info.appendChild(primerEp);
info.appendChild(episodios);
card.appendChild(img);
card.appendChild(info);
detalle.appendChild(card);
})

.catch(error=>{
    document.getElementById("error").textContent= "Error al cargar el personaje: ";
    console.log("Error: ", error);
})
