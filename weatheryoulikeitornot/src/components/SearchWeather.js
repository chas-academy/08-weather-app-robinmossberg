import React, { Component } from "react";
import Forecast from './Forecast';

export class SearchWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState: null
    };
  }
  
  componentDidMount() {
    this.apiCalls()
  }

  
    apiCalls = () =>{
      console.log('SearchWeather apiCalls')
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
        if(!props.search.makeSearch){
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

      if(!props.search.makeSearch){
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
    console.log('SearchWeather render')

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
              <li>{weather.name}</li>
              <li>Temp { weather.main.temp} Degrees</li>
              <li>Humidity {weather.main.humidity}%</li>
              <li>Windyness { weather.wind.speed}</li>
              <li>Sunrise {dayLight[0]} Sunset {dayLight[1]}</li>
            </ul>
            <Forecast forecast={this.state}/>
          </div>
        );

    }

  }
}

export default SearchWeather;
