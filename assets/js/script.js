var searchBtnEl = document.getElementById('searchBtn');
var apiKey = "9294f4f11ff92a5fdbc25e0f6665381e";
var mainWeather = document.getElementById('weatherResults');
var mainBorder = document.getElementById('mainBorder');
var currentUvEl = document.getElementById('uv-text')
var forecastEl = document.getElementById('forecast');
var historyEl = document.getElementById('history');
var searchedListEl = document.getElementById('searchedCities');




// hide elements before search
mainBorder.style.display = "none";

var getWeather = function() {


  //display border after search displays
  mainBorder.style.display = "block";
  

  var cityName = document.getElementById('locationSearch').value;
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=da8f0c321e0385f0aaa59a5f95320076&units=imperial`;
 
 
  // main/day of weather

  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    var date = moment().format('LLLL');
    var displayDate = document.createElement('h2');
    displayDate.textContent = data.name + " | " + date;
    mainWeather.appendChild(displayDate);

    var dailyIcon = document.createElement('img');
    var weatherID = data.weather[0].icon;
    dailyIcon.src = "https://openweathermap.org/img/wn/" + weatherID + ".png";
    mainWeather.appendChild(dailyIcon);

    var temp = document.createElement('p');
    temp.textContent = "Temp: " + data.main.temp + "°F";
    mainWeather.appendChild(temp);

    var wind = document.createElement('p');
    wind.textContent = 'Wind Speed: ' + data.wind.speed + " MPH";
    mainWeather.appendChild(wind);

    var humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + data.main.humidity + "%";
    mainWeather.appendChild(humidity);

    // fetch UV index and display

    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

    fetch(uvUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      console.log(data);

      // UV Index color coded. Green - low, Red - very high.
      var uvIndex = document.createElement('span');
      if (data.current.uvi < 2) {
        uvIndex.setAttribute("class", "w-1/3 bg-green-100 text-green-800 text-md font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900");
      }
      console.log(data.current.uvi);
      uvIndex.innerHTML = data.current.uvi;
      currentUvEl.innerHTML = "UV Index: ";
      currentUvEl.append(uvIndex);
      if (data.current.uvi > 2 && data.current.uvi < 5) {
        uvIndex.setAttribute("class", "w-1/3 bg-yellow-100 text-yellow-800 text-md font-semibold mt-1.5 mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900");
      }
      if (data.current.uvi > 5 && data.current.uvi < 7) {
        uvIndex.setAttribute("class", "w-1/3 bg-orange-100 text-orange-800 text-md font-semibold mt-1.5 mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900");
      }
      if (data.current.uvi > 7) {
        uvIndex.setAttribute("class", "w-1/3 bg-red-100 text-red-800 text-md font-semibold mt-1.5 mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900");
      }

      // 5 day forecast
      // loop and create 5 day forecast cards
      for (var i = 0; i < data.daily.length - 3; i++) {
        var card = document.createElement('div')
        card.setAttribute("class", "bg-blue-600 text-white border border-black p-5 rounded shadow-xl m-1")


        var forecastDate5 = document.createElement('h3');
        forecastDate5.textContent = moment.unix(data.daily[i].dt).format('L');
        forecastDate5.setAttribute("class", "font-bold");
        forecastEl.appendChild(forecastDate5);

        var forecastTemp5 = document.createElement('p');
        forecastTemp5.textContent = "Temperature: " + data.daily[i].temp.day + "°F";
        forecastEl.appendChild(forecastTemp5);

        var windForecast5 = document.createElement('p');
        windForecast5.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
        forecastEl.appendChild(windForecast5);

        var humidityForecast5 = document.createElement('p');
        humidityForecast5.textContent = "Humidity: " + data.daily[i].humidity + "%";
        forecastEl.appendChild(humidityForecast5);

        var icon = document.createElement('img');
        icon.src = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png";
        forecastEl.appendChild(icon);

        card.appendChild(forecastDate5);
        card.appendChild(icon);
        card.appendChild(forecastTemp5);
        card.appendChild(windForecast5);
        card.appendChild(humidityForecast5);
        forecastEl.appendChild(card);
      }

      function showSearchHistory() {
      // save cities to localStorage
      var searchHistory = JSON.parse(localStorage.getItem('search')) || [];
        historyEl = [];
        for (i = 0; i < searchHistory.length; i++) {
          var savedCity = document.createElement('button')
          savedCity.textContent = cityName;
          savedCity.setAttribute("class", "w-full m-2 ml-6 bg-slate-400 hover:bg-slate-600 shadow-xl rounded text-white text-center px-3 py-1 justify-center")
          historyEl.push(savedCity);
          localStorage.setItem('search', JSON.stringify(cityName))
          searchedListEl.appendChild(savedCity);
          savedCity.addEventListener("click", function(){
            getWeather(savedCity.value);
          })
          historyEl.append(savedCity);
        }
      }

      showSearchHistory();
      if (searchHistory.length > 0) {
        getWeather(searchHistory);
      }
    })
  })
}

searchBtnEl.addEventListener("click", getWeather)
localStorage.getItem('search', 'cityName[i]')
