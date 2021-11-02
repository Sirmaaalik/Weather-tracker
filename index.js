// Title
var title = document.createElement("div");
let titleName = document.createElement("p");
titleName.innerHTML = "Weather Dashboard";
title.id = "title";
title.appendChild(titleName);
document.body.appendChild(title);

// Search for city section & events
var search = document.createElement("div");
let searchInput = document.createElement("input");
let subSearch = document.createElement("p");
subSearch.innerHTML = "Search for a city";
searchInput.addEventListener("keypress", (enter) => {
  if (enter.keyCode === 13) {
    enter.preventDefault();
    weather();
    fiveDay();
  }
});
let buttonInput = document.createElement("button");
buttonInput.innerHTML = "→";
buttonInput.addEventListener("click", (mouse) => {
  mouse.preventDefault();
  weather();
});
search.id = "search";
search.appendChild(subSearch);
search.appendChild(searchInput);
search.appendChild(buttonInput);
document.body.appendChild(search);

// Weather info
var city = document.createElement("div");
city.id = "city";
var weather = function () {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=miami&appid=734bbaa3706a832f46be371dd62d57a4")
    .then(async (placement) => {
      const place = await placement.json();
      console.log(place);
      
      let latitude = place.coord.lat;
      let longitude = place.coord.lon;
      let name = document.createElement("p");
      let today = document.createElement("p");
      
      name.innerHTML = place.name;
      today.innerHTML = new Date().toISOString().slice(0, 10)

      city.appendChild(name);
      city.appendChild(today);
      return { latitude, longitude };
    })
    .then(async ({ latitude, longitude }) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=734bbaa3706a832f46be371dd62d57a4`
      ).then(async (response) => {
        const data = await response.json();
        console.log(data);

        function card() {
          let temperature = document.createElement("p");
          let wind = document.createElement("p");
          let humidity = document.createElement("p");
          let indexUV = document.createElement("p");
          temperature.innerHTML = "Temp: " + data.current.temp;
          wind.innerHTML = "Wind: " + data.current.wind_speed;
          humidity.innerHTML = "Humidity: " + data.current.humidity;
          indexUV.innerHTML = "UV index: " + data.current.uvi;
          city.appendChild(temperature);
          city.appendChild(wind);
          city.appendChild(humidity);
          city.appendChild(indexUV);
          document.body.appendChild(city);
        }
        card();
      });
    });
};

// Forecast results
var forecast = document.createElement("div");
let subForecast = document.createElement("p");
subForecast.innerHTML = "5-day Forecast:";
forecast.appendChild(subForecast);
forecast.id = "forecast";
var fiveDay = function () {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=miami&appid=734bbaa3706a832f46be371dd62d57a4`)
  .then(async (cast) => {
    const dataCast = await cast.json();
      console.log(dataCast);
    
    function slots () {
      let temperature = document.createElement("p");
      let wind = document.createElement("p");
      let humidity = document.createElement("p");
      // for(let i = 0; i <= dataCast.length; i+8) {
        temperature.innerHTML = "Temp: " + dataCast.list[0].main.temp;
        wind.innerHTML = "Wind: " + dataCast.list[0].wind.speed;
        humidity.innerHTML = "Humidity: " + dataCast.list[0].main.humidity;
      
      forecast.appendChild(temperature);
      forecast.appendChild(wind);
      forecast.appendChild(humidity);
      document.body.appendChild(forecast);
    }
    slots();
  });
};