const input = document.getElementById("pokemonInput");
const boton = document.getElementById("buscarBtn");
const resultado = document.getElementById("resultado");
const loading = document.getElementById("loading");


// funcion principal que busca el pokemon
async function buscarPokemon() {

    // guardo el nombre que escribe el usuario
    const nombre = input.value.toLowerCase().trim();

    // validamos que no esté vacío
    if (nombre === "") {
        resultado.innerHTML = "<p>Por favor escribí un Pokémon</p>";
        return;
    }

    // mensaje mientras busca
    loading.textContent = "Buscando Pokémon...";

    try {
        // hacemos la petición a la api
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

        // si el pokemon no existe
        if (!response.ok) {
            throw new Error("Pokémon no encontrado");
        }

        // pasamos la respuesta a json
        const data = await response.json();

        // obtenemos los tipos
        const tipos = data.types.map(tipo => tipo.type.name).join(", ");

        // mostramos la info
        resultado.innerHTML = `
            <h2>${data.name}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p><strong>Tipo:</strong> ${tipos}</p>
            <p><strong>Peso:</strong> ${data.weight}</p>
            <p><strong>Altura:</strong> ${data.height}</p>
        `;

    } catch (error) {

        // si algo falla mostramos el error
        resultado.innerHTML = `<p>${error.message}</p>`;

    } finally {

        // sacamos loading
        loading.textContent = "";
    }
}


// cuando clickean el boton
boton.addEventListener("click", buscarPokemon);