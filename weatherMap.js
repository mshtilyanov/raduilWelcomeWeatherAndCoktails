function getWeatherDescription(weatherCode) {
    let dailyCodeMap;

    if (weatherCode === 0) {
        dailyCodeMap = "Clear sky";
    } else if (weatherCode > 0 && weatherCode < 4) {
        dailyCodeMap = "Mainly clear, partly cloudy, and overcast";
    } else if (weatherCode === 45 || weatherCode === 48) {
        dailyCodeMap = "Fog and depositing rime fog";
    } else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55) {
        dailyCodeMap = "Drizzle: Light, moderate, and dense intensity";
    } else if (weatherCode === 56 || weatherCode === 57) {
        dailyCodeMap = "Freezing Drizzle: Light and dense intensity";
    } else if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65) {
        dailyCodeMap = "Rain: Slight, moderate and heavy intensity";
    } else if (weatherCode === 66 || weatherCode === 67) {
        dailyCodeMap = "Freezing Rain: Light and dense intensity";
    } else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75) {
        dailyCodeMap = "Snow: Slight, moderate and heavy intensity";
    } else if (weatherCode === 77) {
        dailyCodeMap = "Snow grains";
    } else if (weatherCode > 79 && weatherCode < 83) {
        dailyCodeMap = "Rain showers: Slight, moderate, and violent";
    } else if (weatherCode === 85) {
        dailyCodeMap = "Snow showers slight";
    } else if (weatherCode === 86) {
        dailyCodeMap = "Snow showers heavy";
    } else if (weatherCode === 95) {
        dailyCodeMap = "Thunderstorm slight or moderate";
    } else if (weatherCode > 95) {
        dailyCodeMap = "Thunderstorm heavy with hail";
    } else {
        dailyCodeMap = "Unknown weather";
    }

    return dailyCodeMap;
}

export default getWeatherDescription;