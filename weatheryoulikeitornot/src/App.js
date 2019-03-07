import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    search: ""
  };

  searchInput = e => {
    this.setState({
      search: e.target.value
    });
  };

  componentDidMount(){
  
    const url =
      "https://api.darksky.net/forecast/6717fd57a649cbc6426e8cef4725f20d/37.8267,-122.4233";
    fetch(url)      
        .then(response => {
          return response.json()
        })
        .then(response=>{
          console.log(response)
        })
        .catch(error=>{
          console.log(error, 'something went wrong')
        })
       
    
  }

  render() {
    return (
      <div className="App">
        <p>Yolo</p>
        <form action="" onSubmit={this.apiSearch}>
          <input type="text" onChange={this.searchInput} />
        </form>
        {this.state.search}
      </div>
    );
  }
}

export default App;

// https://api.darksky.net/forecast/6717fd57a649cbc6426e8cef4725f20d/37.8267,-122.4233
// 6717fd57a649cbc6426e8cef4725f20d
