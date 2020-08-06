import React, { Component } from 'react'
import People from "./people";
import Simulation from "./simulation";

export default class Map extends Component {
    constructor(props) {
        super(props)
        this.people = [];
        this.peopleColumnCount = 10;
        this.peopleRowCount = 10;
    }

    populateMap() {
        for(let c = 0; c < this.peopleColumnCount; c++) {
            this.people[c] = [];
            for (let r = 0; r < this.peopleRowCount; r++) {
                this.people[c][r] = new People();
                let person = this.people[c][r];
                person.x = r * (person.width + person.paddingLeft) + person.offsetLeft;
                person.y = c * (person.height + person.paddingTop) + person.offsetTop;
                this.assignRandomStartingInfections(person);
            }
        }
    }

    assignRandomStartingInfections(person) {
        if((Math.random()) < .03) { //assign aprox 3% of population with variance 
            person.color = "red"
        }
    }

    render() {
        this.populateMap();
        return (
          <div>
            <Simulation
              people={this.people}
              peopleColumnCount={this.peopleColumnCount}
              peopleRowCount={this.peopleRowCount}
            />
          </div>
        );
    }
}
