let weather = {
    apiKey: "9e42a5dbd04b177c3dc6368db4d38f18",

    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, icon, description, temp, humidity, speed);

        // Update with the front end with the newly retrieved data
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";

        document.querySelector(".weather").classList.remove("loading");

        // Update background image on each search
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600x900/?" + name + "')"
    },

    // Search for the weather
    search: function() {
        weather.fetchWeather(document.querySelector(".search-bar").value);
    }
};

// Add Event listeners

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter") {
        weather.search();
    }
});