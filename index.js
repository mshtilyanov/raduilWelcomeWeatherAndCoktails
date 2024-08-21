import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import getWeatherDescription from "./weatherMap.js";

const app = express();
const port = 3000;

const URL = "https://api.open-meteo.com/v1/forecast?"

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let currentWeather;
let dailyWeather;
let dailyCodeMap;
let location = "raduil";

let map = {
  raduil: ["42.28", "23.68"],
  skiti: ["39.67", "22.83"]
}

app.get('/', async (req, res) => {
  try {
    
    const response = await axios.get(URL + `latitude=${map[location][0]}&longitude=${map[location][1]}&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=1`);
    //console.log(response.data);
    currentWeather = response.data.current;
    dailyWeather = response.data.daily;
    //console.log("---------------");
    //console.log(currentWeather);
    console.log(dailyWeather);
    dailyCodeMap = getWeatherDescription(dailyWeather.weather_code);
    res.render('index.ejs', { todayWt: currentWeather, dailyWt: dailyWeather, wtStatus: dailyCodeMap, city: location });
  } catch (error) {
    console.log(error);
    res.render('index.ejs', { error: 'Weather data not available' });
  }
  
});

app.post("/SetLocation", (req, res) => {
  
  console.log(req.body);
  location = req.body.location;
  res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});