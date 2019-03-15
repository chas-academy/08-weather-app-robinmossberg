import React, { Component } from "react";
import "./App.css";
import SearchWeather from "./components/SearchWeather";
import Forecast from "./components/Forecast";


class App extends Component {
  state = {
    search: "",
    metrics: "metric",
    makeSearch: false,
    lat: null,
    long: null,
    weather: null
  };

  handleChange = (e) => {
    if(this.state.makeSearch){
      this.setState({
        [e.target.name]: e.target.value,
        makeSearch: false
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  };

  handleRadioChange = e => {
    this.setState({
      ...this.state,
      metrics: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      makeSearch: !this.state.makeSearch
    });
  };

  newFunc = position => {
    this.setState(
      {
        lat: position.coords.latitude,
        long: position.coords.longitude
      },
      () => {
        this.fetchWeatherData();
      }
    );
  };

  componentDidMount = () => {
    this.getCurrentPosition();
  };

  getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.newFunc);
    }
  };

  generateApiUrlOnLocation = () => {
    return `http://api.openweathermap.org/data/2.5/weather?lat=${
      this.state.lat
    }&lon=${this.state.long}&units=${
      this.state.metrics
    }&APPID=dcfd76e3d19d7279f127a7758065f52b`;
  };

  fetchWeatherData = async () => {
    const locationUrl = this.generateApiUrlOnLocation();

    const data = await fetch(locationUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Oh shit, it broke`);
        }
        return res.json();
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error(error);
      });

    this.setState({
      weather: data
    });
  };

  render() {
    const { weather, makeSearch } = this.state;
    let render;

    if (makeSearch) {
      render = <SearchWeather search={this.state} />;
     
    } else {
      render = (
        <div>
        {weather ? (
          <div>
            <ul>
              <li>{weather ? weather.name : ""}</li>
              <li>Temp {weather ? weather.main.temp : ""} Degrees</li>
              <li>Humidity {weather ? weather.main.humidity : ""}%</li>
              <li>Windyness {weather ? weather.wind.speed : ""}</li>
            </ul>
          </div>
        ) : (
          <h3>Loading…</h3>
        )}
        </div>
      )
    }

    return (
      <div className="App">
        <h1>WeatherYouLikeItOrNot</h1>
        <form action="" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="search"
            placeholder="Search.."
            value={this.state.search}
          />
          <button onClick={this.handleSubmit}>Search</button>
          <button onClick={this.getCurrentPosition}>Get Your Weather</button>
        </form>
        <input
          type="radio"
          onChange={this.handleRadioChange}
          name="metric"
          id=""
          value="metric"
        />
        Celsius
        <input
          type="radio"
          onChange={this.handleRadioChange}
          name="metric"
          id=""
          value="imperial"
        />
        Farenheit
        {render}
      </div>
    );
  }
}

export default App;

// const weatherUrl = `https://api.darksky.net/forecast/bd15d4ef9c6dab656232c5a683871f43/${locationCoords}`;

// https://api.darksky.net/forecast/6717fd57a649cbc6426e8cef4725f20d/37.8267,-122.4233
// 6717fd57a649cbc6426e8cef4725f20d

// http://www.mapquestapi.com/geocoding/v1/address?key=KEY&location=1600+Pennsylvania+Ave+NW,Washington,DC,20500
