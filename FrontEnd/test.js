const del20 = document.getElementById("deleteWork20");
console.log(del20);
del20.addEventListener("click", function () {
  fetch("http://localhost:5678/api/works/20", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
});

const modalOpenAndClose = () => {
  buttonModifyProject.addEventListener("click", function () {
    modal.style.display = "flex";
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
  });
  buttonCloseModal.addEventListener("click", function () {
    modal.style.display = "none";
  });
};