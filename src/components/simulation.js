import React, { Component } from 'react'
import Canvas from "./canvas";

export default class Simulation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            simulationActive: false,
            mortality: 2,
            virality: 10,
            totalDeaths: 0,
            confirmedCases: 0,
            recovered: 0
        }

        this.startSimulation = this.startSimulation.bind(this);
    }

    updateMortality(e) {
        this.setState({mortality: e.currentTarget.value})
    }

    updateViraliry(e) {
        this.setState({viraliry: e.currentTarget.value})
    }

    startSimulation() {
        this.setState({simulationActive: true})
    }



    render() {
        return (
          <div>
            <label>
              {" "}
              Virality
              <input
                className="virality-input"
                type="number"
                min="1"
                max="99"
                value={this.state.virality}
                onChange={this.updateVirality}
              />
            </label>
            <label>
              {" "}
              Mortality
              <input
                className="mortality-input"
                type="number"
                min="1"
                max="99"
                value={this.state.mortality}
                onChange={this.updateMortality}
              />
            </label>
            {!this.state.simulationActive ? (
              <button onClick={this.startSimulation}>Start Simulation</button>
            ) : (
            <div></div>
            )}
            <Canvas
              people={this.props.people}
              peopleColumnCount={this.props.peopleColumnCount}
              peopleRowCount={this.props.peopleRowCount}
            />
          </div>
        );
    }
}
