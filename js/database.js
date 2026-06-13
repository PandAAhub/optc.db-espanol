let personajesGlobal = [];

async function cargarPersonajes() {

    const respuesta = await fetch("data/characters.json");
    personajesGlobal = await respuesta.json();

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

            <p><strong>Tipo:</strong> ${personaje.tipo}</p>

            <p><strong>Clase:</strong> ${personaje.clase}</p>
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

cargarPersonajes();

.filtros{
    display:flex;
    justify-content:center;
    gap:10px;
    margin-top:20px;
    flex-wrap:wrap;
}

.filtros button{
    padding:10px 20px;
    border:none;
    border-radius:10px;
    cursor:pointer;
    font-weight:bold;
}

.filtros button:hover{
    transform:scale(1.05);
}
