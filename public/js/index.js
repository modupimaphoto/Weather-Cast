const error = document.getElementById("error");
window.onload = () => {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude,position.coords.latitude);
    }, (error) => {
      error.innerHTML = `${error.message}.`;
    });
  }else{
    error.innerHTML = "Geolocation not supported";
  }
}

const handleSubmit = (event) => {
  event.preventDefault();
  const search = document.getElementById("search");
  if(search.value.trim() === ""){
    error.innerHTML = "Invalid input.";
  }else {
      error.innerHTML = "";
      geoCoding(search.value);
  }
}

const geoCoding = async(place) => {
  try {
    const apiKey = "956064ce425f845da14fd8bb7a6e947a";
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();
    if(data.length === 0){
      error.innerHTML = "Place not found";
    }else {
      search.value = "";
      let lat = data[0].lat;
      let lon = data[0].lon;
      getWeather(lat, lon);
    }
  }catch(error) {
    error.innerHTML = error.message;
  }
}

const getWeather = async(lat, lon) => {
  const place_name = document.getElementById("place-name");
  const feels_like = document.getElementById("feels_like");
  const main = document.getElementById("main");
  const main_des = document.getElementById("main-description");
  const temp_min = document.getElementById("temp_min");
  const temp_max = document.getElementById("temp_max");
  const details = document.getElementById("details");

  const apiKey = "956064ce425f845da14fd8bb7a6e947a";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  let res = await fetch(url);
  let data = await res.json();


  if(data.name === '')  place_name.innerHTML = "Unknown";
  else place_name.innerHTML = data.name;

  feels_like.innerHTML = `${data.main.feels_like} <sup>o</sup>`;
  main.innerHTML = data.weather[0].main;
  main_des.innerHTML = data.weather[0].description;
  temp_min.innerHTML = `${data.main.temp_min} <sup>o</sup>`;
  temp_max.innerHTML = `${data.main.temp_max} <sup>o</sup>`;

  const {pressure, humidity, sea_level} = data.main;

  let detail = ``;
  detail += `
  <div class="detail col-md-4">
    <h5>
      <img src="public/img/pressure.svg" alt="Pressure icon" />
      Pressure
    </h5>
    <p>${pressure}</p>
  </div>`;
  detail += `
  <div class="detail col-md-4">
    <h5>
      <img src="public/img/humidity.svg" alt="Humidity icon" />
      Humidity
    </h5>
    <p>${humidity}%</p>
  </div>`;
  detail += `
  <div class="detail col-md-4">
    <h5>
      <img src="public/img/sea-level.svg" alt="Sea level icon" />
      Sea level
    </h5>
    <p>${(sea_level == undefined) ? "Not avaible" : sea_level}</p>
  </div>`;

  details.innerHTML = detail;
}
