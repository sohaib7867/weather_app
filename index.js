import express from "express";
import axios from "axios";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
const API_KEY = "7bb082329cdbe403638fb56ea29ba3be";

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.post("/get_weather", async (req, res) => {
  const city = req.body.city;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = response.data;
    const weather = {
      city: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind: data.wind.speed,
    };
    res.render("index", { weather, error: null });
  } catch (error) {
    console.error(error);
    res.render("index", { weather: null, error: "Error, please try again" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});