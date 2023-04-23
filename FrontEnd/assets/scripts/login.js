let formLogin = document.getElementById("formLogin");
let token = "";

const test = async () => {
  let userMail = document.getElementById("email").value;
  let userPassword = document.getElementById("password").value;
  console.log(userMail + "   " + userPassword);
  let loginParam = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userMail,
      password: userPassword,
    }),
  };
  await fetch("http://localhost:5678/api/users/login", loginParam)
    .then((res) => res.json())
    .then((data) => (token = data.token));

  console.log(token);
  if (token) {
    sessionStorage.setItem("token", token);
    window.location.replace("./index.html");
    console.log("token retrouvé");
  } else {
    alert("Identifiant ou mot de passe incorrect! ");
  }
};

const userLogin = () => {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    test();
  });
};

userLogin();
