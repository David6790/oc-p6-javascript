/***********************************************/

// ------ DÉCLARATION DES VARIABLES ----------//

/***********************************************/

let workData = []; // array pour stocker la data du feth
let workToDisplay = []; // array pour stocker les works à afficher à l'issu de la fonction showfilterwork()
let selectedCategory = 0; // variable pour initialiser l'id de la catagorie du Work
let userLoggedIn = sessionStorage.getItem("token"); // Varible pour stocker l'existence du token dans la session storage

/*********** Poitage de tout les élements du Dom necessaire pour sa manipulation par les fonctions plus bas ***********/
const sectionGallery = document.querySelector(".gallery");
const boutonFiltre = document.querySelectorAll(".btn-filtre");
const sectionFiltres = document.querySelector(".filtres");
const modeEditionHeader = document.getElementById("modeEditionHeader");
const buttonChangePicture = document.getElementById("buttonChangePicture");
const buttonModifyProject = document.getElementById("buttonModifyProject");
const buttonLogIn = document.getElementById("buttonLogIn");
const buttonLogOut = document.getElementById("buttonLogOut");

/***********************************************/

// ------ DÉCLARATION DES FONCTIONS ----------//

/***********************************************/

// Fonction pour récuperer les données de manière global
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
// boucle forEach pour mettre des eventListner sur les boutons filtres en fonction de leur ID. Par ce bias, l'ordre dans lequel on intègre les bouton n'a plus d'incidence sur le eventlistner

const createFilterEventlistner = () => {
  boutonFiltre.forEach((button) => {
    button.addEventListener("click", function () {
      showFilterWorks(parseInt(button.getAttribute("id")));
    });
  });
};

// fonction pour determiner ce qu'on affiche ou ce qu'on retire de la page d'acceuil quand le token n'existe pas dans le sessionStorage donc utilisateur non connecté
const visitorPageConfiguration = () => {
  modeEditionHeader.style.display = "none";
  buttonLogOut.remove();
  buttonChangePicture.remove();
  buttonModifyProject.remove();
};
// fonction pour determiner ce qu'on affiche ou ce qu'on retire de la page d'acceuil quand le token existe dans le sessionStorage donc utilisateur est administrateur
const administratorPageConfiguration = () => {
  sectionFiltres.remove();
  buttonLogIn.remove();
};
// fonction pour gerer le changement de configuration en fonction de si l'utilisateur des connecté ou pas.
const changeConfiguration = () => {
  if (userLoggedIn) {
    administratorPageConfiguration();
  } else {
    visitorPageConfiguration();
  }
};
// fonction pour permettre a l'administrateur de logout. On clear le session storage ou est stocké le token. Puis on force un reload de la page en question. La page se reloadera en configuration visiteur puisque le token n'existe plus dans la session storage.
const EndAdminSession = () => {
  buttonLogOut.addEventListener("click", function () {
    sessionStorage.clear();
    window.location.reload();
  });
};

/***********************************************/

// ------ Exécution des fonctions ----------//

/***********************************************/

showWorks(); // un premier appel de la fonction showWorks pour afficher tout les travaux a l'ecran lors du chargement
createFilterEventlistner(); // creation des eventListner
changeConfiguration(); // chargement des config de disposition de la page
EndAdminSession(); // possibilité de se deconnecter

/***********************************************/

// ------ ESSAIS SUR MODAL  ----------//

/***********************************************/

const modal = document.getElementById("modal");
const buttonCloseModal = document.getElementById("closeModal");
const buttonSendPicture = document.getElementById("sendPicture");
const modalWorkUpload = document.getElementById("modalWorkUpload");
const buttonCloseModalWorkUpload = document.getElementById(
  "closeModalWorkUpload"
);
const buttonBackToModal = document.getElementById("backToModal");

const modalOpenAndClose = () => {
  buttonModifyProject.addEventListener("click", function () {
    modal.style.display = "flex";
  });
  buttonCloseModal.addEventListener("click", function () {
    modal.style.display = "none";
  });
};

modalOpenAndClose();

const sectionGallery2 = document.querySelector(".gallery2");

const showWorksInModal = async () => {
  await getWorks();
  sectionGallery2.innerHTML = workData
    .map(
      (work) => ` 
    <figure>
    <div class ="imgModal">
    <img src= ${work.imageUrl} alt="${work.title}">
    <i class="fa-solid fa-trash-can" id="deleteWork${work.id}"></i>
    </div>
    </figure>
  `
    )
    .join("");
};

showWorksInModal();

buttonSendPicture.addEventListener("click", function () {
  modalWorkUpload.style.display = "flex";
});
buttonCloseModalWorkUpload.addEventListener("click", function () {
  modalWorkUpload.style.display = "none";
  modal.style.display = "none";
});
buttonBackToModal.addEventListener("click", function () {
  modalWorkUpload.style.display = "none";
});
