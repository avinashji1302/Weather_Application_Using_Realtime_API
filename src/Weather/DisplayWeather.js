import React from "react";
import "./DisplayWeather.css";

function DisplayWeather(props) {
  const { data, isCelsius } = props;

  // Celsius to Fahrenheit conversion
  function celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }

  if (data.cod === "404") {
    return <h1> Error 404: Invalid City / Country name </h1>;
  } else {
    return (
      <div className="displayweather">
        <div className="maincard">
          <span className="cardtitle">
            {data.name}, {data.sys.country} , Weather
          </span>

          <span>As of {new Date().toLocaleTimeString()}</span>

          <h1>
            {isCelsius
              ? Math.floor(data.main.temp - 273.15) + "°C"
              : Math.floor(celsiusToFahrenheit(data.main.temp - 273.15)) + "°F"}
          </h1>

          <span className="weather-description">
            {data.weather[0].description}
          </span>
        </div>

        <div className="weatherdetails">
          <div className="section1">
            <table>
              <tbody>
                <tr>
                  <td>
                    <h4>High/Low</h4>
                  </td>
                  <td>
                    <span>
                      {isCelsius
                        ? Math.floor(data.main.temp_max - 273.15) +
                          "°C /" +
                          Math.floor(data.main.temp_min - 273.15) +
                          "°C"
                        : Math.floor(
                            celsiusToFahrenheit(data.main.temp_max - 273.15)
                          ) +
                          "°F /" +
                          Math.floor(
                            celsiusToFahrenheit(data.main.temp_min - 273.15)
                          ) +
                          "°F"}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h4>Humidity</h4>
                  </td>
                  <td>
                    <span>{data.main.humidity}%</span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h4>Pressure</h4>
                  </td>
                  <td>
                    <span>{data.main.pressure} hPa</span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h4>Visibility</h4>
                  </td>
                  <td>
                    <span>{data.visibility / 1000} Km</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section2">
            <table>
              <tbody>
                <tr>
                  <td>
                    <h4>Wind</h4>
                  </td>
                  <td>
                    <span>{Math.floor((data.wind.speed * 18) / 5)} Km/h</span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h4>Wind Direction</h4>
                  </td>
                  <td>
                    <span>{data.wind.deg}</span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h4>Sunrise</h4>
                  </td>
                  <td>
                    <span>
                      {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h4>Sunset</h4>
                  </td>
                  <td>
                    <span>
                      {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayWeather;
