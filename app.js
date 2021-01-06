const api = {
  key: "972ec2268cce3f390468fb3c5b58c8b4",
  base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector(".container__header-input");

search.addEventListener("keypress", setQuery);

function setQuery(event){
  if(event.keyCode === 13){
    getResults(search.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
}

function displayResults (weather) {
  console.log(weather);
  let city = document.querySelector(".locatie-stad");
  city.innerText = `${weather.name}, ${weather.sys.country}`

  let now = new Date();
  let date = document.querySelector(".locatie-datum");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)} <span>°C</span>`

  let weer = document.querySelector(".weer")
  weer.innerText = weather.weather[0].main;

  let gemiddeld = document.querySelector(".hoog-laag")
  gemiddeld.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`

}


function dateBuilder(d){
  let months = ["Januari", "Februari", "March", "April", "May", "June", "July",
   "August", "September", "October", "November", "December"];

   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
    "Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}
