import React from 'react'
import * as helpers from '../redux/dbhelpers.js'

export default class Note extends React.Component {
  constructor(){
    super()
    this.touchFiredTime = 0;
  }

  static propTypes = {
    number:          React.PropTypes.number.isRequired,
    cx:              React.PropTypes.string,
    cy:              React.PropTypes.string,
    transformCircle: React.PropTypes.string,
    transformText:   React.PropTypes.string,
    sound:           React.PropTypes.string,
    outerCircle:     React.PropTypes.bool
  }

  static defaultProps = {
    outerCircle: true,
    cx:              "500",
    cy:              "500",
    transformCircle: "rotate(-89.88 43.81 500.48)",
    transformText:   "translate(34.1 59.78)"
  }

  render() {
    const {number, outerCircle, sound, cx, cy, transformText,transformCircle} = this.props;

    let inner = (
        <g className={"group-"+ number +"-inner"}
          onMouseEnter={!outerCircle && sound ? e => {
            let timeSinceTouch = (Date.now() - this.touchFiredTime);
            if (timeSinceTouch < 300) return;
            helpers.playSound(sound, true)
          } : ''}
          onTouchStart={!outerCircle && sound ? e => {
            this.touchFiredTime = Date.now();
            helpers.playSound(sound, true)
          } : ''}
          onTouchEnd={sound ? event => helpers.stopSound(sound) : ''}
          onMouseLeave={sound ? event => helpers.stopSound(sound) : ''}>
          <circle className="cls-4" cx={cx} cy={cy} r="41.81" transform={transformCircle}/>
          <text className="cls-5" transform={transformText}>{number}</text>
        </g>
      );

    if (outerCircle) {
      return (
        <g className={"group-" + number}
          onMouseEnter={sound ? e => {
            let timeSinceTouch = (Date.now() - this.touchFiredTime);
            if (timeSinceTouch < 300) return;
            helpers.playSound(sound, true)
          } : ''}
          onTouchStart={sound ? e => {
            this.touchFiredTime = Date.now();
            helpers.playSound(sound, true)
          } : ''}
          onTouchEnd={sound ? event => helpers.stopSound(sound) : ''}
          onMouseLeave={sound ? event => helpers.stopSound(sound) : ''}>
          <circle className="cls-1" cx={cx} cy={cy} r="70.08" transform={transformCircle}/>
          {inner}
        </g>
      );
    }
    else {
      return inner;
    }
  }
}

