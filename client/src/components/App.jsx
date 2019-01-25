import React from 'react';
import { Component } from 'react';
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
    } else if (this.props.movieData.Title !== undefined) {
      return (
        <>
          <Videos movieData={this.props.movieData} />
          <Photos movieData={this.props.movieData} />
          <Description movieData={this.props.movieData} />
          <Times movieData={this.props.movieData} />
        </>
      );
    } else {
      return <div>Hello</div>;
    }
  }
}
export default App;
