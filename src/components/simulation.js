import React, { Component } from "react";
import Canvas from "./canvas";

export default class Simulation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulationActive: false,
      mortality: 2,
      virality: 10,
      totalDeaths: 0,
      confirmedCases: 0,
      recovered: 0,
      people: this.props.people
    };

    this.canvas = {
      height: 150,
      width: 300,
    };

    this.startSimulation = this.startSimulation.bind(this);
    this.updateMortality = this.updateMortality.bind(this);
    this.updateVirality = this.updateVirality.bind(this);
  }

  updateMortality(e) {
    this.setState({ mortality: e.currentTarget.value });
  }

  updateVirality(e) {
    this.setState({ virality: e.currentTarget.value });
  }

  startSimulation() {
    this.setState({ simulationActive: true });
  }

  movePeople() {
    let currentDeaths = 0;
    let currentInfected = 0;
    let currentRemoved = 0;

    for (let c = 0; c < this.props.peopleColumnCount; c++) {
      for (let r = 0; r < this.props.peopleRowCount; r++) {
        let person = this.props.people[c][r];
        if (person.color === "red") {
          //checks for color rather than infection in order to account for starting infection
          person.infect();
          if (!person.immune && this.outcomeCreater(this.state.mortality)) {
            //run infection mortality on starting infections
            person.terminalCase = true;
          }
          currentInfected++;
          if (
            person.x + person.dx > this.canvas.width ||
            person.x + person.dx < 0
          ) {
            person.dx = -person.dx;
          }

          if (
            person.y + person.dy > this.canvas.height ||
            person.y + person.dy < 0
          ) {
            person.dy = -person.dy;
          }

          person.x += person.dx;
          person.y += person.dy;

          this.infectNeighbors(person);
        }
        if (person.dead) {
          currentDeaths++;
        }
        if (person.removed) {
          currentRemoved++;
        }
      }
    }
    if (currentInfected === 0) {
      this.setState({
        simulationActive: false,
        totalDeaths: currentDeaths,
        confirmedCases: currentInfected + currentRemoved,
        recoveredCases: currentRemoved - currentDeaths,
      });
    } else {
      this.setState({
        people: this.props.people,
        totalDeaths: currentDeaths,
        confirmedCases: currentInfected + currentRemoved,
        recoveredCases: currentRemoved - currentDeaths,
      });
    }
  }

  infectNeighbors(person) {
    for (let c1 = 0; c1 < this.props.peopleColumnCount; c1++) {
      for (let r1 = 0; r1 < this.props.peopleRowCount; r1++) {
        let neighbor = this.props.people[c1][r1];

        if (
          this.isCollision(person, neighbor) &&
          this.outcomeCreater(this.state.virality) &&
          !neighbor.immune
        ) {
          neighbor.infect();
          if (this.outcomeCreater(this.state.mortality)) {
            neighbor.terminalCase = true;
          }
        } else if (this.isCollision(person, neighbor) && !neighbor.immune) {
          neighbor.immune = true;
        }
      }
    }
  }

  isCollision(person, neighbor) {
    return (
      person.x > neighbor.x &&
      person.x < neighbor.x + person.width &&
      person.y > neighbor.y &&
      person.y < neighbor.y + person.height
    );
  }

  outcomeCreater(probability) {
    return 1 === Math.ceil(Math.random(10) * (100 / probability));
  }

  render() {
    if (this.state.simulationActive) {
      //consider have the set interval in start Sim instead
      setInterval(() => {
        this.movePeople();
      }, 100);
    }
    return (
      <div>
        <label>
          Virality
          <input
            type="number"
            min="1"
            max="100"
            className="virality-input"
            value={this.state.virality}
            onChange={this.updateVirality}
          />
        </label>
        <label>
          Mortality
          <input
            type="number"
            min="1"
            max="100"
            className="mortality-rate-input"
            value={this.state.mortality}
            onChange={this.updateMortality}
          />
        </label>
        {!this.state.simulationActive ? (
          <button onClick={this.startSimulation}>Start Simulation</button>
        ) : (
          <div></div>
        )}
        <button onClick={() => window.location.reload()}>New Simulation</button>
        <h1>Total Deaths: {this.state.totalDeaths}</h1>
        <h1>Confirmed Cases: {this.state.confirmedCases}</h1>
        <h1>Total Recovered : {this.state.recoveredCases}</h1>
        <Canvas
          people={this.state.people}
          peopleColumnCount={this.props.peopleColumnCount}
          peopleRowCount={this.props.peopleRowCount}
        />
      </div>
    );
  }
}
