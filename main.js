//get geograpchic coordinates of user
function localCoordinates(callback){
  var thisthing;
  navigator.geolocation.getCurrentPosition(function(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    callback(latitude, longitude);
  }
  );
  }

  function oliver(a)
  {
    console.log(a)
  }

//get weather based on coordinates
function getWeather(latCor, longCor){
  $.getJSON("https://fcc-weather-api.glitch.me/api/current?"+"lat="+latCor+"&"+"lon="+longCor, function(weatherData){
    console.log(weatherData);
  });
}



$(document).ready(function(){
  localCoordinates(function(lattitude, longitude){
    getWeather(lattitude, longitude);
  });
});
