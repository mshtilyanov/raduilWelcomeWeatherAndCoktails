import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const URL = "https://api.open-meteo.com/v1/forecast?latitude=39.67&longitude=22.83&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=1"
39.67928428966826, 22.830573630918884
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let currentWeather;
let dailyWeather;
let dailyCodeMap;

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(URL);
    console.log(response.data);
    currentWeather = response.data.current;
    dailyWeather = response.data.daily;
    console.log("---------------");
    console.log(currentWeather);
    console.log(dailyWeather);
    if (dailyWeather.weather_code === 0) {
      dailyCodeMap = "Clear sky";
    }
    else if (dailyWeather.weather_code > 0 && dailyWeather.weather_code < 4) {
      dailyCodeMap = "Mainly clear, partly cloudy, and overcast";
    }
    else if (dailyWeather.weather_code === 45 || dailyWeather.weather_code === 48) {
      dailyCodeMap = "Fog and depositing rime fog";
    }
    else if(dailyWeather.weather_code === 51 || dailyWeather.weather_code === 53 || dailyWeather.weather_code === 55) {
      dailyCodeMap = "Drizzle: Light, moderate, and dense intensity";
    }
    else if(dailyWeather.weather_code === 56 || dailyWeather.weather_code === 57) {
      dailyCodeMap = "Freezing Drizzle: Light and dense intensity";
    }
    else if (dailyWeather.weather_code === 61 || dailyWeather.weather_code === 63 || dailyWeather.weather_code === 65) {
      dailyCodeMap = "Rain: Slight, moderate and heavy intensity";
    }
    else if (dailyWeather.weather_code === 66 || dailyWeather.weather_code === 67) {
      dailyCodeMap = "Freezing Rain: Light and dense intensity";
    }
    else if (dailyWeather.weather_code === 71 || dailyWeather.weather_code === 73 || dailyWeather.weather_code === 75) {
      dailyCodeMap = "Snow: Slight, moderate and heavy intensity";
    }
    else if (dailyWeather.weather_code === 77) {
      dailyCodeMap = "Snow grains";
    }
    else if (dailyWeather.weather_code > 79 && dailyWeather.weather_code < 83) {
      dailyCodeMap = "Rain showers: Slight, moderate, and violent";
    }
    else if (dailyWeather.weather_code === 85) {
      dailyCodeMap = "Snow showers slight";
    }
    else if (dailyWeather.weather_code === 86) {
      dailyCodeMap = "Snow showers heavy";
    }
    else if (dailyWeather.weather_code === 95) {
      dailyCodeMap = "Thunderstorm slight or moderate";
    }
    else if (dailyWeather.weather_code > 95) {
      dailyCodeMap = "Thunderstorm heavy with hail";
    }
    else {
      dailyCodeMap = "Unknown weather";
    }
    res.render('index.ejs', { todayWt: currentWeather, dailyWt: dailyWeather, wtStatus: dailyCodeMap });
  } catch (error) {
    console.log(error);
    res.render('index.ejs', { error: 'Weather data not available' });
  }
  
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});