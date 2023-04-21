// Pointer la classe gallery sur le DOM
const sectionGallery = document.querySelector(".gallery");

// creation d'un Array pour y stocker les donnés du fetch
let workData = [];

// creation de la fonction getWork qui ira chercher les données dans l'API. Et nous stock ces données sous forme de JSON dans le tableau work data
const getWorks = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (workData = data));
  console.log(workData);
};

// creation de la fonction showWork pour injecter dans le DOM les données fetché par la fonction getWork. Utilisation de la fonction map pour parcourir les résultats stocker dans la array workData et j'utilise les littéraux de gabarit ${} pour concaténer mon code HTML dans le innerHtml.

const showWork = async () => {
  await getWorks();
  sectionGallery.innerHTML = workData
    .map(
      (work) =>
        ` 
    <figure>
    <img src= ${work.imageUrl} alt="${work.title}">
    <figcaption>${work.title}</figcaption>
    </figure>
  `
    )
    .join("");
};

showWork();
