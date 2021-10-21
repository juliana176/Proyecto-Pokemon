//1.- Hacer una petición a la PokeAPI para obtener cualquier Pokémon.  Muestra sus tipos en consola mediante un for.

// pokemones = [
//   {
//     name: '',
//     img: '',
//     types: ['', '']
//   }
// ]

let pokemones;
let pokemonesFiltrados;

async function obtenerPokemones() {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');

    if (response.status === 200) {
      pokemones = response.data.results.map(i => {
        return { name: i.name }
      });

      pokemones = await Promise.all(pokemones.map(async pokemon => obtenerDatosPokemon(pokemon)));

      pokemones.forEach(pokemon => mostrarPokemones(pokemon));
      
      

    }
    
    else alert('NO SE OBTUVO INFORMACION');
  }
  catch (e) {
    console.log(e);
  }
}

async function obtenerDatosPokemon(pokemon) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);

    if (response.status === 200) {
      pokemon.img = response.data.sprites.front_default;
      pokemon.types = response.data.types.map(item => item.type.name);
      //pokemon.height =response.data.height;
      return pokemon;
      
    }
    else alert('NO SE ECONTRO INFORMACION');
  }
  catch (e) {
    console.log(e);
  }
}

function mostrarPokemones(pokemon) {
  const cardPokemon = document.createElement('div');
  cardPokemon.classList.add('col-6', 'col-md-4', 'col-lg-3', 'col-xl-2', 'mb-3');
  cardPokemon.innerHTML = `
                          <div class="card" onclick="infopokemn('${pokemon.types}')('${pokemon.height}')('${pokemon.abilities}')">
                            <div class="body text-center p-3" >
                              <h3 class="h5">${pokemon.name}</h3>
                              <img src="${pokemon.img}" alt="Tauros">
                            </div>
                           
                        </div>
                      </div>
                          `;
  const listaPokemonesElement = document.getElementById('listaPokemones');
  listaPokemonesElement.insertAdjacentElement('beforeend', cardPokemon);

 // const infoPokemon=document.createElement('div');

};

function infopokemn(types) {
  console.log("El pockemon  es : " + types);
  var myModal = new bootstrap.Modal(document.getElementById("modal1"), {});
  document.getElementById("nombrepokemon").innerHTML = types;
  myModal.show();
}

function filtrarPokemones(texto) {
  document.getElementById('listaPokemones').innerHTML = null;
  if (texto != '') {
    pokemonesFiltrados = pokemones.filter(pokemon => pokemon.name.toLowerCase().indexOf(texto.toLowerCase()) > -1);
    pokemonesFiltrados.forEach(p => mostrarPokemones(p));
  }
  else pokemones.forEach(p => mostrarPokemones(p));
}

document.getElementById('searchIn').addEventListener('input', (e) => {
  console.log(e.target.value);
  const textoBusqueda = e.target.value;
  filtrarPokemones(textoBusqueda);



});


// }

// //tipos - arreglo
// function mostrarTipo(tipo, imgUrl) {
//   let body = document.getElementById('body');

//   let nombreTipo = document.createElement('h1');
//   nombreTipo.innerText = tipo;

//   let imgPokemon = document.createElement('img');
//   imgPokemon.src = imgUrl;


//   body.appendChild(nombreTipo);
//   body.appendChild(imgPokemon);


// };




//obtenerDatosPokemon('charizard')
obtenerPokemones();
// obtenerDatosPokemon();
// mostrarTipo();
// mostrarPokemons();


/**
 * Ejemplo de uso de `map`
 */

// const meses = ['enero', 'febrero', 'marzo', '...'];

// const mesesMin = meses.map(m => {
//   return `${m[0]}${m[1]}${m[2]}`
// })

// function mostrarPokemons(nombre) {
//   let body = document.getElementById('body');
//   let tagLabel = document.createElement('label');
//   tagLabel.textContent = nombre;

//   body.appendChild(tagLabel);