let personajesGlobal = [];

async function cargarPersonajes() {

    console.log("Iniciando carga...");

    const respuesta = await fetch("data/characters.json");

    console.log("Respuesta:", respuesta);

    personajesGlobal = await respuesta.json();

    console.log("Personajes:", personajesGlobal);

    mostrarPersonajes(personajesGlobal);

}

function mostrarPersonajes(personajes) {

    const contenedor = document.getElementById("charactersContainer");

    contenedor.innerHTML = "";

    personajes.forEach(personaje => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h3>${personaje.nombre}</h3>
            <p>Tipo: ${personaje.tipo}</p>
            <p>Clase: ${personaje.clase}</p>
        `;

        contenedor.appendChild(card);

    });

}

function buscarPersonajes() {

    const texto = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const filtrados = personajesGlobal.filter(personaje =>
        personaje.nombre.toLowerCase().includes(texto)
    );

    mostrarPersonajes(filtrados);

}

function filtrarTipo(tipo) {

    if (tipo === "TODOS") {
        mostrarPersonajes(personajesGlobal);
        return;
    }

    const filtrados = personajesGlobal.filter(personaje =>
        personaje.tipo === tipo
    );

    mostrarPersonajes(filtrados);

}

cargarPersonajes();
