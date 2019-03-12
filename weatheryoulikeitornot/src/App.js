import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    search: "",
    metrics: "metric"
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

  // componentDidMount() {

  //   let currentPos = navigator.geolocation.getCurrentPosition(function(position) {
  //     return (position.coords.latitude, position.coords.longitude);
  //   });

  //   currentPos = currentPos.toFixed(4);

  //   const locationUrl = `http://www.mapquestapi.com/geocoding/v1/reverse?key=ezG2yDEhc5K56zG4kB9vLVMWFi8pwgrt&location=${
  //     currentPos
  //   }`;

  //   fetch(locationUrl)
  //     .then(response => {
  //       console.log(locationUrl)
  //       return response.json();
  //     })
  //     .then(response => {
  //       console.log(response)
  //       // let locationCoords = response.results[0].locations[0].latLng;
  //       // locationCoords = `${locationCoords.lat},${locationCoords.lng}`;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  handleSubmit = event => {
    event.preventDefault();
    
  };

  render() {
    let temp;
    let humidity;
    let location;
    let sunrise;
    let sunset;
    let displayWeather = this.state.currentWeather;

    if (displayWeather) {
      location = displayWeather.name
      temp = displayWeather.main.temp + 'C'
      humidity = displayWeather.main.humidity + '%'
      
      function convertUnixUp() {
        sunrise = new Date(displayWeather.sys.sunrise * 1000);
        let hours = sunrise.getHours();
        let minutes = "0" + sunrise.getMinutes();
        sunrise = hours + ':' + minutes.substr(-2)
        return sunrise;
    }
    convertUnixUp();
      function convertUnixDown() {
        sunset = new Date(displayWeather.sys.sunset * 1000);
        let hours = sunset.getHours();
        let minutes = "0" + sunset.getMinutes();
        sunset = hours + ':' + minutes.substr(-2)
        return sunset;
    }
    convertUnixDown();
      
      // humidity = displayWeather. 
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
        <ul>
          <li>{location || ''}</li>
          <li>{temp || ''}</li>
          <li>{humidity || ''}</li>
          <li>{sunrise || ''}</li>
          <li>{sunset || ''}</li>
        </ul> 
      </div>
    );
  }
}

export default App;

// const weatherUrl = `https://api.darksky.net/forecast/bd15d4ef9c6dab656232c5a683871f43/${locationCoords}`;

// https://api.darksky.net/forecast/6717fd57a649cbc6426e8cef4725f20d/37.8267,-122.4233
// 6717fd57a649cbc6426e8cef4725f20d

// http://www.mapquestapi.com/geocoding/v1/address?key=KEY&location=1600+Pennsylvania+Ave+NW,Washington,DC,20500
