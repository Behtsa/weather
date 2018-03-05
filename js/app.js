// API KEY GOOGLE GEO AIzaSyBonZzaZgV14_6A3V79KhctCclZsRqSGGw
// API KEY DARK SKY 5a577871909255973d40829c2fc8d31f
const $send = $('#submit');
const $key = 'AIzaSyBonZzaZgV14_6A3V79KhctCclZsRqSGGw';
const $skyKey = '5a577871909255973d40829c2fc8d31f';
const $container = $('#temp-info');

const showCurrentlyWeather = (celciusTemp, windSpeed, humidity, uvIndex, pressure) => {
  let temp = ' ';
  temp += `
  <h1 class = "text-center"><strong>${celciusTemp}°<strong></h1>
  <p class = "text-center">Wind:${windSpeed} m/s</p>
  <p class = "text-center">Humidity:${humidity} %</p>
  <p class = "text-center">UV Index:${uvIndex}</p>
  <p class = "text-center">Pressure:${pressure} hPa</p>
  `
  $container.html(temp);
}

const getWeatherDetails = (weather) => {
  console.log(weather);
  let currentlyWeather = weather.currently;
  let farenheitTemp = currentlyWeather.temperature;
  let celciusTemp = parseInt(((farenheitTemp - 32) * 5) / 9);
  let windSpeed = currentlyWeather.windSpeed;
  let humidity = currentlyWeather.humidity;
  let uvIndex = currentlyWeather.uvIndex;
  let pressure = currentlyWeather.pressure;
  showCurrentlyWeather(celciusTemp, windSpeed, humidity, uvIndex, pressure);
}

const getLatLng = (lat, lng) => {
  $.ajax({
   url : 'https://api.darksky.net/forecast/5a577871909255973d40829c2fc8d31f/' + lat + ',' + lng 
 }).done(getWeatherDetails)
 .fail(handleError);
}

// with getLocation we get lat and lng to use as params for dark sky
const getLocation = (response) => {
  // console.log(response);
  let lat = response.results[0].geometry.location.lat;
  // console.log(lat);
  let lng = response.results[0].geometry.location.lng;
  // console.log(lng);
  getLatLng(lat, lng);
}

const handleError = () => {
  console.log("Error")
}

$send.click(function(e){
  e.preventDefault();
  let $address = $('#address').val();
  // Consuming Google Geocoding API to get lat and lng
  let finalUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + $address + '&key=' + $key;
  console.log(finalUrl);
  $.ajax({
    url : finalUrl,
  }).done(getLocation)
  .fail(handleError);
})

loadPage = () => {
  console.log("ok");
}


$(document).ready(loadPage);