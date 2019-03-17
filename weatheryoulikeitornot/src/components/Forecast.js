import React from "react";
import WeatherIcon from 'react-icons-weather';

const Forecast = props => {
  let forecast = props.forecast.forecast.list;
  let threeHourWeather;
  let weekForecastRend;

  let todaysForecastArr = [];
  let weekForecastArr = [];

  for (let i = 1; i < 8; i++) {
    todaysForecastArr.push(forecast[i]);
  }

  forecast.map(index => {
    let substring = "12:00:00";
    let i = index.dt_txt;
    if (i.includes(substring)) {
      weekForecastArr.push(index);
    }
  });

  if (!todaysForecastArr) {
    threeHourWeather = <div>Loading..</div>;
  } else {
    threeHourWeather = todaysForecastArr.map((data, i) => {
      console.log(data)
      return (
        <div className="card" key={i}>
        <div>
            <WeatherIcon
              className="owm"
              name="owm"
              iconId={data.weather[0].id}
              flip="horizontal"
              rotate="90"
            />
          </div>
          <li>{data.dt_txt}</li>
          <li>{data.main.temp}</li>
          <li>{data.weather[0].description}</li>
        </div>
      );
    });
  }

  if (!weekForecastArr) {
    weekForecastRend = <div>Loading..</div>;
  } else {
    weekForecastRend = weekForecastArr.map((data, i) => {
      return (
        <div className="card col m3" key={i}>
          <div className="">
          <WeatherIcon
              className="owm"
              name="owm"
              iconId={data.weather[0].id}
              flip="horizontal"
              rotate="90"
            />
            <li>{data.dt_txt}</li>
            <li>{data.main.temp}</li>
            <li>{data.weather[0].description}</li>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="">
      <div className="row">
        <div >
          <ul className="card">{threeHourWeather}</ul>
        </div>
      </div>
      <div className="row">
        <ul>{weekForecastRend}</ul>
      </div>
    </div>
  );
};

export default Forecast;
