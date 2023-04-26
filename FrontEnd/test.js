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
