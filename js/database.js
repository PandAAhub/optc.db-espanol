async function cargarPersonajes() {

    const respuesta = await fetch("data/characters.json");
    const personajes = await respuesta.json();

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

cargarPersonajes();
