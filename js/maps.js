// I don't know javascript well or the google maps API and SXSW, pray for the best
var map;

function getDropsNear(latitude, longitude, rad) {
  	$.ajax(
      "http://sxsw.kywu.org/find",
      {
          data:
          {
              lat: latitude,
              long: longitude,
              radius: rad
          },
          type: "POST",
          dataType: "json",
          success: function(data)
          {
              console.log("Success!" + $.parseJSON(data));
          },
          error: function(jqxhr, status, error)
          {
              console.log("Error!");
          	}
      	}
  	);
}



function initialize() {
	var myLatlng1 = new google.maps.LatLng(30.265017,-97.7387609);
var mapOptions = {
  center: myLatlng1,
  zoom: 14,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function (position) {
    	initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    	map.setCenter(initialLocation);
    	// var locations = [{"id":"2","latitude":"30.26527778","longitude":"-97.73888889","rdio_id":"aaaa","remark":"Based on the book Mountains Beyond Mountains.","image":""}, {"id":"3","latitude":"30.2769195","longitude":"-97.7547635","rdio_id":"aaaa","remark":"Based on the book Mountains Beyond Mountains.","image":""}, {"id":"4","latitude":"30.2645772","longitude":"-97.7655353","rdio_id":"aaaa","remark":"Based on the book Mountains Beyond Mountains.","image":""}];

      	$.ajax(
          "http://sxsw.kywu.org/find",
          {
              data:
              {
                  lat: position.coords.latitude,
                  long: position.coords.longitude,
                  radius: 2
              },
              type: "POST",
              dataType: "json",
              success: function(data) {
                  console.log("Success!");
                  var locations = data.nearby;
              
	            	//var locations = getDropsNear(position.coords.latitude, position.coords.longitude, 2);

	    	        for (var i = 0; i < locations.length; i++) {
						var drop = locations[i];
						var dropLatLng = new google.maps.LatLng(parseFloat(drop.latitude), parseFloat(drop.longitude));
						var marker = new google.maps.Marker({
							position: dropLatLng,
							map: map,
							title: drop.remark
						});
					} 

		              },
		              error: function(jqxhr, status, error)
		              {
		                  console.log("Error!");
		              	}
		          	}
		      	);
			}, function() {
				userHasNoLocation(true);
 	});
} else {
	userHasNoLocation(true);
}

var myLatlng = new google.maps.LatLng(30.26527778, -97.73888889);
}

function userHasNoLocation(error) {
	var error = "Please allow geolocation to see drops near you.";
	var options = {map: map, position: new google.maps.LatLng(30.26527778,-97.73888889), content: error};
	var infowindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
