// Title
var title = document.createElement('div')
let titleName = document.createElement('p');
titleName.innerHTML = "Weather forecast";
title.appendChild(titleName);
document.body.appendChild(title);

// Search for city section
var search = document.createElement('div');
let searchInput = document.createElement('input');
// Events for search
searchInput.addEventListener("keypress", event => {
    if(event.keyCode === 13) {
        event.preventDefault();
        weather();
    }
});
let buttonInput = document.createElement('button');
buttonInput.innerHTML = "→";
buttonInput.addEventListener("click", mouse => {
    mouse.preventDefault();
    weather();
})

var weather = function() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=miami&appid=734bbaa3706a832f46be371dd62d57a4").then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
    })
    
    
    // let display = function (repos, searchTerm) {
    //         console.log(repos);
    //         console.log(searchTerm);
    //     };
    //     response.json().then(function(data) {
    //         display(data, cod)
    //     });
    // });
}
// buttonInput.addEventListener("click", function() {
//     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=miami&appid=734bbaa3706a832f46be371dd62d57a4`;
// });

// Append the search
search.appendChild(searchInput);
search.appendChild(buttonInput);
document.body.appendChild(search);

// City results
var city = document.createElement('div');

// Forecast results
var forecast = document.createElement('div');