import React, { Component } from "react";
import Forecast from './Forecast';

export class SearchWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let ApiKey = process.env.REACT_APP_API_KEY;
    let fetches = [weatherUrl(this.props), forecastUrl(this.props)];

    Promise.all(fetches)
    .then(data => {
        return data.map(data => {
          return data.json();
        });
      })
      .then(data => {
        Promise.all(data).then(data => {
          this.setState({
            weather: data[0],
            forcast: data[1]
          });
        });
      })
      .catch(error => {
        console.log(error, "something went wrong");
      });
      
      function weatherUrl(props) {
      console.log(props)
      if(props.search.lat && props.search.long){
        return fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${
            props.search.lat
          }&lon=${props.search.long}&units=${
            props.search.metrics
          }&APPID=${ApiKey}`
        );
      } else {

        return fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${
            props.search.search
          }&units=${props.search.metrics}&APPID=${ApiKey}`
        );
      }
    }
    function forecastUrl(props) {

      if(props.search.lat && props.search.long){
        return fetch(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${
            props.search.lat
          }&lon=${props.search.long}&units=${
            props.search.metrics
          }&APPID=${ApiKey}`
        );

      } else{
        return fetch(
          `http://api.openweathermap.org/data/2.5/forecast?q=${
            props.search.search
          }&units=${props.search.metrics}&APPID=${ApiKey}`
        );

      }

    }
  }

  render() {
    let weather = this.state.weather;
    let dayLight = [];

    if(weather){
        let sunriseSunset = [weather.sys.sunrise, weather.sys.sunset];
        const convertUnix = (sunriseSunset) =>{
            sunriseSunset.map((item) => {
            let time = new Date(item * 1000);
            let hours = time.getHours();
            let minutes = "0" + time.getMinutes();
            time = hours + ":" + minutes.substr(-2);
            dayLight.push(time + ' ');
          });
        };
        convertUnix(sunriseSunset);
        

    }

    if(!weather){
        return (
            <div>Loading Data..</div>
        )
    } else {
        return (
          <div>
            <ul>
              <li>{weather ? weather.name : ""}</li>
              <li>Temp {weather ? weather.main.temp : ""} Degrees</li>
              <li>Humidity {weather ? weather.main.humidity : ""}%</li>
              <li>Windyness {weather ? weather.wind.speed : ""}</li>
              <li>Sunrise {weather ? dayLight[0] : ""} Sunset {weather ? dayLight[1] : ""}</li>
            </ul>
            <Forecast forecast={this.state}/>
          </div>
        );

    }

  }
}

export default SearchWeather;
