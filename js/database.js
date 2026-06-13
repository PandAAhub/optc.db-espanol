async function cargarPersonajes() {
    const respuesta = await fetch("data/characters.json");
    const personajes = await respuesta.json();

    const contenedor = document.getElementById("charactersContainer");

    personajes.forEach(personaje => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${personaje.imagen}"
                 alt="${personaje.nombre}"
                 style="width:150px; margin-bottom:15px;">

            <h3>${personaje.nombre}</h3>

            <p>Tipo: ${personaje.tipo}</p>

            <p>Clase: ${personaje.clase}</p>
        `;

        contenedor.appendChild(card);
    });
}

cargarPersonajes();
