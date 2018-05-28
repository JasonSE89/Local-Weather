//get location of user
function userlocation(){
  navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position.coords.latitude, position.coords.longitude);
});

}

$(document).ready(function(){
  userlocation();
});
