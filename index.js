// Title
var title = document.getElementById("title");
let titleName = document.createElement("p");
titleName.innerHTML = "Weather Dashboard";
title.appendChild(titleName);
document.body.appendChild(title);

// Search for city section & events
var search = document.getElementById("search");
let searchInput = document.createElement("input");
let subSearch = document.createElement("p");
let buttonInput = document.createElement("button");
subSearch.innerHTML = "Search for a city";
searchInput.addEventListener("keypress", (enter) => {
  if (enter.keyCode === 13) {
    enter.preventDefault();
    weather();
    fiveDay();
  }
});
buttonInput.innerHTML = "→";
buttonInput.addEventListener("click", (mouse) => {
  mouse.preventDefault();
  weather();
  fiveDay();
});
search.appendChild(subSearch);
search.appendChild(searchInput);
search.appendChild(buttonInput);
document.body.appendChild(search);

// Weather info
var city = document.getElementById("city");
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
var forecast = document.getElementById("forecast");
let subForecast = document.createElement("p");
subForecast.innerHTML = "5-day Forecast";
forecast.appendChild(subForecast);
var fiveDay = function () {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=miami&appid=734bbaa3706a832f46be371dd62d57a4`)
  .then(async (cast) => {
    const dataCast = await cast.json();
      console.log(dataCast);
    
    function deck () {
      let temperature = document.createElement("p");
      let wind = document.createElement("p");
      let humidity = document.createElement("p");
      for (let v = 0; v < 5; v++) {
        for(let i = 0; i <= 39; i++) {
          temperature.innerHTML = "Temp: " + dataCast.list[i].main.temp;
          wind.innerHTML = "Wind: " + dataCast.list[i].wind.speed;
          humidity.innerHTML = "Humidity: " + dataCast.list[i].main.humidity;
          i=i+7;
        }

        forecast[v].appendChild(temperature);
        console.log[v](temperature);
        forecast.appendChild(wind);
        console.log[v](wind);
        forecast.appendChild(humidity);
        console.log[v](humidity);
        document.body.appendChild(forecast);
      }
  }deck();
  });
};