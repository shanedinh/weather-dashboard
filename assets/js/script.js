var searchBtnEl = document.getElementById('searchBtn');
var apiKey = "9294f4f11ff92a5fdbc25e0f6665381e";
var mainWeather = document.getElementById('weatherResults');
var mainBorder = document.getElementById('mainBorder');
var currentUvEl = document.getElementById('uv-text')


// hide border
mainBorder.style.display = "none";

var getWeather = function() {

  //display border after search displays
  mainBorder.style.display = "block";

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

    var weatherIcon = document.createElement('img');
    var weatherID = data.weather[0].icon;
    weatherIcon.src = "https://openweathermap.org/img/wn/" + weatherID + ".png";
    mainWeather.appendChild(weatherIcon);

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
      if (data.current.uvi < 2) {
        uvIndex.setAttribute("class", "w-1/3 bg-green-100 text-green-800 text-md font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900");
      }
      // console.log(data.current.uvi);
      // uvIndex.innerHTML = data.current.uvi;
      // currentUvEl.innerHTML = "UV Index: ";
      // currentUvEl.append(uvIndex);
      if (data.current.uvi > 2 && data.current.uvi < 5) {
        uvIndex.setAttribute("class", "w-1/3 bg-yellow-100 text-yellow-800 text-md font-semibold mt-1.5 mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900");
      }
      if (data.current.uvi > 5 && data.current.uvi < 7) {
        uvIndex.setAttribute("class", "w-1/3 bg-orange-100 text-orange-800 text-md font-semibold mt-1.5 mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900");
      }
      if (data.current.uvi > 7) {
        uvIndex.setAttribute("class", "w-1/3 bg-red-100 text-red-800 text-md font-semibold mt-1.5 mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900");
      }

    })
  })
}

searchBtnEl.addEventListener("click", getWeather)