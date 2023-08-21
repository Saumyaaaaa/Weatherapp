const cityInput=document.querySelector(".city-input");
const searchButton=document.querySelector(".search-btn");
const API_KEY ="2eea1e115bf1654e9d4e88d85ece2a9b";//API key for OpenWeatherMap API

const getCityCoorrdinates = () => {
const cityName = cityInput.value.trim();//get user enetred city name and remove extra spaces
if(!cityName)return;//return if cityname is empty
const GEOCODING_API_URL = 'http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}';

fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
	console.log(data)
}).catch(() => {
	alert("An error occured while fetching the coordinates");

});

}
searchButton.addEventListener("click",getCityCoorrdinates);
