$(document).ready(function () {

    // OpenWeather API Key
    var apiKey = 'da18bc68013a93eb8a21441e4309ba6d';

    // Handles for HTML
    var cityEl = $('h2#city');
    var dateEl = $('h3#date');
    var weatherIconEl = $('img#weather-icon');
    var temperatureEl = $('span#temp');
    var humidityEl = $('span#humid');
    var windEl = $('span#wind');
    var uvIndexEl = $('span#uvdex');
    var cityListEl = $('div.city-list');
    var cityInput = $('#city-input');

   // array to store previously searched cities
   var pastCities = [];

   
   function compare(a, b) {
       
       var cityA = a.city.toUpperCase();
       var cityB = b.city.toUpperCase();

       //to-do
   }

   // Local storage functions for past searched cities

    // Load events from local storage
    function loadCities() {
        const storedCities = JSON.parse(localStorage.getItem('pastCities'));
        if (storedCities) {
            pastCities = storedCities;
        }
    }

    // Store past cities in local storage
    function storeCities() {
        localStorage.setItem('pastCities', JSON.stringify(pastCities));
    }

   // create URL for Open Weather Map API
 
    function buildURLFromInputs(city) {
        if (city) {
            return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        }
    }

    function buildURLFromId(id) {
        return `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}`;
    }


    // color UV-Index based off of color scale
    function setUVColor(uvi) {
        //to-do
    }

     // Displays past 5 searched cities
     function displayCities(pastCities) {
        city-listEl.empty();
       //to-do
    }
    
   

    // Search weather by calling OpenWeather API
    function searchWeather(queryURL) {

        // Create AJAX call for weather data
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {

            // Store current city in past cities
            var city = response.name;
            var id = response.id;
            // dont allow repeat searches of cities
            //to-do
           
            // Display current weather in DOM elements
            cityEl.text(response.name);
            var formattedDate = moment.unix(response.dt).format('L');
            dateEl.text(formattedDate);
            //to-do

            // Call OpenWeather API OneCall with lat and lon
            let lat = response.coord.lat;
            let lon = response.coord.lon;
            let queryURLAll = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            $.ajax({
                url: queryURLAll,
                method: 'GET'
            }).then(function (response) {
              //TO_DO

                // Display 5 day forecast in the DOM
                for (let i = 0; i <= 5; i++) {
                   //TO-DO
                }
            });
        });
    }

     // display most previously searched city 
     function displayLastSearchedCity() {
        if (pastCities[0]) {
            let queryURL = buildURLFromId(pastCities[0].id);
            searchWeather(queryURL);
        } else {
            // if no current local storage , post San antonio data
            let queryURL = buildURLFromInputs("San Antonio");
            searchWeather(queryURL);
        }
    }
 
    // handle on city button // to-do
    


    // handle on click search button
    $('#search-btn').on('click', function (event) {
        // prevent default 
        event.preventDefault();

        // Clear the input fields
        cityInput.val('');

        // Build the query url with the city and searchWeather
        if (city) {
            let queryURL = buildURLFromInputs(city);
            searchWeather(queryURL);
        }
    }); 
    
 

 // page load

    // load any cities in local storage into array
    loadCities();
    displayCities(pastCities);

    // Display weather for last searched city
    displayLastSearchedCity();

});