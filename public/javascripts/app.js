import React from 'react';
import ReactDOM from 'react-dom';
import Panel from 'es6!react_comps/panel';
import Board from 'es6!react_comps/board';

class App extends React.Component {
    constructor(props){
        super(props);
        this.changeDimensionsHandler = this.changeDimensionsHandler.bind(this);
        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.state = {started: false, N: 10, M: 10};
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

    render() {
        const started = this.state.started;
        const N = this.state.N;
        const M = this.state.M;

        return (
            <div>
                <Panel onChange={this.changeDimensionsHandler} onStart={this.startGame} onStop={this.stopGame}
                       started={started} N={N} M={M}/>
                <Board started={started} N={N} M={M} onStopGame={this.stopGame} />
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
