let personajesGlobal = [];

async function cargarPersonajes() {
    const respuesta = await fetch("data/characters.json");
    personajesGlobal = await respuesta.json();

    mostrarPersonajes(personajesGlobal);
    initEventos();
}

function mostrarPersonajes(personajes) {

    const contenedor = document.getElementById("charactersContainer");
    contenedor.innerHTML = "";

    personajes.forEach(personaje => {

        const card = document.createElement("div");
        card.classList.add("card", `rarity-${(personaje.rareza || "r").toLowerCase()}`);

        card.innerHTML = `
            <div class="card-top">
                <span class="type ${personaje.tipo}">${personaje.tipo}</span>
            </div>

            <div class="card-img">
                <img src="${personaje.img}" alt="${personaje.nombre}">
            </div>

            <div class="card-info">
                <h3>${personaje.nombre}</h3>
                <p class="class">${personaje.clase}</p>
            </div>
        `;

        card.addEventListener("click", () => abrirModal(personaje));

        contenedor.appendChild(card);
    });
}

/* 🔍 BUSCADOR + FILTRO COMBINADO */
function aplicarFiltros() {

    const texto = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const tipoActivo = window.tipoFiltro || "TODOS";

    let resultado = personajesGlobal;

    if (tipoActivo !== "TODOS") {
        resultado = resultado.filter(p =>
            p.tipo.toUpperCase().trim() === tipoActivo
        );
    }

    if (texto) {
        resultado = resultado.filter(p =>
            p.nombre.toLowerCase().includes(texto)
        );
    }

    mostrarPersonajes(resultado);
}

/* 🔘 FILTRO POR TIPO */
function filtrarTipo(tipo) {
    window.tipoFiltro = tipo;
    aplicarFiltros();
}

/* 🔍 INPUT SEARCH */
function initEventos() {
    document.getElementById("searchInput")
        .addEventListener("input", aplicarFiltros);
}

/* 🧠 MODAL */
function abrirModal(personaje) {

    document.getElementById("modal").style.display = "flex";

    document.getElementById("modalName").textContent = personaje.nombre;
    document.getElementById("modalType").textContent = personaje.tipo;
    document.getElementById("modalDesc").textContent = personaje.clase;
}

/* ❌ CERRAR MODAL */
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

cargarPersonajes();
