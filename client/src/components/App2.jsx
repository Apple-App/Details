import React from 'react';
import { Component } from 'react';
import axios from 'axios';

import Videos from './Videos/Videos.jsx';
import Photos from './Photos/Photos.jsx';
import Description from './Description/Description.jsx';
import Times from './Times/Times.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: {}
    };
    this.API_URL = 'http://ec2-18-235-34-167.compute-1.amazonaws.com/movie/';
    // this.API_URL = 'http://localhost:9002/movie/';
    this.movieId = document.location.search.split('?')[1] || 1;
  }
  getMovie() {
    axios
      .get(this.API_URL + this.movieId)
      .then(({ data }) => {
        this.setState({
          movieData: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.getMovie();
  }
  render() {
    if (this.state.movieData.Title !== undefined) {
      return (
        <>
          <Videos movieData={this.state.movieData} />
          <Photos movieData={this.state.movieData} />
          <Description movieData={this.state.movieData} />
          <Times movieData={this.state.movieData} />
        </>
      );
    } else {
      return <div>Hello</div>;
    }
  }
}
export default App;
