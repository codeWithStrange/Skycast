import React, { useState, useEffect } from 'react';
import './MainApp.css';
import { mainAppLogo, gear, water, map, freezing, cloudy, hotRainy, sunnyCloudyRainy, sunnyCloudy, windyCloudy, windySunny, rainy, rainyThunder, sunny, hazy, tornado, sandy, smoky } from './svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureHalf, faWind, faDroplet } from '@fortawesome/free-solid-svg-icons';

const MainApp = () => {

  //If you understand this code, you sef be boss.
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [listCities, setListCities] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const apiKey = '155a8e5c88f4fb24ec048dca2d55e584';
  const geoUsername = 'strangeop99'


  useEffect(() => {
    fetch(`http://api.geonames.org/citiesJSON?username=${geoUsername}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setListCities(data.geonames);
        console.log(listCities);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);


  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  function WeatherIcon(weatherDes) {
    let icon;
    switch (weatherDes) {
      case "Clear":
        icon = sunnyCloudy;
        break;
      case "Clouds":
        icon = cloudy;
        break;
      case "Rain":
        icon = rainy;
        break;
      case "Drizzle":
        icon = rainy;
        break;
      case "Thunderstorm":
        icon = rainyThunder;
        break;
      case "Snow":
        icon = freezing;
        break;
      case "Mist":
        icon = cloudy;
        break;
      case "Smoke":
        icon = smoky;
        break;
      case "Haze":
        icon = hazy;
        break;
      case "Dust":
        icon = sandy;
        break;
      case "Fog":
        icon = cloudy;
        break;
      case "Sand":
        icon = sandy;
        break;
      case "Ash":
        icon = smoky;
        break;
      case "Squall":
        icon = windyCloudy;
        break;
      case "Tornado":
        icon = tornado;
        break;
      default:
        icon = freezing;
    }
    return icon;
  }

  function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} ${hours < 12 ? 'AM' : 'PM'}`;
  }

  function getMostCommonWeatherForDays(forecasts) {
    const dailyForecasts = {};
    forecasts.forEach(forecast => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: '2-digit' });
      const weatherMain = forecast.weather[0].main;

      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {};
      }

      if (!dailyForecasts[date][weatherMain]) {
        dailyForecasts[date][weatherMain] = 0;
      }

      dailyForecasts[date][weatherMain]++;
    });

    const mostCommonWeatherForDays = {};
    for (const date in dailyForecasts) {
      const weatherCounts = dailyForecasts[date];
      const mostCommonWeather = Object.keys(weatherCounts).reduce((a, b) => weatherCounts[a] > weatherCounts[b] ? a : b);
      mostCommonWeatherForDays[date] = mostCommonWeather;
    }

    return mostCommonWeatherForDays;
  }

//For the handle search suggestion function, fix it if you need it
  // const fetchCitySuggestions = (query) => {
  //   fetch(`http://api.geonames.org/searchJSON?q=${query}&maxRows=5&username=demo`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setCitySuggestions(data.geonames);
  //     })
  //     .catch(error => {
  //       console.log(error.message);
  //     });
  // };


  const fetchWeatherData = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        console.log(data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
 
  
  //Broski fix it yourself im tired
  // const handleSearch = () => {
  //   fetchCitySuggestions(city);
  // };
  
  const handleCitySelection = (selected) => {
    setSelectedCity(selected);
    setCity(selected.name);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setWeatherData(data);
          })
          .catch(error => {
            console.log(error.message);
          });
      }, error => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser');
    }
  }, []);
  

  if (!weatherData) return null;

  const mostCommonWeatherForDays = getMostCommonWeatherForDays(weatherData.list);

  return (
    <>
      <div className='mainapp d-flex gap-3'>
        <div className="lefttab d-flex align-items-center flex-column flex-1 rounded-4 py-4">
          <img className='logo' src={mainAppLogo} alt="" />
          <div className="weather d-flex justify-content-center align-items-center flex-column tab-active">
            <img src={water} alt="" />
            <p>Weather</p>
          </div>
          <div className="cities d-flex justify-content-center align-items-center flex-column">
            <img src={map} alt="" />
            <p>Cities</p>
          </div>
          <div className="settings d-flex justify-content-center align-items-center flex-column">
            <img src={gear} alt="" />
            <p className='bro im not getting paid, add any funtion you want'>Settings</p>
          </div>
        </div>
      <div className="middle-section d-flex flex-column flex-8">
      <div className="top-middle d-flex flex-column gap-3">
                  <input
              type='search'
              className="search rounded-5"
              placeholder='Search by cities'
              value={city}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // handleSearch();
                  fetchWeatherData(city);
                }
              }}
            />
    <div className="main-data d-flex justify-content-between p-3">
      <div className="left-main d-flex flex-column justify-content-between ">
        <div className="left-top">
          <h1 className='main-city'>{weatherData.city.name}</h1>
          <p className='feeltemp'>feels like {kelvinToCelsius(weatherData.list[0].main.feels_like)}°</p>
        </div>
        <p className="left-bottom maintemp">{kelvinToCelsius(weatherData.list[0].main.temp)}°</p>
      </div>
      <div className="right-main d-flex justify-content-between align-items-center">
        <img className='main-weather-icon' src={WeatherIcon(weatherData.list[0].weather[0].main)} alt="" />
      </div>
    </div>
  </div>
  <div className="bottom-middle d-flex flex-column flex-1 gap-3">
    <div className="hour-forcast flex-1 rounded-3 py-4">
      <h6 className='fs-14 fw-medium'>3-HOURS FORECAST</h6>
      <div className="forcast-details d-flex justify-content-between">
        {weatherData.list.slice(1, 6).map((hour, index) => (
          <div key={index} className="hour-details d-flex flex-column justify-content-evenly align-items-center">
            <p className="hour">{formatTimestamp(hour.dt)}</p>
            <img  src={WeatherIcon(hour.weather[0].main)} alt="" />
            <p className="temp">{kelvinToCelsius(hour.main.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
    <div className="air-conditions flex-1 rounded-3 py-4">
      <h6 className='fs-14'>AIR CONDITIONS</h6>
      <div className="air-condition-details p-2">
        <div className="real-feal d-flex gap-2">
          <FontAwesomeIcon icon={faTemperatureHalf} style={{ color: 'rgba(217, 217, 217, 0.8)' }} />
          <div className="div">
            <p className="feeltemp fs-12 fw-light light-text">Real Feel</p>
            <p className="fs-4 fw-bold real-feel-temp">{kelvinToCelsius(weatherData.list[0].main.feels_like)}°</p>
          </div>
        </div>
        <div className="wind-speed d-flex gap-2">
          <FontAwesomeIcon icon={faWind} style={{ color: 'rgba(217, 217, 217, 0.8)' }} />
          <div className="div">
            <p className="speed fs-12 fw-light light-text">Wind Speed</p>
            <p className="fs-4 fw-bold wind-speed">{weatherData.list[0].wind.speed} km/h</p>
          </div>
        </div>
        <div className="rain-chance d-flex gap-2">
          <FontAwesomeIcon icon={faDroplet} style={{ color: 'rgba(217, 217, 217, 0.8)' }} />
          <div className="div">
            <p className=" fs-12  fw-light light-text feeltemp">Chance of Precipitation</p>
            <p className="fs-4 fw-bold pop">{weatherData.list[0].pop * 100}%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
      </div>
      {/* <div className="middle-section d-flex flex-column flex-8">
          <div className="cities-list d-flex justify-content-between align-items-center rounded-2 p-2 px-3">
              <div className="city-name">Lagos</div>
              <div className="city-weather d-flex gap-2 align-items-center">
                <img style={{width : '28px'}} src={WeatherIcon(weatherData.list[0].weather[0].main)} alt="" />
                <p className="temp">{kelvinToCelsius(weatherData.list[0].main.temp)}°</p>
              </div>
          </div>
      </div> */}

        <div className="right-section d-flex flex-column flex-3 rounded-3 p-3">
          <h6 className='fs-14 fw-medium'>DAILY FORECAST</h6>
          <div className="d-flex flex-column justify-content-between flex-1 p-2">
            {Object.entries(mostCommonWeatherForDays).map(([date, weather]) => (
              <div key={date} className="days-forecast-details d-flex justify-content-between align-items-center gap-2">
                <p className="day fs-13">{date}</p>
                <div className='d-flex align-items-center gap-2'>
                  <img style={{ width: '32px' }} src={WeatherIcon(weather)} alt="" className="day-forecast-weather" />
                  <p className='daily-weather'>{weather}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='error-container d-flex align-items-center justify-content-center position-fixed flex-column gap-2'> 
      <p className="city-name-error d-inline">Please type the city name correctly</p>
      <p className="internet-error d-inline">Please check your internet</p>
      </div>
      <div className="bg-1"></div>
      <div className="bg-2"></div>
    </>
  );
}

export default MainApp;
