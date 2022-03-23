const encontrarPokemon = () => {
    const url = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemons = []
    for(let i = 1; i<=150; i++){
        pokemons.push(fetch(url(i)).then(response => response.json()))
    }

    Promise.all(pokemons)
        .then(poke =>{

            const liPokemons = poke.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumulator += `
                <li class="card ${types[0]}">
                    <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
                    <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                    <p class="card-subtitle">${pokemon.types.map(typeInfo => typeInfo.type.name).join(' | ')}</p>
                </li>
                `
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = liPokemons
        })
}

encontrarPokemon()