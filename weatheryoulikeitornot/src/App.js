import React, { Component } from "react";
import "./App.css";
import SearchWeather from "./components/SearchWeather";
import WeatherIcon from 'react-icons-weather';


class App extends Component {
  state = {
    search: "",
    metrics: "metric",
    makeSearch: false,
    lat: null,
    long: null
  };

  handleChange = e => {
    if (this.state.makeSearch) {
      this.setState({
        [e.target.name]: e.target.value,
        makeSearch: false
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  handleRadioChange = e => {
    this.setState({
      metrics: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      makeSearch: true
    });
  };

  setCoords = position => {
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
  };

  componentDidMount = () => {
    this.getCurrentPosition();
  };

  getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCoords);
    }
  };

  render() {
    const { makeSearch, lat, long } = this.state;
    let render;

    if (makeSearch) {
      render = <SearchWeather ref="child" search={this.state} />;
      this.refs.child.apiCalls();
    } else if (lat && long) {
      render = <SearchWeather ref="child" search={this.state} />;
    } else {
      render = <div>Loading..</div>;
    }

    return (
      <div className="App">
        <div className="">
          <h1>WeatherYouLikeItOrNot</h1>
          <form action="" onSubmit={this.handleSubmit}>
            <div className="row">
              <input
                className="input-field col s6 offset-s3"
                onChange={this.handleChange}
                type="text"
                name="search"
                placeholder="Search.."
                value={this.state.search}
              />
            </div>
            <button onClick={this.handleSubmit}>Search</button>
          </form>
          <form>
            <label>
              <input
                type="radio"
                onChange={this.handleRadioChange}
                name="metric"
                id=""
                value="metric"
              />
              <span>Celsius</span>
            </label>
            <label>
              <input
                type="radio"
                onChange={this.handleRadioChange}
                name="metric"
                id=""
                value="imperial"
              />
              <span>Farenheit</span>
            </label>
          </form>
          <div className="">{render}</div>
        </div>
      </div>
    );
  }
}

export default App;
