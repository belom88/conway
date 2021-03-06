import React from 'react';
import ReactDOM from 'react-dom';
import Panel from 'es6!react_comps/panel';
import Board from 'es6!react_comps/board';
import $ from 'jquery';

class App extends React.Component {
    constructor(props){
        super(props);
        this.changeDimensionsHandler = this.changeDimensionsHandler.bind(this);
        this.getBackward = this.getBackward.bind(this);
        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.changeMatrixState = this.changeMatrixState.bind(this);
        this.state = {started: false, N: 10, M: 10};
        this._matrixState = 0;
    }

    changeDimensionsHandler(name, value){
        let obj = new Object();
        obj[name] = value;
        this.setState(obj);
    }

    startGame(){
        this.setState({started: true});
    }

    stopGame(){
        this.setState({started: false});
    }

    changeMatrixState(state){
        this._matrixState = state;
    }

    getBackward(){
        let self = this;
        $.ajax({
                type: "POST",
                url: "/backward"
            })
                .done(function(response) {
                    self.setState({initMatrix: response.matrix});
                })
                .fail(function(error){
                    self.setState({initMatrix: null});
                });
    }

    render() {
        const started = this.state.started;
        const N = this.state.N;
        const M = this.state.M;
        const initMatrix = this.state.initMatrix;
        this.state.initMatrix = null;
        const initMatrixObj = {
            matrix: initMatrix,
            state: this._matrixState
        }

        return (
            <div>
                <Panel onChange={this.changeDimensionsHandler} onStart={this.startGame} onStop={this.stopGame}
                       onBackward={this.getBackward} started={started} N={N} M={M}/>
                <Board initMatrix={initMatrixObj} started={started} N={N} M={M} onStopGame={this.stopGame} 
                    onStateChange={this.changeMatrixState}/>
            </div>
        );
    }
}

const element = (
    <App />
);
ReactDOM.render(
    element,
    document.body
);
