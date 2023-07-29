
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
  const apiKey = "956064ce425f845da14fd8bb7a6e947a";
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=${apiKey}`;

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


  if(data.name === '')   place_name.innerHTML = "Unknown";
  else place_name.innerHTML = data.name;

  feels_like.innerHTML = data.main.feels_like;
  main.innerHTML = data.weather[0].main;
  main_des.innerHTML = data.weather[0].description;
  temp_min.innerHTML = data.main.temp_min;
  temp_max.innerHTML = data.main.temp_max;

  let detail = ``;
  for(const key in data.main){
    detail += `
    <div class="col-4 col-md-3 m-1 detail">
      <h5>${key}</h5>
      <p>${data.main[key]}</p>
    </div>`;

  }
  details.innerHTML = detail;

}
