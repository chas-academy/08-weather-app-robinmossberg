import React, { Component } from "react";

class WeatherApi extends Component {
  

  componentDidMount() {
    let currentPos = navigator.geolocation.getCurrentPosition(function(
      position
    ) {
      return position.coords.latitude, position.coords.longitude;
    });

    currentPos = currentPos.toFixed(4);

    const locationUrl = `http://www.mapquestapi.com/geocoding/v1/reverse?key=ezG2yDEhc5K56zG4kB9vLVMWFi8pwgrt&location=${currentPos}`;

    fetch(locationUrl)
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        // let locationCoords = response.results[0].locations[0].latLng;
        // locationCoords = `${locationCoords.lat},${locationCoords.lng}`;
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${
          this.state.search
        }&units=metric&APPID=dcfd76e3d19d7279f127a7758065f52b`;
        fetch(weatherUrl)
          .then(data => {
            return data.json();
          })
          .then(data => {
            this.setState({
              currentWeather: {
                ...data
              }
            });
          });
      })
      .catch(error => {
        console.log(error, "something went wrong");
      });
  }

  render() {
    return <div>Stuff</div>;
  }
}

export default WeatherApi;
