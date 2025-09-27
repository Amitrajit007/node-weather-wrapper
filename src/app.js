import "dotenv/config";
import express from "express";
import forecastRouter from "./routes/forecast.routes.js";
import weatherRouter from "./routes/weather.routes.js";
const app = express();
const PORT = process.env.PORT || 5000;

//* the middleware for the request.body access

app.use(express.json());

app.use("/weather", weatherRouter);

app.use("/forecast", forecastRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
