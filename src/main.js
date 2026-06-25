//base de la api
async function cargarPersonajes() {
  try{
    const res1= await fetch("https://rickandmortyapi.com/api/character?page=1");
    const data1= await res1.json();

    const res2= await fetch("https://rickandmortyapi.com/api/character?page=2");
    const data2= await res2.json();

    const res3= await fetch ("https://rickandmortyapi.com/api/character?page=3");
    const data3= await res3.json();
  
    //guardo todos los perosnajes
    let personajes=data1.results.concat(data2.results).concat(data3.results);
    
    mostrarPersonajes(personajes);


document.getElementById("buscador").addEventListener("input",function(){
  filtrar(personajes);
});


document.getElementById("filtroEstado").addEventListener("change",function(){
  filtrar(personajes);
});

document.getElementById("ordenar").addEventListener("change",()=>{
  filtrar(personajes);
});

} catch(error){
  //muestro el erroe en pantalla
  document.getElementById("error").textContent="Error al cargar los personajes";
  console.log("Error",error);
}
}

cargarPersonajes();

function obtenerFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function guardarFavoritos(favoritos) {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function alternarFavorito(id) {
  let favoritos = obtenerFavoritos();

  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(fav => fav !== id);
  } else {
    favoritos.push(id);
  }

  guardarFavoritos(favoritos);
  return favoritos;
}

//funcion que muestra los persoanjes en tarjetas
function mostrarPersonajes(lista){
  let contenedor=document.getElementById("contenedor");
  contenedor.innerHTML="";//limpio el contenedor

  //limpio el mensaje de error siempre
  document.getElementById("error").textContent="";
 

  if(lista.length===0){
    document.getElementById("error").textContent="No se encontraron personajes";
    return;
  }

  //recorro cada personaje y creo la tarjeta
  lista.forEach(personaje=>{
    let color="";
    if(personaje.status==="Alive"){
      color="green";
    }else if(personaje.status==="Dead"){
     color="red"; 
    }else{
      color="gray";
    }

    let favoritos = obtenerFavoritos();
    let esFavorito = favoritos.includes(personaje.id);

    //creo los elemtnos de la tarjeta
    let tarjeta=document.createElement("div");
    tarjeta.classList.add("tarjeta");

    let img=document.createElement("img");
    img.src= personaje.image;
    img.alt= personaje.name;

     let botonFavorito=document.createElement("button");
    botonFavorito.classList.add("boton-favorito");
    if(esFavorito){
      botonFavorito.textContent="♥";
      botonFavorito.classList.add("activo");
    }else{
      botonFavorito.textContent ="♡";
    }

    botonFavorito.addEventListener("click", (e)=>{
      e.stopPropagation();
      let favoritosActuales = alternarFavorito(personaje.id);
      botonFavorito.textContent = favoritosActuales.includes(personaje.id) ? "♥" : "♡";
      botonFavorito.classList.toggle("activo", favoritosActuales.includes(personaje.id));
    });

  let info = document.createElement("div");
    info.classList.add("info");

    let nombre = document.createElement("h2");
    nombre.textContent = personaje.name;


    let estado = document.createElement("p");
    estado.classList.add("estado-personaje");
    estado.classList.add(personaje.status.toLowerCase());
    estado.textContent=personaje.status;

    let especie= document.createElement("p");
    especie.classList.add("valor-info");
    especie.textContent="Species: " + personaje.species;

    let labelUbicacion= document.createElement("p");
    labelUbicacion.classList.add("label-info");
    labelUbicacion.textContent="Last known location:";

    let ubicacion= document.createElement("p");
    ubicacion.classList.add("valor-info");
    ubicacion.textContent= personaje.location.name;


    //junto todo dentro de la tarjeta
    info.appendChild(nombre);
    info.appendChild(estado);
    info.appendChild(especie);
    info.appendChild(labelUbicacion);
    info.appendChild(ubicacion);
    tarjeta.appendChild(img);
    tarjeta.appendChild(botonFavorito);
    tarjeta.appendChild(info);

    tarjeta.addEventListener("click",function(){
      window.location.href="./detalles.html?id=" + personaje.id;
  });
    
  contenedor.appendChild(tarjeta);
  });
}

function filtrar(personajes){
  let texto=document.getElementById("buscador").value.toLowerCase();
  let estado=document.getElementById("filtroEstado").value.toLowerCase();

  //filtro personajes que coinciden
  let filtrados= personajes.filter(p=>{
    let coincideNombre= p.name.toLowerCase().includes(texto);
    let coincideEstado= estado==="" || p.status.toLowerCase() === estado;
    return coincideNombre && coincideEstado;
  });

  //ordeno segun lo que el usuario elige
  let orden=document.getElementById("ordenar").value;

  if(orden==="az"){
    filtrados.sort((a, b) =>{
      if(a.name < b.name ) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });

  } else if(orden==="za") {
    filtrados.sort((a, b) => {
      if(a.name > b.name ) return -1;
      if(a.name < b.name) return 1;
      return 0;
    });

  }else if(orden==="especie-az") {
    filtrados.sort((a, b) => {
      if(a.species < b.species ) return -1;
      if(a.species > b.species) return 1;
      return 0;
    });
  
  }else if(orden==="especie-za") {
    filtrados.sort((a, b) => {
      if(a.species > b.species ) return -1;
      if(a.species < b.species) return 1;
      return 0;
    });
  }
  mostrarPersonajes(filtrados);
}