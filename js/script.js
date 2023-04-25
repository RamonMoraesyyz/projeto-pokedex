const pokemonName = document.querySelector('.pokemon__name'); //Essa linha seleciona o elemento HTML que tem a classe "pokemon__name" e o atribui à constante pokemonName.
const pokemonNumber = document.querySelector('.pokemon__number'); //Essa linha seleciona o elemento HTML que tem a classe "pokemon__number" e o atribui à constante pokemonNumber.
const pokemonImage = document.querySelector('.pokemon__image'); //Essa linha seleciona o elemento HTML que tem a classe "pokemon__image" e o atribui à constante pokemonImage.
const form = document.querySelector('.form'); //Essa linha seleciona o elemento HTML que tem a classe "form" e o atribui à constante form.
const input = document.querySelector('.input__search'); //Essa linha seleciona o elemento HTML que tem a classe "input__search" e o atribui à constante input.
const buttonPrev = document.querySelector('.btn-prev'); //Essa linha seleciona o elemento HTML que tem a classe "btn-prev" e o atribui à constante buttonPrev.
const buttonNext = document.querySelector('.btn-next'); //Essa linha seleciona o elemento HTML que tem a classe "btn-next" e o atribui à constante buttonNext.

let searchPokemon = 1; //Essa linha cria uma variável chamada searchPokemon e guarda nela o número um.


//Esta função assíncrona 'fetchPokemon' busca informações de um pokemon específico da API Pokeapi, usando o número ou nome do pokemon passado como parâmetro ao se chamar a função. Se a busca retornar um status 200, significa que a busca foi bem-sucedida, e os dados do pokemon são retornados em formato JSON. Pesquise no google ou youtube por: HTTP Status Codes.
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); 
  //Busca (fetch) da api os dados do pokemon que foi passado como parâmetro na função e guarda a resposta na constante APIResponse. A função é assíncrona pois leva um tempo para essa busca acontecer, por isso o await aqui que faz o código aguardar (await) essa busca concluir antes do código continuar a ser executado.
  // Procure por async await

  if (APIResponse.status === 200) {
    const data = await APIResponse.json(); //converte a resposta para o formato json e a guarda na constante data (dados). // Procure no google por promises no javascript
    return data;
  }
}


// Esta função assíncrona 'renderPokemon' exibe informações de um pokemon na página HTML. Primeiro, o texto 'Loading...' é exibido enquanto os dados do pokemon são carregados. Em seguida, a função 'fetchPokemon' é chamada para buscar os dados do pokemon passado como parâmetro. Se a busca for bem-sucedida, os dados do pokemon são exibidos na tela.

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...'; //Guarda o texto Loading...dentro do elemento pokemonName que buscamos e guardamos numa constante no início deste arquivo javascript. Lá em cima.
  pokemonNumber.innerHTML = ''; // A mesma coisa, só que guarda um texto vazio no elemento pokemonNumber

  // Chama a função fetchpokemon que definimos acima, passa o valor pokemon para ela e guarda o retorno na variável data. Busque por escopo de variáveis no javascript. Na cataline tem um video sobre.
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

// Tudo o que está aqui em baixo é executado assim que a página é carregada pela primeira vez.

// primeiro você colocou ouvintes em alguns elementos que selecionou lá em cima e os faz executar uma determinada ação assim que eles perceberem que elas foram feitas.  

// aqui você colocou um ouvinte de um evento de envio de dados no form. Assim que percebe um envio o seu ouvinte chama a função render pokemon e passa o nome do pokemon inserido no input em caixa baixa.
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

// aqui você colocou um ouvinte de um evento de clique no botão de voltar. Assim que percebe um clique nesse botão o seu ouvinte chama a função render pokemon e passa o número do pokemon.
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

// mesma coisa do acima
buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

//aqui você pede para chamar a função renderpokemon e ao mesmo tempo passa para ela a função searchPokemon que ao ser executada irá fornecer um pokemon para a renderpokemon.
renderPokemon(searchPokemon);

// essa última linha ficaria mais clara assim:
// const pokemon = searchPokemon()
// renderPokemon(pokemon)