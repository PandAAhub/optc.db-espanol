let personajesGlobal = [];
let tipoFiltro = "TODOS";

/* CARGA */
async function cargarPersonajes() {
    const respuesta = await fetch("data/characters.json");
    personajesGlobal = await respuesta.json();

    mostrarPersonajes(personajesGlobal);
    initEventos();
}

/* MOSTRAR CARDS */
function mostrarPersonajes(personajes) {

    const contenedor = document.getElementById("charactersContainer");
    contenedor.innerHTML = "";

    personajes.forEach(p => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <div class="card-top">
                <span class="type ${p.tipo}">${p.tipo}</span>
            </div>

            <div class="card-img">
                <img src="${p.img}" alt="${p.nombre}">
            </div>

            <div class="card-info">
                <h3>${p.nombre}</h3>
                <p>${p.clase}</p>
            </div>
        `;

        card.addEventListener("click", () => abrirModal(p));

        contenedor.appendChild(card);
    });
}

/* FILTRO + BUSCADOR */
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

/* FILTRO BOTONES */
function filtrarTipo(tipo) {
    tipoFiltro = tipo;
    aplicarFiltros();
}

/* BUSCADOR */
function initEventos() {
    document.getElementById("searchInput")
        .addEventListener("input", aplicarFiltros);
}

/* MODAL */
function abrirModal(p) {

    document.getElementById("modal").style.display = "flex";

    document.getElementById("modalImg").src = p.img;
    document.getElementById("modalName").textContent = p.nombre;
    document.getElementById("modalType").textContent = "Tipo: " + p.tipo;
    document.getElementById("modalDesc").textContent = p.descripcion || "Sin descripción";
}

/* CERRAR MODAL */
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

/* START */
cargarPersonajes();
