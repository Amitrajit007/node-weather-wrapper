import "dotenv/config";
import axios from "axios";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const getWeatherFromApi = async (city = "London") => {
  try {
    const data = await axios.get(BASE_URL + "/weather", {
      params: {
        q: city,
        appid: process.env.WEATHER_API_KEY,
        units: "metric",
      },
    });
    return {
      location: city,
      list: data.data,
    };
  } catch (error) {
    console.log(
      "While getting the weather data from the Api found error" +
        error.message || error
    );
  }
};

const getForecastFromApi = async (city = "kolkata", days = 5) => {
  try {
    const forecast = await axios.get(BASE_URL + "/forecast", {
      params: {
        q: city,
        appid: process.env.WEATHER_API_KEY,
        units: "metric",
      },
    });
    const data_array = forecast.data.list;
    // all days (5) datas for the only midnight.

    // !NO NEED PF THIS PART ONLY FOR PRACTICE ..

    // * creating a lookup object using these datas
    const dayBucket = {};
    data_array.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0];
      if (!dayBucket[date]) dayBucket[date] = [];
      dayBucket[date].push(entry);
    });

    // * now getting the daily summery

    const dailyForcast = Object.keys(dayBucket)
      .slice(0, days)
      .map((date) => {
        const specificDay = dayBucket[date];
        const tempArray = specificDay.map((data) => data.main.temp);
        //* the max temp
        const maxTemp = Math.max(...tempArray);
        //* the min temp
        const minTemp = Math.min(...tempArray);
        // !for wind speed
        const windArray = specificDay.map((data) => data.wind.speed);
        const maxWindSpeed = Math.max(...windArray);
        const minWindSpeed = Math.min(...windArray);
        const avgWindSpeed =
          windArray.reduce((a, val) => a + val, 0) / windArray.length; // 0 is the initial value of the accumulator (a).
        // ! for Humidity
        const humidityArray = specificDay.map((data) => data.main.humidity);
        const maxHumidity = Math.max(...humidityArray);
        const minHumidity = Math.min(...humidityArray);
        const avgHumidity =
          humidityArray.reduce((a, val) => a + val, 0) / humidityArray.length; // 0 is the initial value of the accumulator (a).

        const condition = specificDay[0].weather[0].description;
        return {
          Location: city,
          date,
          maxTemp: `${maxTemp} °C`,
          minTemp: `${minTemp} °C`,
          maxWindSpeed: `${maxWindSpeed} m/s`,
          minWindSpeed: `${minWindSpeed} m/s`,
          avgWindSpeed: `${avgWindSpeed.toFixed(2)} m/s`,
          maxHumidity: `${maxHumidity} %`,
          minHumidity: `${minHumidity} %`,
          avgHumidity: `${avgHumidity.toFixed(2)} %`,
          condition,
        };
      });
    return dailyForcast;
  } catch (error) {
    console.log(
      "While getting the forecast data from the Api found error" +
        error.message || error
    );
  }
};

export default {
  getWeatherFromApi,
  getForecastFromApi,
};
