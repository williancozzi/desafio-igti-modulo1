//Challenge to-do:
//(✓)Mostrar o loading enquanto carrega os dados
//    e inabilita o input Text só enquanto carrega;
//(✓)Na carga inicial da aplicação, obter os dados da api;
//(✓)Carregar os dados dos usuários em um array;
//(✓)Permitir a filtragem de usuários através de um input com
//    interação do usuário;
//(✓)O usuário poderá filtrar dados quando digitar pelo menos um
//    caractere no input;
//(✓)O usuário poderá filtrar os dados tanto digitando "Enter"
//    quanto clicando no botão;
//(✓)Montar dois painéis;
//()No painel da esquerda, listar os usuários filtrados;
//()No painel da esquerda, mostrar quantos usuários foram filtrados;
//()No painel da direita, calcular e mostrar algumas estatísticas
//    sobre esses usuários;

"use strict";

let allPeople = [];
let filteredPeople = [];

let tabPeople = document.querySelector("#tab-people");
let tabStatistics = document.querySelector("#tab-statistics");

let inputText = document.querySelector("#input-text");
let loading = document.querySelector(".loading");
let btnSearch = document.querySelector("#btn-search");
let lblSearch = document.querySelector("#lbl-search");

let txtUsers = document.querySelector("#text-users");
let txtStatistics = document.querySelector("#text-statistics");

window.addEventListener("load", () => {
  loadData();
});

inputText.addEventListener("keyup", function events(e) {
  checkInput();

  if (inputText.value.length > 0 && e.keyCode === 13) {
    doSearch();
  }
});

inputText.addEventListener("focus", onFocus);
inputText.addEventListener("focusout", onFocusOut);
btnSearch.addEventListener("click", doSearch);

async function loadData() {
  btnSearch.disabled = true;
  const res = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await res.json();
  allPeople = json.results.map((person) => {
    return {
      name: person.name.first + " " + person.name.last,
      picture: person.picture,
      age: person.dob.age,
      gender: person.gender,
    };
  });

  inputText.disabled = true;
  setTimeout(isLoaded, 1000);
}

function checkInput() {
  if (inputText.value.length > 0) {
    btnSearch.disabled = false;
  } else {
    btnSearch.disabled = true;
  }
}

function doSearch() {
  filteredPeople = allPeople.filter((person) => {
    //prettier-ignore
    return person.name.toLowerCase()
      .includes(inputText.value.toLowerCase());
  });

  render();
  console.log("entrei aqui no render()");
}

function render() {
  renderFilteredPeople();
}

function renderFilteredPeople() {
  let peopleHTML = "<div>";

  filteredPeople.forEach((person) => {
    const { picture, name, age } = person;

    const personHTML = `
    <div class='person'>
      <div>
        <img src="${picture}" alt="${name}">
      </div>
      <div>
        <ul>
          <li>${name}, </li>
          <li>${age} anos</li>
        <ul>
      </div>
    </div>
    `;

    peopleHTML += personHTML;
  });

  peopleHTML += "</div>";

  tabPeople.innerHTML = peopleHTML;
  updateHtml(peopleHTML.length);
}

function isLoaded() {
  loading.style.display = "none";
  inputText.disabled = false;
}

function onFocus() {
  lblSearch.classList.add("active");
}

function onFocusOut() {
  //prettier-ignore
  if (!inputText.value) 
    lblSearch.classList.remove("active");
}

function updateHtml(users) {
  if (users === 0) {
    txtUsers.textContent = "Nenhum usuário filtrado";
    txtStatistics.textContent = "Nada a ser exibido";
  } else {
    tabPeople.innerHTML = "x usuário(s) encontrado(s)";
    tabStatistics.innerHTML = "Estatísticas";
  }
}
