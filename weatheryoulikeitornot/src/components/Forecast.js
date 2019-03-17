import React from "react";
import WeatherIcon from "react-icons-weather";

const Forecast = props => {
  let forecast = props.forecast.forecast.list;
  let threeHourWeather;
  let weekForecastRend;

  let formatedTime= [];
  let todaysForecastArr = [];
  let weekForecastArr = [];

  for (let i = 1; i < 8; i++) {
    todaysForecastArr.push(forecast[i]);
  }

  forecast.map(index => {
    let substring = "12:00:00";
    let i = index.dt_txt;
    if (i.includes(substring)) {
      let time = i.slice(1,17)
      formatedTime.push(time)
      weekForecastArr.push(index);
    }
  });

  if (!todaysForecastArr) {
    threeHourWeather = <div>Loading..</div>;
  } else {
    threeHourWeather = todaysForecastArr.map((data, i) => {
      return (
        <div className="card" key={i}>
          <div className="card-panel">
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
            <li>{data.main.temp}°</li>
            <li>{data.weather[0].description}</li>
          </div>
        </div>
      );
    });
  }

  if (!weekForecastArr) {
    weekForecastRend = (
      <div className="progress">
        <div className="indeterminate" />
      </div>
    );
  } else {
    weekForecastRend = weekForecastArr.map((data, i) => {
      return (
        <div className="card" key={i}>
          <div className="card-panel">
            <div className="">
              <WeatherIcon
                className="owm"
                name="owm"
                iconId={data.weather[0].id}
                flip="horizontal"
                rotate="90"
              />
              <li>{data.dt_txt}</li>
              <li>{data.main.temp}°</li>
              <li>{data.weather[0].description}</li>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="bigContainer">
          <h4>24h Weather</h4>
      <div className="" id="">
          <ul className="threeHourForecast">{threeHourWeather}</ul>
      </div>
        <h4>5 Day Weather</h4>
      <div className="">
        <ul className="weekForecast">{weekForecastRend}</ul>
      </div>
    </div>
  );
};

export default Forecast;
