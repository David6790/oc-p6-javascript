const getCategoryId = async () => {
  await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => (workIdData = data));
};

const createFilter = async () => {
  await getCategoryId();
  sectionFiltres.innerHTML =
    `<button class="btn-filtre" id="0">Tous</button>` +
    workIdData
      .map(
        (workId) =>
          `
    <button class="btn-filtre" id="${workId.id}">${workId.name}</button>
    `
      )
      .join("");
};

const createFilterEventlistner = async () => {
  await createFilter();
  await showFilterWorks();
  for (item of buttonFiltre) {
    console.log(parseInt(item.getAttribute("id")));
    item.addEventListener("click", function () {
      showFilterWorks(parseInt(item.getAttribute("id")));
    });
  }
};

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
