"use strict";

let allPeople = [];
let filteredPeople = [];

let inputText = document.querySelector("#input-text");
let loading = document.querySelector(".loading");
let btnSearch = document.querySelector("#btn-search");
let lblSearch = document.querySelector("#lbl-search");

window.addEventListener("load", () => {
  loadData();
});

inputText.addEventListener("keyup", checkInput);
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

  console.log(filteredPeople);
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
