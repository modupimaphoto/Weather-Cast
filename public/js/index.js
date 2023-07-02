const searchPlace = (event) => {

	event.preventDefault();
	const search_place = document.getElementById('search-place').value;

	if(search_place.trim() == ''){
		const errorMessage = document.getElementById('errorMessage');
		errorMessage.innerHTML = 'Empty filled.';
	}else{
		geoCoding(search_place);
	}
}


// Geocoding is the process of taking an address or name of a place and converting it into latitude and longitude values.
// The Mapbox Geocoding API allows you to performs two types of geocoding: forward geocoding and reverse geocoding.

/*
Forward geocoding converts text into geographic coordinates.
For example, forward geocoding turns the address 2 Lincoln Memorial Circle NW into coordinate values of -77.050,38.889.

Reverse geocoding converts geographic coordinates into a text description,
for example, turning -77.050,38.889 into the address 2 Lincoln Memorial Circle NW.
*/
const geoCoding = (place) => {
	const access_token = 'pk.eyJ1IjoibW9kdXBpbWFwaG90byIsImEiOiJjbGpoMHFicW8wMHI5M2ZueG01c3U0OGliIn0.xA2MKmONzesbzVywQUwgSQ';
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?&access_token=${access_token}`;

	fetch(url)
	.then((res) => {
		console.log(res.json());
	})
	.catch((err) => {
		const errorMessage = document.getElementById('errorMessage');
		errorMessage.innerHTML = err.message;
	})
}
