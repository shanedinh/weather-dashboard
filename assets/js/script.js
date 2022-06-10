var searchBtnEl = document.getElementById('searchBtn');
var apiKey = "9294f4f11ff92a5fdbc25e0f6665381e";
var mainWeather = document.getElementById('weatherResults');



var getWeather = function() {

  var cityName = document.getElementById('locationSearch').value;
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=da8f0c321e0385f0aaa59a5f95320076&units=imperial`;

  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    var date = moment().format('L');
    var displayDate = document.createElement('h2');
    displayDate.textContent = data.name + " | " + moment().format('L');
    mainWeather.appendChild(displayDate);

    var temp = document.createElement('p');
    temp.textContent = "Temp: " + data.main.temp + "°F";
    mainWeather.appendChild(temp);

    var wind = document.createElement('p');
    wind.textContent = 'Wind Speed: ' + data.wind.speed + " MPH";
    mainWeather.appendChild(wind);

    var humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + data.main.humidity + "%";
    mainWeather.appendChild(humidity);


    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`

    
    fetch(uvUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      console.log(data);

      var uvIndex = document.createElement('p');
      uvIndex.textContent = 'UV Index: ' + data.current.uvi;
      mainWeather.appendChild(uvIndex);

      var icon = document.createElement('p');
    })
  })
}

searchBtnEl.addEventListener("click", getWeather)