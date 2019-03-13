import React, { Component } from "react";
import "./App.css";
import WeatherApi from "./components/WeatherApi";
import SearchWeather from "./components/SearchWeather";

class App extends Component {
  state = {
    search: "",
    metrics: "metric",
    makeSearch: false,
  };

  handleInputChange = e => {
    this.setState({
      ...this.state,
      search: e.target.value
    });
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
      ...this.state,
      makeSearch: true
    })
    
  };

  render() {
  
    let displayWeather = this.state.currentWeather;
    let searched;

    
      if(this.state.makeSearch){
        searched = <SearchWeather search={this.state}/>;
        // this.setState{(
        //   ...this.state,
        //   makeSearch: false
        // )}
        debugger;
      }
    

    if (displayWeather) {
      
    //   function convertUnixUp() {
    //     sunrise = new Date(displayWeather.sys.sunrise * 1000);
    //     let hours = sunrise.getHours();
    //     let minutes = "0" + sunrise.getMinutes();
    //     sunrise = hours + ':' + minutes.substr(-2)
    //     return sunrise;
    // }
    // convertUnixUp();
    //   function convertUnixDown() {
    //     sunset = new Date(displayWeather.sys.sunset * 1000);
    //     let hours = sunset.getHours();
    //     let minutes = "0" + sunset.getMinutes();
    //     sunset = hours + ':' + minutes.substr(-2)
    //     return sunset;
    // }
    // convertUnixDown();
      
    }
    return (
      <div className="App">
        <h1>WeatherYouLikeItOrNot</h1>
        <form action="" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInputChange}
            type="text"
            placeholder="Search.."
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
        {searched}
      </div>
    );
  }
}

export default App;

// const weatherUrl = `https://api.darksky.net/forecast/bd15d4ef9c6dab656232c5a683871f43/${locationCoords}`;

// https://api.darksky.net/forecast/6717fd57a649cbc6426e8cef4725f20d/37.8267,-122.4233
// 6717fd57a649cbc6426e8cef4725f20d

// http://www.mapquestapi.com/geocoding/v1/address?key=KEY&location=1600+Pennsylvania+Ave+NW,Washington,DC,20500
