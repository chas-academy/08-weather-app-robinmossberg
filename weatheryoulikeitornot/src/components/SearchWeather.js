import React, { Component } from "react";

export class SearchWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {}
}

  componentDidMount() {
      if(!this.props.search.search || !this.props.search.metrics) return;
      
      let fetches = [weatherUrl(this.props), forecastUrl(this.props)];
      
      Promise.all(fetches)
 
      .then(data => {
        return data.map(data => {
          console.log(data);
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
        }&units=${
          props.search.metrics
        }&APPID=dcfd76e3d19d7279f127a7758065f52b`
      );
    }
    function forecastUrl(props) {
      return fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${
          props.search.search
        }&units=${
          props.search.metrics
        }&APPID=dcfd76e3d19d7279f127a7758065f52b`
      );
    }
  }

  render() {
      console.log(this.state)
    let weather = this.state.weather;
    let sunrise = weather;
    let sunset;
    if (weather) {
      // function convertUnix(unix) {
      //     unix = new Date(displayWeather.sys.unix * 1000);
      //     let hours = unix.getHours();
      //     let minutes = "0" + unix.getMinutes();
      //     unix = hours + ':' + minutes.substr(-2)
      //     return sunrise;
      // }
    }
    return (
      <div>
        <ul>
          <li>{weather ? weather.name : ""}</li>
          <li>{weather ? weather.main.temp : ""}</li>
          <li>{weather ? weather.main.humidity : ""}</li>
          <li>{weather ? weather.wind.speed : ""}</li>
        </ul>
      </div>
    );
  }
}

export default SearchWeather;
