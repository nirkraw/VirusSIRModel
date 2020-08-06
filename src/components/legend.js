import React, { Component } from 'react'
import legendCSS from "../style/legend.css"

export default class Legend extends Component {
    render() {
        return (
          <div className="legend-div">
            <div className="category-div">
              <h3>Suceptible</h3>
              <div className="blue-box"></div>
            </div>
            <div className="category-div">
              <h3>Infected</h3>
              <div className="red-box"></div>
            </div>
            <div className="category-div">
              <h3>Recovered</h3>
              <div className="green-box"></div>
            </div>
            <div className="category-div">
              <h3>Deceased</h3>
              <div className="black-box"></div>
            </div>
          </div>
        );
    }
}
