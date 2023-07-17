import React from "react";
import { useState } from "react";
import "./Weather.css";
import DisplayWeather from "./DisplayWeather";

function Weather() {
  const API_KEY = "f86c5099aeca38186e03df1973281cc5";

  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const [weather, setWeather] = useState({});

  const [isCelsius, setCelsius] = useState(true);

  async function weatherData(e) {
    e.preventDefault();

    if (form.city === "" && form.country === "") {
      alert("Write the city name & country name first");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${API_KEY}`
      ).then((res) => res.json().then((data) => data));

      if (data !== null && data !== undefined) {
        console.log(data);

        setWeather({
          data: data,
        });
      }
    }

    setForm({ city: "", country: "" });
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }

    if (name === "country") {
      setForm({ ...form, country: value });
    }
  };

  return (
    <div className="weather">
      <span className="title">Weather App </span>

      <br />

      <form>
        <label htmlFor="isCelsiusBox"> Celsius</label>
        <input
          type="checkbox"
          name="isCelsius"
          id="isCelsiusBox"
          onChange={() => {
            setCelsius(!isCelsius);
          }}
          checked={isCelsius}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          value={form.city}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          value={form.country}
        />
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>

      {weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} isCelsius={isCelsius} />
        </div>
      ) : null}
    </div>
  );
}
export default Weather;
