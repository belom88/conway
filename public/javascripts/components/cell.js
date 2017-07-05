import React from 'react';
import ReactDOM from 'react-dom';

class Cell extends React.Component {
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        this.state = {live: this.props.live};
    }

    clickHandler(event){
        let newState = !this.state.live;
        if (!this.props.disabled) {
            this.setState({live: newState});
            this.props.onChange(this.props.offsetX, this.props.offsetY, newState);
        }
    }

    render() {
        const divStyle = {
            left: this.props.offsetX * 40,
            top: this.props.offsetY * 40
        };
        if (this.state.live != this.props.live) this.state.live = this.props.live;

        return (
            <div className={"conway-cell " + (this.props.live ? "conway-cell-live" : "conway-cell-dead")}
                 onClick={this.clickHandler} style={divStyle} >&nbsp;</div>
        );
    }
}

export default Cell;