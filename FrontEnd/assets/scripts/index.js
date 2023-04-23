// creation d'un Array pour y stocker les donnés du fetch
let workData = [];
// creation d'un Array pour y stocker les works à afficher
let workToDisplay = [];
let selectedCategory = 0;
let userLoggedIn = sessionStorage.getItem("token");
const sectionGallery = document.querySelector(".gallery");
const boutonFiltre = document.querySelectorAll(".btn-filtre");
const sectionFiltres = document.querySelector(".filtres");
const modeEditionHeader = document.getElementById("modeEditionHeader");
const buttonChangePicture = document.getElementById("buttonChangePicture");
const buttonModifyProject = document.getElementById("buttonModifyProject");
const buttonLogIn = document.getElementById("buttonLogIn");
const buttonLogOut = document.getElementById("buttonLogOut");

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
buttonLogOut.addEventListener("click", function () {
  sessionStorage.clear();
  window.location.reload();
});

if (userLoggedIn) {
  sectionFiltres.remove();
  buttonLogIn.remove();
} else {
  boutonFiltre.forEach((button) => {
    button.addEventListener("click", function () {
      showFilterWorks(parseInt(button.getAttribute("id")));
    });
  });
  modeEditionHeader.style.display = "none";
  buttonLogOut.remove();
  buttonChangePicture.remove();
  buttonModifyProject.remove();
}
