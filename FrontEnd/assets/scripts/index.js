// Pointer la classe gallery sur le DOM
const sectionGallery = document.querySelector(".gallery");
//Pointer tout les filtres
const boutonFiltre = document.querySelectorAll(".btn-filtre");

// creation d'un Array pour y stocker les donnés du fetch
let workData = [];
let workToDisplay = [];
let selectedCategory = 0;

// creation de la fonction getWork qui ira chercher les données dans l'API. Et nous stock ces données sous forme de JSON dans le tableau work data
const getWorks = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (workData = data));
};

// creation de la fonction showWork pour injecter dans le DOM les données fetché par la fonction getWork. Utilisation de la fonction map pour parcourir les résultats stocker dans la array workData et j'utilise les littéraux de gabarit ${} pour concaténer mon code HTML dans le innerHtml.

const showWorks = async () => {
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

showWorks();

const showFilterWorks = (selectedCategory) => {
  if (selectedCategory === 0) {
    workToDisplay = workData;
  } else {
    workToDisplay = workData.filter(function (workData) {
      return workData.categoryId === selectedCategory;
    });
  }
  sectionGallery.innerHTML = workToDisplay
    .map(
      (workToDisplay) => ` 
    <figure>
    <img src= ${workToDisplay.imageUrl} alt="${workToDisplay.title}">
    <figcaption>${workToDisplay.title}</figcaption>
    </figure>
  `
    )
    .join("");
};

boutonFiltre.forEach(function (button, index) {
  button.addEventListener("click", function () {
    showFilterWorks(index);
  });
});
