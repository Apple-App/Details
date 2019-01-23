import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import ArrowButton from './ArrowButton.jsx';

const Carousel = ({
  handleArrowClick,
  left,
  right,
  sliderDirection,
  setImageElements
}) => {
  return (
    <div className="carousel">
      <ArrowButton left={left} handleArrowClick={handleArrowClick} />

      <div className="carousel_list">
        <CSSTransitionGroup
          transitionName={`${sliderDirection}slider`}
          transitionEnterTimeout={350}
          transitionLeaveTimeout={350}
        >
          {setImageElements()}
        </CSSTransitionGroup>
      </div>
      <ArrowButton right={right} handleArrowClick={handleArrowClick} />
    </div>
  );
};

export default Carousel;
