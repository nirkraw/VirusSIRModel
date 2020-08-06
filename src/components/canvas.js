import React, { Component } from 'react'
import canvasCSS from "../style/canvas.css"; 

export default class Canvas extends Component {
    componentDidMount() {
        this.updateCanvas();
        this.drawMap();
    }

    updateCanvas() {
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext("2d");
    }

    drawMap() {
        for(let c = 0; c < this.props.peopleColumnCount; c++) {
            for (let r = 0; r < this.props.peopleRowCount; r++) {
                let person = this.props.people[c][r];
                this.ctx.beginPath();
                this.ctx.rect(person.x, person.y, person.width, person.height);
                this.ctx.fillStyle = person.color;
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let c = 0; c < this.props.peopleColumnCount; c++) {
          for (let r = 0; r < this.props.peopleRowCount; r++) {
            let person = this.props.people[c][r];

            this.ctx.beginPath();
            this.ctx.rect(person.x, person.y, person.width, person.height);
            this.ctx.fillStyle = person.color;
            this.ctx.fill();
            this.ctx.closePath();
          }
        }
    }

    render() {
        if (this.ctx) this.draw();
        return (
          <div>
            <canvas ref="canvas" id="canvas"></canvas>
          </div>
        );
    }
}
