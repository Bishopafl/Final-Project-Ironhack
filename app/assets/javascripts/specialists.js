if ($('.container-fluid').hasClass('specialist-page')){
	function gotPosition (currentPos) {
		var latText = "Latitude: " + currentPos.coords.latitude;
		var longText = "Longitude: " + currentPos.coords.longitude;
		$(".js-lat").text(latText)
		$(".js-long").text(longText)

		$(".js-coords").fadeIn();
		$(".js-loading-text").fadeOut();
	}
	function positionError () {
		$(".js-loading-text").fadeOut();
		$(".js-position-error").fadeIn();
	}


	if ("geolocation" in navigator) {
		console.log("geolocation is available!")

		navigator.geolocation.getCurrentPosition(gotPosition, positionError);

	} else {
		console.log("geolocation is not available.")
	}
		
}

function onLocation(position) {
	var myPosition = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	};

	createMap(myPosition);
}

function createMap(position) {
	var = mapOptions = {
		center: position,
		zoom: 17
	};
	map = new google.maps.Map($('#map')[0], mapOptions);
}

function onError(err) {
	console.log("Your map isn't working...")
}