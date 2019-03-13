import React, { Component } from "react";
import "./App.css";
import SearchWeather from "./components/SearchWeather";

class App extends Component {
  state = {
    search: "",
    metrics: "metric",
    makeSearch: false,
    long: null,
    lat: null
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
    });
  };

  getCurrentPosition = () => {

    debugger;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback,errorCallback,{timeout:10000});
    }
      let successCallback = (position) => {
        console.log(position)
      }
      let errorCallback = (error) => {
        console.log(error)
      }


      // navigator.geolocation.getCurrentPosition(function(position) {
    //     var pos = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };
    //     console.log(pos)
     
    // }
  
    // navigator.geolocation.getCurrentPosition(position => 
    //   this.setState({
    //     long: position.coords.latitude, 
    //     lat: position.coords.longitude
    //   })
    // );
  
    let currentPos = this.state.lat+this.state.long;
  
    // currentPos = currentPos.toFixed(4);
  
    const locationUrl = `http://www.mapquestapi.com/geocoding/v1/reverse?key=ezG2yDEhc5K56zG4kB9vLVMWFi8pwgrt&location=${currentPos}`;
  
    fetch(locationUrl)
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        // let locationCoords = response.results[0].locations[0].latLng;
        // locationCoords = `${locationCoords.lat},${locationCoords.lng}`;
      })
      .catch(error => {
        console.log(error, "something went wrong");
      });
  }



  render() {
    let searched;

    if (this.state.makeSearch) {
      searched = <SearchWeather search={this.state} />;
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
