const login = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "sophie.bluel@test.tld",
    password: "S0phie",
  }),
};

fetch("http://localhost:5678/api/users/login", login)
  .then((res) => res.json())
  .then((data) => console.log(data));
