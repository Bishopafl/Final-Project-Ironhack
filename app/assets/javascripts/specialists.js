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

		navigator.geolocation.getCurrentPosition(onLocation, positionError);

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
	searchApi(myPosition)
	// add dr location to map 
}

function createMap(position) {
	var mapOptions = {
		center: position,
		zoom: 17
	};
	map = new google.maps.Map($('#map')[0], mapOptions);
	createMarker(position)
}

function onError(err) {
	console.log("Your map isn't working...")
}

function createMarker(position) {
	var marker = new google.maps.Marker({
		position: position,
		map: map
	});
}

function searchApi (position) {
	var latcoord = position.lat;
	var lngcoord = position.lng;
	var api_key = "66b0850367645bf27af70b06c3979f7f"
	var resource_url = 'https://api.betterdoctor.com/2014-09-12/doctors?location='+latcoord+','+lngcoord+',100&skip=0&limit=10&user_key=' + api_key;

	$.ajax({
		url: resource_url,
		success: function (response){
			displayDoctors(response)
		},
		error: function(err){
			console.log("not working bro");
		}
	});
}


function displayDoctors (response) {
	console.log(response)
	response.data.forEach(function(dr){
		var name = dr.profile.first_name + " " + dr.profile.last_name;
		var picture = dr.profile.image_url;
		var phone = dr.practices[0].phones[0].number;
		var street = dr.practices[0].visit_address.street;
		var city = dr.practices[0].visit_address.city;
		var state = dr.practices[0].visit_address.state;
		var zip = dr.practices[0].visit_address.zip;
		var html = '\
			<li>\
				<h3>'+ name +'</h3>\
				<img class="image" src='+ picture +'>\
				<br>\	
				<span>'+ 'Contact: '+ phone +'</span>\
				<div class="address">\
					<span class="street">\
					'+ street +'\
					</span>\
					<br>\
					<span class="city-zip">\
						'+city + ',' + state+ ',' + zip +'\
					</span>\
				</div>\
			</li>';
			
		$(".js-dr-list").append(html);
	});

}

