import React, { Component } from "react";

const Forecast = props => {
  let forecast = props.forecast.forecast.list;
  let threeHoureWeather;
  let weekForecastRend;

  let todaysForecastArr = [];
  let weekForecastArr = [];

  for (let i = 1; i < 8; i++) {
    todaysForecastArr.push(forecast[i]);
  }

  todaysForecastArr.map(index => {
    let substring = "12:00:00";
    let i = index.dt_txt;
    if (i.includes(substring)) {
      weekForecastArr.push(index);
    }
  });

  if (!todaysForecastArr) {
    threeHoureWeather = <div>Loading..</div>;
  } else {
    threeHoureWeather = todaysForecastArr.map((data, i) => {
      return (
        <div key={i}>
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
        <div key={i}>
          <li>{data.dt_txt}</li>
          <li>{data.main.temp}</li>
          <li>{data.weather[0].description}</li>
        </div>
      );
    });
  }

  return (
    <div>
      <ul>{threeHoureWeather}</ul>
      <ul>{weekForecastRend}</ul>
    </div>
  );
};

export default Forecast;

//   render() {
//     const { todaysForecast, weekForecast } = this.state;

//

//

//       r
//     }

// }
