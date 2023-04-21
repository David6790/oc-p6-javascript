// Pointer la classe gallery sur le DOM
const sectionGallery = document.querySelector(".gallery");

// Pointer le bouton filtre Tous les projets
const btnAllWorks = document.getElementById("allWorks");

// Pointer le bouton filtre objet
const btnObjectWorks = document.getElementById("objectWorks");

// Pointer le bouton filtre appartement
const btnAppartmentWorks = document.getElementById("appartmentWorks");

//Pointer le bouton filtre hotel
const btnHotelWorks = document.getElementById("hotelWorks");

// creation d'un Array pour y stocker les donnés du fetch
let workData = [];

// creation de la fonction getWork qui ira chercher les données dans l'API. Et nous stock ces données sous forme de JSON dans le tableau work data
const getWorks = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (workData = data));
};

// creation de la fonction showWork pour injecter dans le DOM les données fetché par la fonction getWork. Utilisation de la fonction map pour parcourir les résultats stocker dans la array workData et j'utilise les littéraux de gabarit ${} pour concaténer mon code HTML dans le innerHtml.

const showWork = async () => {
  await getWorks();
  sectionGallery.innerHTML = workData
    .map(
      (work) => ` 
    <figure>
    <img src= ${work.imageUrl} alt="${work.title}">
    <figcaption>${work.title}</figcaption>
    </figure>
  `
    )
    .join("");
};

showWork();

const getObjectWork = async () => {
  await getWorks();
  for (let i = workData.length - 1; i >= 0; i--) {
    if (workData[i].category.id != 1) {
      workData.splice(i, 1);
    }
  }
};
const showObjectWork = async () => {
  await getObjectWork();
  sectionGallery.innerHTML = workData
    .map(
      (work) => ` 
    <figure>
    <img src= ${work.imageUrl} alt="${work.title}">
    <figcaption>${work.title}</figcaption>
    </figure>
  `
    )
    .join("");
};

const getAppartmentWork = async () => {
  await getWorks();
  for (let i = workData.length - 1; i >= 0; i--) {
    if (workData[i].category.id != 2) {
      workData.splice(i, 1);
    }
  }
};
const showAppartmentWork = async () => {
  await getAppartmentWork();
  sectionGallery.innerHTML = workData
    .map(
      (work) => ` 
      <figure>
      <img src= ${work.imageUrl} alt="${work.title}">
      <figcaption>${work.title}</figcaption>
      </figure>
    `
    )
    .join("");
};

const getHotelWork = async () => {
  await getWorks();
  for (let i = workData.length - 1; i >= 0; i--) {
    if (workData[i].category.id != 3) {
      workData.splice(i, 1);
    }
  }
};
const showHotelWork = async () => {
  await getHotelWork();
  sectionGallery.innerHTML = workData
    .map(
      (work) => ` 
        <figure>
        <img src= ${work.imageUrl} alt="${work.title}">
        <figcaption>${work.title}</figcaption>
        </figure>
      `
    )
    .join("");
};

btnAllWorks.addEventListener("click", function () {
  showWork();
});

btnObjectWorks.addEventListener("click", function () {
  showObjectWork();
});

btnAppartmentWorks.addEventListener("click", function () {
  showAppartmentWork();
});

btnHotelWorks.addEventListener("click", function () {
  showHotelWork();
});
