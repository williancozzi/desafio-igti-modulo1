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

  // checking the input
  //prettier-ignore
  if (inputText.value.length > 0 && e.keyCode === 13 && inputText.value.trim(" ")) {
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
      picture: person.picture.thumbnail,
      age: person.dob.age,
      gender: person.gender,
    };
  });

  allPeople.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  inputText.disabled = true;
  setTimeout(isLoaded, 1000);
}

function checkInput() {
  if (inputText.value.length > 0 && inputText.value.trim(" ")) {
    btnSearch.disabled = false;
  } else {
    btnSearch.disabled = true;
  }
}

// compares what is in the input with what is coming from the array
function doSearch() {
  filteredPeople = allPeople.filter((person) => {
    //prettier-ignore
    return person.name.toLowerCase()
      .includes(inputText.value.toLowerCase());
  });

  renderFilteredPeople();
  renderStatistics(filteredPeople);
}

// alphabetically list the results and updates the html
function renderFilteredPeople() {
  let peopleHTML = "<div>";

  filteredPeople.forEach((person) => {
    const { picture, name, age } = person;

    const personHTML = `
    <div class='person'>
      <div>
      <br>
        <img src="${picture}" alt="${name}" id=imgs>
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
  updateHtml(filteredPeople.length);
}

// manipulate the DOM for the statistics
function renderStatistics(users) {
  tabStatistics.innerHTML = "";

  let statsElement = document.createElement("div");

  if (users.length !== 0) {
    // male users filtered
    let statsMaleUsers = document.createElement("div");
    const maleUsers = users.reduce(
      (acc, cur) => (cur.gender === "male" ? ++acc : acc),
      0
    );
    statsMaleUsers.textContent = `Sexo masculino: ${maleUsers}`;
    statsElement.appendChild(statsMaleUsers);

    // female users filtered
    let statsFemaleUsers = document.createElement("div");
    const femaleUsers = users.reduce(
      (acc, cur) => (cur.gender === "female" ? ++acc : acc),
      0
    );
    statsFemaleUsers.textContent = `Sexo feminino: ${femaleUsers}`;
    statsElement.appendChild(statsFemaleUsers);

    // age sum
    let statsAgeSum = document.createElement("div");
    const usersAgeSum = users.reduce((acc, cur) => acc + cur.age, 0);
    statsAgeSum.textContent = `Soma das idades: ${usersAgeSum}`;
    statsElement.appendChild(statsAgeSum);

    // average age
    let statsAgeAvg = document.createElement("div");
    const usersAgeAvg = usersAgeSum / users.length;
    statsAgeAvg.textContent = `Média das idades: ${usersAgeAvg}`;
    statsElement.appendChild(statsAgeAvg);
  }

  tabStatistics.appendChild(statsElement);
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
    txtUsers.textContent = "";
    txtStatistics.textContent = "";
    txtUsers.innerHTML = `${users} usuário(s) encontrado(s)`;
    txtStatistics.innerHTML = "Estatísticas";
  }
}
