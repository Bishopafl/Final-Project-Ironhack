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
	searchApi(myPosition);
	doctorMarker(myPosition)
	// add dr location to map 
}

function createMap(position) {
	var latlngPos = new google.maps.LatLng([]);

	var mapOptions = {
		center: position,
		zoom: 13
	};
	map = new google.maps.Map($('#map')[0], mapOptions);
	createMarker(position)
}

	function onError(err) {
		console.log("Your map isn't working...")
}

var infowindow;

function doctorMarker(position){
	var latcoord = position.lat;
	var lngcoord = position.lng;
	var userlatlng = (latcoord, lngcoord)
	var api_key = "66b0850367645bf27af70b06c3979f7f"
	var resource_url = 'https://api.betterdoctor.com/2014-09-12/doctors?location='+latcoord+','+lngcoord+',200&skip=0&limit=10&user_key=' + api_key;
	infowindow = new google.maps.InfoWindow();

	$.ajax({
		url: resource_url,
		success: function(response){
			console.log(response)
			response.data.forEach(function(dr_ptn){
				var drlatcoord = dr_ptn.practices[0].lat;
				var drlngcoord = dr_ptn.practices[0].lon;
				var name = dr_ptn.profile.first_name + " " + dr_ptn.profile.last_name;
				var latlngPos = new google.maps.LatLng(drlatcoord, drlngcoord);
				var street = dr_ptn.practices[0].visit_address.street;
				var city = dr_ptn.practices[0].visit_address.city;
				var state = dr_ptn.practices[0].visit_address.state;
				var zip = dr_ptn.practices[0].visit_address.zip;
				var phone = dr_ptn.practices[0].phones[0].number;
				var picture = dr_ptn.profile.image_url;
				
				var marker = createMarker(latlngPos)

				google.maps.event.addListener(marker, "click", function() {
					var html = '\
						<h5>'+name+'</h5>\
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
						';
					infowindow.setContent(html);
					infowindow.open(map, this);
				})

				});
		},
		error: function(){
			console.log("no go bro")
		}
	});
}

function createMarker(position) {
	var marker = new google.maps.Marker({
		position: position,
		map: map
	});
	return marker;
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
	response.data.forEach(function(dr){
		var name = dr.profile.first_name + " " + dr.profile.last_name;
		var picture = dr.profile.image_url;
		var street = dr.practices[0].visit_address.street;
		var city = dr.practices[0].visit_address.city;
		var state = dr.practices[0].visit_address.state;
		var zip = dr.practices[0].visit_address.zip;
		var speciality = dr.specialties[0].actor;
		var bio = dr.profile.bio;
		var html = '\
			<li>\
				<h3>'+ name +'</h3>\
				<span><strong>' + speciality + '</strong></span>\
				<br>\
				<div class="hover-area">\
				<img class="js-image" src='+ picture +'>\
				<div class="hover-box">' + bio + '</div>\
				</div>\
				<br>\
			</li>';
			
		$(".js-dr-list").append(html);
		
	});
}

