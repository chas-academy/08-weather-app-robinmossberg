import React, { Component } from "react";
import "./App.css";
import SearchWeather from "./components/SearchWeather";


class App extends Component {
  state = {
    search: "",
    metrics: "metric",
    makeSearch: false,
    lat: null,
    long: null
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
      metrics: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      makeSearch: true,
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
      render = <SearchWeather ref="child" search={this.state}/>;     
      this.refs.child.apiCalls();
    } else if (lat && long) {
      render = <SearchWeather ref="child" search={this.state} />;
    } else {
      render = <div>Loading..</div>
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