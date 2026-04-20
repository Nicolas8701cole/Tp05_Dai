const input = document.getElementById("pokemonInput")
const boton = document.getElementById("buscarBtn")
const resultado = document.getElementById("resultado")
const loading = document.getElementById("loading")
const errror = document.getElementById("error")

boton.onclick = async function () {
    const supuestoPokemon = input.value.toLowerCase().trim()
    limpiarPantalla()
    if (supuestoPokemon === "") {
        error("Escriví algo sin verguenza")
        return
    }
    try {
        const pokemon = await pedirPokemon(supuestoPokemon)
        mostrarPokemon(pokemon)

    } catch {
        error("No se encontró ese Pokémon.")
    }
}
async function pedirPokemon(params) {
    const url = `https://pokeapi.co/api/v2/pokemon/${params}`
    const respuesta = await fetch(url)

    if (!respuesta.ok) {
        error("Pokémon no encontrado")
    }
    const data = await respuesta.json()
    return data
}

//ahora a descomprimir "  { slot: 1, type: { name: "electric", url: "..." } },"
function mostrarPokemon(pokemon) {
    const tipos = pokemon.types
        .map((item) => item.type.name)
        .join(", ")

    resultado.innerHTML = `
    <article class="card">
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p><strong>Tipo(s):</strong> ${tipos}</p>
      <p><strong>Peso:</strong> ${pokemon.weight}</p>
      <p><strong>Altura:</strong> ${pokemon.height}</p>
    </article>
  `
}

function mostrarError(texto) {
    mostrarError.textContent = texto
}
function limpiarPantalla() {
    resultado.innerHTML = ""
    error.textContent = ""
}