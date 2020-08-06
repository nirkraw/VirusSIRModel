import React, { Component } from 'react'
import Canvas from "./canvas";
import People from "./people";

export default class Map extends Component {
    constructor(props) {
        super(props)
        this.people = [];
        this.peopleColumnCount = 10;
        this.peopleRowCount = 10;
    }

    componentDidMount() {
        
    }

    populateMap() {
        for(let c = 0; c < this.peopleColumnCount; c++) {
            this.people[c] = [];
            for (let r = 0; r < this.peopleRowCount; r++) {
                this.people[c][r] = new People();
                let person = this.people[c][r];
                person.x = r * (person.width + person.paddingLeft) + person.offsetLeft;
                person.y = c * (person.height + person.paddingTop) + person.offsetTop;
            }
        }
 
    }

    render() {
        this.populateMap();
        return (
            <div>
                <Canvas people = {this.people}
                peopleColumnCount ={this.peopleColumnCount}
                peopleRowCount = {this.peopleRowCount}/>
            </div>
        )
    }
}
