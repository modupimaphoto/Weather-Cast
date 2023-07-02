

const getPosition = () => {
	if(navigator.geoLocation){

		navigator.geoLocation.getCurrentPosition((position) => {
			return position.coords.latitude;
		})

	}else{
		return 'geolocation not supported'
	}
}
