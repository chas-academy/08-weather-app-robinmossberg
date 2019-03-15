import React, { Component } from "react";

export class Forecast extends Component {
  constructor(props) {
    super(props);
    this.forecast = this.props.forecast.forcast.list;
    this.state = {
      todaysForecast: [],
      weekForecast: []
    }
  }
  
  componentDidMount() {


    let todaysForecastArr= [];
    let weekForecastArr = []
    for(let i = 1; i< 8; i++){
      todaysForecastArr.push(this.forecast[i])
    }
    this.setState({
      todaysForecast: todaysForecastArr
    })


    this.forecast.map((index, time) => {
      let substring = "12:00:00";
      let i = index.dt_txt;
      if (i.includes(substring)) {
        weekForecastArr.push(index)
        }
      }
    );
    this.setState({
      weekForecast: weekForecastArr
    })

  }

  render() {
    const { todaysForecast, weekForecast } = this.state;
    let threeHoureWeather;
    let weekForecastRend;


    if(!this.state.todaysForecast){
      threeHoureWeather = <div>Loading..</div>
    } else {
      threeHoureWeather = todaysForecast.map((data, i) =>{
        return (
          <div key={i}>
              <li>{data.dt_txt}</li>
              <li>{data.main.temp}</li>
              <li>{data.weather[0].description}</li>
          </div>
        )
      })
    }
    if(!this.state.weekForecast){
      weekForecastRend = <div>Loading..</div>
    } else {
      weekForecastRend = weekForecast.map((data, i) =>{
        return (
          <div key={i}>
              <li>{data.dt_txt}</li>
              <li>{data.main.temp}</li>
              <li>{data.weather[0].description}</li>
          </div>
        )
      })
    }

    console.log(this.state)
    // debugger;


      return (
        <div>
          <ul>
            {threeHoureWeather}
          </ul>
          <ul>
            {weekForecastRend}
          </ul>
        </div>
      )
    }

    
  
}

export default Forecast;
