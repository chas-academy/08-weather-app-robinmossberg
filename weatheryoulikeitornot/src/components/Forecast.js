import React, {Component} from React;

export class Forecast extends Component{

    componentDidMount() {
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${
          this.intitSearch.search
        }&units=${this.intitSearch.metrics}&APPID=dcfd76e3d19d7279f127a7758065f52b`;
        fetch(weatherUrl)
          .then(data => {
            return data.json();
          })
          .then(data => {
              debugger
            this.setState({
                data  
            });
            console.log(this.state);
          })
          .catch(error => {
            console.log(error, "something went wrong");
          });
      }


    render(){

    }
}