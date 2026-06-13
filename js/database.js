let personajesGlobal = [];
let tipoFiltro = "TODOS";

async function cargarPersonajes() {
    const res = await fetch("./data/characters.json");
    personajesGlobal = await res.json();

    mostrarPersonajes(personajesGlobal);
    initEventos();
}

function mostrarPersonajes(lista) {

    const contenedor = document.getElementById("charactersContainer");
    contenedor.innerHTML = "";

    lista.forEach(p => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-img">
                <img src="${p.img}" alt="${p.nombre}">
            </div>

            <div class="card-info">
                <h3>${p.nombre}</h3>
                <p>${p.tipo} - ${p.clase}</p>
            </div>
        `;

        card.addEventListener("click", () => abrirModal(p));

        contenedor.appendChild(card);
    });
}

function aplicarFiltros() {

    const texto = document.getElementById("searchInput").value.toLowerCase();

    let resultado = personajesGlobal;

    if (tipoFiltro !== "TODOS") {
        resultado = resultado.filter(p =>
            p.tipo.toUpperCase() === tipoFiltro
        );
    }

    if (texto) {
        resultado = resultado.filter(p =>
            p.nombre.toLowerCase().includes(texto)
        );
    }

    mostrarPersonajes(resultado);
}

function filtrarTipo(tipo) {
    tipoFiltro = tipo;
    aplicarFiltros();
}

function initEventos() {
    document.getElementById("searchInput")
        .addEventListener("input", aplicarFiltros);
}

function abrirModal(p) {

    document.getElementById("modal").style.display = "flex";

    document.getElementById("modalImg").src = p.img;
    document.getElementById("modalName").textContent = p.nombre;
    document.getElementById("modalType").textContent = p.tipo + " / " + p.clase;
    document.getElementById("modalDesc").textContent = p.descripcion || "Sin descripción";
}

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

cargarPersonajes();
