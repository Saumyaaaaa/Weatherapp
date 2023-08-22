const cityInput=document.querySelector(".city-input");
const searchButton=document.querySelector(".search-btn");
const weatherCardsDiv =document.querySelector(".weather-cards");




const API_KEY ="2eea1e115bf1654e9d4e88d85ece2a9b";    //API key for OpenWeatherMap API

const createWeatherCard = (weatherItem)=>{
     return ` <li class="card">
	                  <h3> (${weatherItem.dt_txt.split("")[0]})</h3>
	                  <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}10d@4x.png" alt="weather-icon">
	                  <h4>Temp : ${(weatherItem.main.temp - 273.15).toFixed(2)}<sup>o</sup>C</h4>
	                  <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
	                  <h4>Humidity: ${weatherItem.main.humidity}</h4>
                    </li>`;
}

const getWeatherDetails =(cityName, lat, lon) =>{
	const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_kEY}`;


	fetch(WEATHER_API_URL).then(res=> res.json()).then(data => {
	
// filter the forecast to get only one forecast per day
		const uniqueForecastDays =[];
		 const fiveDaysForecast =data.list.filter(forecast => {
			const forecastDate= new Date(forecast.dt_txt).getDate();
			if(!uniqueForecastDays.includes(forecastDate)){
				return uniqueForecastDays.push(forecastDate);
			}

		});


		console.log(fiveDaysForecast);
		fiveDaysForecast.forEach(weatherItem => {
			weatherCardsDiv.insertAdjacentHTML("beforeend",createWeatherCard(weatherItem));
			

		});
		



	}).catch(() => {
		alert("An error occured while fetching the weather forecast!");
	});
	
}

const getCityCoorrdinates = () => {
const cityName = cityInput.value.trim();           //get user enetred city name and remove extra spaces
if(!cityName)return;                               //return if cityname is empty
const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

//Get entered city coordinates (latitude, longitude , and name) from the API response
fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
	if(!data.length) return alert(`No coordinates found for ${cityName}`);
	const{ name, lat, lon}=data[0];
	getWeatherDetails(name, lat, lon);
}).catch(() => {
	alert("An error occured while fetching the coordinates");
});

}
searchButton.addEventListener("click",getCityCoorrdinates);
