import React from 'react';
import ReactDOM from 'react-dom';
import NumericInput from 'es6!react_comps/numeric_input';

class Panel extends React.Component {
    constructor(props){
        super(props);
        this.changeFormValueHandler = this.changeFormValueHandler.bind(this);
        this.clickStartHandler = this.clickStartHandler.bind(this);
        this.clickBackwardHandler = this.clickBackwardHandler.bind(this);
        this.state = {started: this.props.started, N: this.props.N, M: this.props.M};
    }

    changeFormValueHandler(name, value){
        let obj = new Object();
        obj[name] = value;
        this.setState(obj);
        this.props.onChange(name, value);
    }

    clickStartHandler(event){
        if (this.state.started) {
            this.props.onStop();
            this.setState({started: !this.state.started});
        } else {
            if (this.state.N > 0 && this.state.M > 0) {
                this.props.onStart();
                this.setState({started: !this.state.started});
            }
        }
    }

    clickBackwardHandler(event){
        if (!this.state.started) {
            //request previous position from server
            this.props.onBackward();
        }
    }

    render() {
        const N = this.state.N;
        const M = this.state.M;
        if (this.props.started != this.state.started) this.setState({started: this.props.started});

        return (
            <div className="conway-panel-inline">
                <NumericInput label="N: " name="N" id="N" value={N} onChange={this.changeFormValueHandler}
                              disabled={this.props.started} />
                <NumericInput label="M: " name="M" id="M" value={M} onChange={this.changeFormValueHandler}
                              disabled={this.props.started} />
                <button className={"conway-btn " + (this.props.started ? "conway-btn-pressed" : "")} type="button"
                        onClick={this.clickStartHandler}>{this.props.started ? "Stop" : "Start"}</button>
                <button className={"conway-btn " + (this.props.started ? "conway-btn-pressed" : "")} type="button" 
                        onClick={this.clickBackwardHandler}>Backward</button>
            </div>
        );
    }
}

export default Panel;