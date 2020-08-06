import React, { Component } from 'react'

export default class People extends Component {
    constructor(props) {
        super(props)
        
        this.x = 0;
        this.y = 0;
        this.dx = Math.random(2) / 2;;
        this.dy = Math.random(2) / 2;;

        this.suceptible = true;
        this.infected = false;
        this.removed = false; 
        
        this.color = "blue";
        this.width = 10;
        this.height = 5;
        this.paddingTop = 10;
        this.paddingLeft = 20;
        this.offsetTop = 5;
        this.offsetLeft = 8;

        this.immune = false;
        this.terminalCase = false; 
        this.dead = false;

    }

    infect() {
        this.suceptible = false;
        this.infected = true;
        this.color = "red";
        setTimeout(() => {
            this.remove()
        }, 4000);
    }

    remove() {
        this.infected = false;
        this.removed = true;
        if(this.terminalCase) {
            this.dead = true;
            this.color = "black";
        } else {
            this.immune = true
            this.color = "green"
        }
    }

    render() {
        return (
            <div></div>
        )
    }
}
