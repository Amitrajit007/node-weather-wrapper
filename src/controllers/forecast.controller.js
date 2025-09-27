import weather from "../API/weather.js";

export const forecastController = async (req, res) => {
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
};
