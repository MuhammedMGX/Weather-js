var search = document.querySelector("#search");
var searchBtn = document.querySelector("#searchBtn");


var cityName = document.querySelector("#cityName");
var temp = document.querySelector("#temp");
var tempIcon = document.querySelector("#tempIcon");
var tempText = document.querySelector("#tempText");
var day = document.querySelector("#day");
var dayDate = document.querySelector("#dayDate");

var nextDay = document.querySelector("#nextDay");
var nextDayDate = document.querySelector("#nextDayDate");
var nextTempIcon = document.querySelector("#nextTempIcon");
var nextMaxtemp = document.querySelector("#nextMaxtemp");
var nextMintemp = document.querySelector("#nextMintemp");
var nextTempText = document.querySelector("#nextTempText");

var nextNextDay = document.querySelector("#nextNextDay");
var nextNextDayDate = document.querySelector("#nextNextDayDate");
var nextNextTempIcon = document.querySelector("#nextNextTempIcon");
var nextNextMaxtemp = document.querySelector("#nextNextMaxtemp");
var nextNextMintemp = document.querySelector("#nextNextMintemp");
var nextNextTempText = document.querySelector("#nextNextTempText");



var apiKey = "40c1ba04b89543af95a192714241212"  ;
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]


console.log("Script loaded!");

getLocation()
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
}
function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    firstSearchWeather( lat , lon , apiKey)
}
async function firstSearchWeather(lat , lon , key ) {
    var res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${key}&q=${lat},${lon}`);
    res = await res.json();
    
    getForecastWeather(res[0].name , apiKey);
}




search.addEventListener("input" , function () {
    searchWeather(search.value , apiKey);
})
searchBtn.addEventListener("click" , function () {
    searchWeather(search.value , apiKey);
})
async function searchWeather(city , key ) {
    var res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${key}&q=${city}`);
    res = await res.json();
    getForecastWeather(res[0].name , apiKey);
}
async function getForecastWeather(city , key) {
    var res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=3`);
    res = await res.json();
    console.log(res);






    var cInputDate = res.current.last_updated.split(' ')[0];
    var cdate = new Date(cInputDate);
    var cdayName = days[cdate.getDay()];

    var cday = cdate.getDate();
    var cMonth = cdate.toLocaleString('en-US', { month: 'long' });
    var formattedDate = `${cday}${cMonth}`;

    day.innerHTML = cdayName ;
    dayDate.innerHTML = formattedDate ;

    cityName.innerHTML = res.location.name ;
    temp.innerHTML = `${res.current.temp_c}°C` ;
    tempIcon.setAttribute("src" , res.current.condition.icon) ;
    tempText.innerHTML = res.current.condition.text ;


    // ==========================================================================




    var nextDate = res.forecast.forecastday[1].date;
    var ndate = new Date(nextDate);
    var ndayName = days[ndate.getDay()];

    var nday = ndate.getDate();
    var nMonth = ndate.toLocaleString('en-US', { month: 'long' });
    var nFormattedDate = `${nday}${nMonth}`;

    nextDay.innerHTML = ndayName ;
    nextDayDate.innerHTML = nFormattedDate ;

    tempIcon.setAttribute("src" , res.forecast.forecastday[1].day.condition.icon) ;
    nextMaxtemp.innerHTML = `${res.forecast.forecastday[1].day.maxtemp_c}°C` ;
    nextMintemp.innerHTML = `${res.forecast.forecastday[1].day.mintemp_c}°C` ;
    nextTempText.innerHTML = res.forecast.forecastday[1].day.condition.text ;






    // ==========================================================================


    
    var nextNextDate = res.forecast.forecastday[2].date;
    var nndate = new Date(nextNextDate);
    var nndayName = days[nndate.getDay()];

    var nnday = nndate.getDate();
    var nnMonth = nndate.toLocaleString('en-US', { month: 'long' });
    var nnFormattedDate = `${nnday}${nnMonth}`;


    nextNextDay.innerHTML = nndayName ;
    nextNextDayDate.innerHTML = nnFormattedDate ;

    nextNextTempIcon.setAttribute("src" , res.forecast.forecastday[2].day.condition.icon) ;
    nextNextMaxtemp.innerHTML = `${res.forecast.forecastday[2].day.maxtemp_c}°C` ;
    nextNextMintemp.innerHTML = `${res.forecast.forecastday[2].day.mintemp_c}°C` ;
    nextNextTempText.innerHTML = res.forecast.forecastday[2].day.condition.text ;






}






