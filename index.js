// Title
var title = document.createElement("div");
let titleName = document.createElement("p");
titleName.innerHTML = "Weather Dashboard";
title.appendChild(titleName);
document.body.appendChild(title);

// Search for city section & events
var search = document.createElement("div");
let searchInput = document.createElement("input");
searchInput.addEventListener("keypress", (enter) => {
  if (enter.keyCode === 13) {
    enter.preventDefault();
    weather();
  }
});
let buttonInput = document.createElement("button");
buttonInput.innerHTML = "→";
buttonInput.addEventListener("click", (mouse) => {
  mouse.preventDefault();
  weather();
});
search.appendChild(searchInput);
search.appendChild(buttonInput);
document.body.appendChild(search);

// Weather info
var city = document.createElement("div");
var weather = function () {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=miami&appid=734bbaa3706a832f46be371dd62d57a4")
    .then(async (placement) => {
      const place = await placement.json();
      console.log(place);
      
      let latitude = place.coord.lat;
      let longitude = place.coord.lon;
      let name = document.createElement("p");
      
      name.innerHTML = place.name;
      console.log(latitude);
      console.log(longitude);

      city.appendChild(name);
      return { latitude, longitude };
    })
    .then(async ({ latitude, longitude }) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=734bbaa3706a832f46be371dd62d57a4`
      ).then(async (response) => {
        const data = await response.json();
        console.log(data);

        function card() {
          let date = document.createElement("p");
          let temperature = document.createElement("p");
          let humidity = document.createElement("p");
          let wind = document.createElement("p");
          let indexUV = document.createElement("p");
          // date.innerHTML = data.date;
          temperature.innerHTML = data.current.temp;
          humidity.innerHTML = data.current.humidity;
          wind.innerHTML = data.current.speed;
          city.appendChild(temperature);
          document.body.appendChild(city);
        }
        card();
      });
    });
};

// Forecast results
var forecast = document.createElement("div");