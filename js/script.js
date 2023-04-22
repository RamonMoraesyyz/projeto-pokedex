const pokemonName = document.querySelector('.pokemon__name'); //constante para puxar o nome do pokemon
const pokemonNumber = document.querySelector('.pokemon__number'); //constante para puxar o número do pokemon
const pokemonImage = document.querySelector('.pokemon__image'); //constante para puxar a imagem do pokemon

const form = document.querySelector('.form'); //constante para puxar o formulário
const input = document.querySelector('.input__search'); //constante para puxar a pesquisa
const buttonPrev = document.querySelector('.btn-prev'); //constante botão anterior
const buttonNext = document.querySelector('.btn-next'); //constante próximo botão

let searchPokemon = 1; //deixando a página inicial no primeiro pokemon(bulbassauro)

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //puxando da API Pokeapi (base de dados dos pokemons)

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...'; //comando para ao pesquisar um número ou nome do pokemon, aparecer loading
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name; //nome do pokemon
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; //endereço dentro da API onde puxa o gif do pokemon
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c'; //mensagem de não encontrado, caso pesquise nome ou números inexistentes
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);