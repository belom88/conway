import React from 'react';
import ReactDOM from 'react-dom';

class Cell extends React.Component {
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        this.state = {};
    }

    clickHandler(event){
        let newLiveStatus = !this.props.live;
        if (!this.props.disabled) {
            this.props.onChange(this.props.offsetX, this.props.offsetY, newLiveStatus);
        }
    }

    render() {
        const divStyle = {
            left: this.props.offsetX * 40,
            top: this.props.offsetY * 40
        };

        return (
            <div className={"conway-cell " + (this.props.live ? "conway-cell-live" : "conway-cell-dead")}
                 onClick={this.clickHandler} style={divStyle} >&nbsp;</div>
        );
    }
}

export default Cell;