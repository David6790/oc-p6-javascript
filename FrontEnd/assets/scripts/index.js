// creation d'un Array pour y stocker les donnés du fetch
let workData = [];
// creation d'un Array pour y stocker les works à afficher
let workToDisplay = [];

// creation variable pour indiquer la catégorie du work
let selectedCategory = 0;

let userLoggedIn = sessionStorage.getItem("token");

// Pointer la classe gallery sur le DOM
const sectionGallery = document.querySelector(".gallery");
//Pointer tout les filtres
const boutonFiltre = document.querySelectorAll(".btn-filtre");
// creation de la fonction getWork qui ira chercher les données dans l'API. Et nous stock ces données sous forme de JSON dans le tableau work data
const sectionFiltres = document.querySelector(".filtres");

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
// un premier appel de la fonction showWorks pour afficher tout les travaux a l'ecran lors du chargement
showWorks();

// création d'une fonction qui permets de filtrer les travaux en fonction de la catégorie du projet et ensuite l'afficher à l'ecran.
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

// création d'une boucle foreach pour ajouter des eventListner à l'ensemble des bouttons.
if (userLoggedIn) {
  sectionFiltres.innerHTML = "";
} else {
  boutonFiltre.forEach((button) => {
    button.addEventListener("click", function () {
      showFilterWorks(parseInt(button.getAttribute("id")));
    });
  });
}
