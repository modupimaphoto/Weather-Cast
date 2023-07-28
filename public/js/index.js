const error_msg = document.getElementById("error-msg");

const handleSubmit = (event) => {
  event.preventDefault();

  const search = document.getElementById("search");
  if(search.value.trim() === ""){
    error_msg.innerHTML = "Invalid input.";
  }else {
      error_msg.innerHTML = "";
      search.value.innerHTML = "";
      geoCoding(search.value);
  }
}

const geoCoding = async(place) => {
  const apiKey = "956064ce425f845da14fd8bb7a6e947a";
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  if(data.length === 0){
    error_msg = "Place not found";
  }else {
    let lat = data[0].lat;
    let lon = data[0].lon;
    getWeather(lat, lon);
  }
}

const getWeather = async(lat, lon) => {
  const apiKey = "956064ce425f845da14fd8bb7a6e947a";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  let res = await fetch(url);
  let data = await res.json();
  console.log(data);
  console.log(data.coord);
  console.log(data.weather);

  console.log(data.weather[0].main);
  console.log(data.weather[0].description);

  console.log(data.main);
}
