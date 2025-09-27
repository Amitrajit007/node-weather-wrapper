import weather from "../API/weather.js";

export const weatherController = async (req, res) => {
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
};
