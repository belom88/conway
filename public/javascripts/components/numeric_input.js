import React from 'react';
import ReactDOM from 'react-dom';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: this.props.value};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let value = parseInt(event.target.value.length ? event.target.value : 0);
        if (!isNaN(value) && value >= 0 && value <= 100) {
            this.setState({value: value});
            this.props.onChange(this.props.name, value);
        } else {
            event.preventDefault();
        }
    }

    handleKeyDown(event) {
        let value = parseInt(event.target.value);
        if (isNaN(value) || value < 0 || value > 100) {
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className="conway-control-group">
                <label>{this.props.label}</label>
                <input name={this.props.name} id={this.props.id} type="text" value={this.state.value}
                       disabled={this.props.disabled ? "false" : false}
                       onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
            </div>
        );
        //
    }
}

export default Input;