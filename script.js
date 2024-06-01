let w_cityName = document.querySelector(".weather_city");
let w_dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_tempertaure = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_MaxTem = document.querySelector(".weather_max");


let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");


// to get actual country name 

const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
}

const getDateTime = (dt) => {

    const curDate = new Date(dt * 1000);
    console.log(curDate)


    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-Us", options)
    return formatter.format(curDate);

}


let city = "pune";

//search Functionality

citySearch.addEventListener('submit', (e) => {
    e.preventDefault();

    let cityName = document.querySelector(".city_name");
    console.log(cityName.value)
    city = cityName.value;

    getWeatherData();

    cityName.value = "";

})


const getWeatherData = async () => {


    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=523c3d98f883bfd690edf85098e43b51`;

    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        // console.log(data)

        const { main, name, weather, wind, sys, dt } = data

        w_cityName.innerHTML = `${name},${getCountryName(sys.country)}`;
        w_dateTime.innerHTML = getDateTime(dt)

        w_forecast.innerHTML = `${weather[0].main}`;
        w_icon.innerHTML = ` <img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

        w_tempertaure.innerHTML = `${main.temp}&#176`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        w_MaxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;

        w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.minute = `${main.pressure} hpa`

    }
    catch (error) {
        console.log(error)
    }
}



document.body.addEventListener("load", getWeatherData());