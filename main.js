/**
*Gathers user's location based on coordinates
*@param {function()} callback - calls function to gather weather
*/function localCoordinates(callback) {
  navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    callback(latitude, longitude);
  }
  );
}

/**
*Formats data gather from the api for html format
*@param {string} city - User's city
*@param {string} country - User's country
*@param {int} temperature - User's location temperature
*@param {string} icon - Location data for icon representing temperature
*/
function formatData(city, country, temperature, icon) {
  $('.container').append('<h3 class='+ 'location'+'>'
  +city+', '+country+'</h3>');
  $('.container').append('<span id= temp>'+
  temperature+'&nbsp;'+'</span>'+'<span id= '+'degree'+
  ' class= '+'cels'+'>&#8451;</span>');
  $('.container').append('<img src= '+icon+'>');
  $('#degree').on('click', function() {
    number = parseInt($('#temp').text());
    if ($('#degree').attr('class') == 'cels') {
    $('#temp').text(convertToFahrenheit(number));
    $('#degree').attr('class', 'fah');
    $('#degree').text(' F'+'\u00B0');
  } else {
    $('#temp').text(convertToCelsius(number));
    $('#degree').attr('class', 'cels');
    $('#degree').text(' C'+'\u00B0');
    }
});
}
/**
*@param {int} celsius - Temperature in elsius format
*@return {int} - Temperatue in fahrenheit format
*/
function convertToFahrenheit(celsius) {
  return Math.round(celsius*1.8+32);
}

/**
*@param {int} fahrenheit - Temperature in fahrenheit format
*@return {int} - Temperature in celsius format
*/
function convertToCelsius(fahrenheit) {
  return Math.round((fahrenheit-32)/1.8);
}

/**
* get weather based on coordinates
*@param {int} latCor - Latitude coordinate based on user's location
*@param {int} longCor - Longitude coordinate based on user's location
*/
function getWeather(latCor, longCor) {
  $.getJSON('https://fcc-weather-api.glitch.me/api/current?'+'lat='+latCor+'&'+'lon='+longCor, function(weatherData) {
    formatData(weatherData.name, weatherData.sys.country,
      Math.round(weatherData.main.temp),
      weatherData.weather[0].icon);
  });
}

$(document).ready(function() {
  localCoordinates(function(lattitude, longitude) {
    getWeather(lattitude, longitude);
});
});
