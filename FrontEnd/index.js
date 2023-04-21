const sectionGallery = document.querySelector(".gallery");
let workData = [];
const getWorks = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (workData = data));
  console.log(workData);
};

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
