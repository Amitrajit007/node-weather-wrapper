import "dotenv/config";
import express, { response } from "express";
import weather from "./API/weather.js";
const app = express();
const PORT = process.env.PORT || 5000;

//* the middleware for the request.body access

app.use(express.json());

app.get("/weather", async (req, res) => {
  try {
    let { city = "london" } = req.query;

    const weatherInfo = await weather.getWeatherFromApi(city);
    res.status(200).json({
      success: true,
      greetings: "Welcome to the Weather API",
      data: weatherInfo,
    });
  } catch (error) {
    console.error(
      "Found an error in the weather get route:" + error.message || error
    );
    res.status(404).json({ success: false });
  }
});

app.get("/forecast", async (req, res) => {
  try {
    const { city = "london" } = req.query;
    const { days = 5 } = req.query;
    const forecast = await weather.getForecastFromApi(city, days);
    res.status(200).json({
      success: true,
      greetings: "Welcome to the Weather API-Forecast route",
      Data: forecast,
    });
  } catch (err) {
    console.error(
      "Found the erroe in the forecast section :" + err.message || err
    );
    res.status(404).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
