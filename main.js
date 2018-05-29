//get geograpchic coordinates of user
function localCoordinates(callback){
  navigator.geolocation.getCurrentPosition(function(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    callback(latitude, longitude);
  }
  );
  }

//Formats data for index.html page
function formatData(city, country, temperature){
  $(".container").append("<h3 class="+ "location"+">"+city+", "+country+"</h3>");
  $(".container").append("<p>"+temperature+"</p>");
}

//get weather based on coordinates
function getWeather(latCor, longCor){
  $.getJSON("https://fcc-weather-api.glitch.me/api/current?"+"lat="+latCor+"&"+"lon="+longCor, function(weatherData){
    formatData(weatherData.name, weatherData.sys.country, weatherData.main.temp);
    console.log(weatherData);
  });
}




$(document).ready(function(){
  localCoordinates(function(lattitude, longitude){
    getWeather(lattitude, longitude);
  });
});
