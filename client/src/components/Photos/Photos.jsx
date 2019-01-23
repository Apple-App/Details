import React from 'react';
import { Component } from 'react';

import Header from '../BuildingBlocks/Header.jsx';
import Image from './Image.jsx';
import Dots from './Dots.jsx';
import Carousel from './Carousel.jsx';
import Link from '../BuildingBlocks/Link.jsx';

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: props.movieData.Photos.Links,
      activePage: 0,
      elements: [],
      sliderDirection: 'right'
    };
    this.count = this.state.links.length;
    this.handleDotClick = this.handleDotClick.bind(this);
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.setActiveDotClass = this.setActiveDotClass.bind(this);
    this.setImageElements = this.setImageElements.bind(this);
  }

  createImageElements() {
    const elements = this.state.links.map((link, i) => {
      return <Image key={i} link={link} />;
    });
    this.setState({
      elements: elements
    });
  }

  setImageElements() {
    let start = this.state.activePage * 4;
    let output = [];
    for (var i = start; i < start + 4; i++) {
      output.push(this.state.elements[i]);
    }
    return output;
  }

  setActiveDotClass(renderedDot) {
    return this.state.activePage === Number(renderedDot) ? 'active_dot' : null;
  }

  handleDotClick(clickedDot, isActive) {
    const activePage = this.state.activePage;
    if (isActive !== 'active_dot') {
      this.setState({
        activePage: Number(clickedDot),
        sliderDirection: clickedDot < activePage ? 'left' : 'right'
      });
    }
  }

  handleArrowClick(direction) {
    const activePage = this.state.activePage;
    const max = Math.ceil(this.props.movieData.Photos.Links.length / 4) - 1;
    // console.log(max);
    const min = 0;
    let setTo;

    if (direction === 'left') {
      setTo = activePage === min ? max : activePage - 1;
    } else if (direction === 'right') {
      setTo = activePage === max ? min : activePage + 1;
    }

    this.setState({
      activePage: setTo,
      sliderDirection: direction
    });
  }

  componentWillMount() {
    this.createImageElements();
  }

  render() {
    return (
      <section id="Photos">
        <div className="column">
          <div className="content_panel">
            <Header title={this.props.movieData.Title} section={'PHOTOS'} />
            <Dots
              links={this.state.links}
              handleDotClick={this.handleDotClick}
              setActiveDotClass={this.setActiveDotClass}
            />
            <Carousel
              handleArrowClick={this.handleArrowClick}
              left={'left'}
              right={'right'}
              sliderDirection={this.state.sliderDirection}
              setImageElements={this.setImageElements}
            />
            <Link count={this.count} section={'Photos'} />
          </div>
        </div>
      </section>
    );
  }
}

export default Photos;
