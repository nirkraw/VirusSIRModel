import React, { Component } from 'react'

export default class People extends Component {
    constructor(props) {
        super(props)
        
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;

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

    }


    render() {
        return (
            <div></div>
        )
    }
}
