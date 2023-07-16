console.log("Client Side Javascript file is loaded");

// Fetch API does NOT work in node js ,  only works in client side js

// fetch weather

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  msg1.textContent = "Loading Weather....";
  msg2.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((parsedData) => {
        if (parsedData.error) {
          msg1.textContent = parsedData.error;
        } else {
          msg1.textContent = parsedData.location;
          msg2.textContent = parsedData.forecast;
        }
      });
    }
  );
});
