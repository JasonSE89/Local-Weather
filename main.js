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
function formatData(city, country, temperature, icon){
  $(".container").append("<h3 class="+ "location"+">"+city+", "+country+"</h3>");
  $(".container").append("<span id= temp>"+temperature+"&nbsp;"+"&nbsp;"+"</span>"+"<span id= "+"degree"+" class= "+"celc"+">&#8451;</span>");
  $(".container").append("<img src= "+icon+">");
  $('#degree').on("click", function(){
    number = parseInt($("#temp").text());
    if($('#degree').attr('class') == "celc")
    {
    $("#temp").text(convertToFahrenheit(number));
    $('#degree').attr('class', 'fah');
    }
    else{
    $("#temp").text(convertToCelcius(number));
    $('#degree').attr('class', 'celc');
    }
});
}

function convertToFahrenheit(celcius)
{
  return Math.round(celcius*1.8+32);
}

function convertToCelcius(fahrenheit)
{
  return Math.round((fahrenheit-32)/1.8);
}


//get weather based on coordinates
function getWeather(latCor, longCor){
  $.getJSON("https://fcc-weather-api.glitch.me/api/current?"+"lat="+latCor+"&"+"lon="+longCor, function(weatherData){
    formatData(weatherData.name, weatherData.sys.country, Math.round(weatherData.main.temp), weatherData.weather[0].icon);
  });
}

$(document).ready(function(){
  localCoordinates(function(lattitude, longitude){
    getWeather(lattitude, longitude);
});
});
