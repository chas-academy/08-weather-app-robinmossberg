import React, { Component } from "react";

export class SearchWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.props.search.search || !this.props.search.metrics) return;

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
      return fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${
          props.search.search
        }&units=${props.search.metrics}&APPID=dcfd76e3d19d7279f127a7758065f52b`
      );
    }
    function forecastUrl(props) {
      return fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${
          props.search.search
        }&units=${props.search.metrics}&APPID=dcfd76e3d19d7279f127a7758065f52b`
      );
    }
  }

  render() {
    console.log(this.state);
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
          </div>
        );

    }

  }
}

export default SearchWeather;
