import react, { Component } from React;

export class SearchWeather extends Component {
    componentDidMount(){
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${
            this.state.search
            }&units=${this.state.metrics}&APPID=dcfd76e3d19d7279f127a7758065f52b`;
    fetch(weatherUrl)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          currentWeather: {
            ...data,            
          }
        });
        console.log(this.state);
      })
      .catch(error => {
        console.log(error, "something went wrong");
      });
    }
    
    

    render(){
        return;
    }
}

export default SearchWeather;