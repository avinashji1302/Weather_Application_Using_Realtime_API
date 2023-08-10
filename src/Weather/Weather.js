import React from "react";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    getLocationRequest()
  },[])

  function getLocationRequest() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
        const data = await fetch(apiUrl).then((res) => res.json().then((data) => data));
       
        setWeather({
          data: data,
        });
  
      });
    } else {
      document.getElementById('result').textContent = "Geolocation is not supported by this browser.";
    }
  }

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
      <div className="weather_inputs">
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
        </div>

        <div className="weather_submit">
          <div className="checkboxStyle_wrap">
          <label htmlFor="isCelsiusBox"> Celsius</label>
        <input
          type="checkbox"
          name="isCelsius"
          id="isCelsiusBox"
          className="checkboxStyle"
          onChange={() => {
            setCelsius(!isCelsius);
          }}
          checked={isCelsius}
        />
          </div>
        
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
        </div>
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
