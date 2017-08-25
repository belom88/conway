import React from 'react';
import ReactDOM from 'react-dom';
import Cell from  'es6!react_comps/cell';
import $ from 'jquery';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.changeCellHandler = this.changeCellHandler.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.state={started: this.props.started, matrixState: 0, M: this.props.M, N: this.props.N};
        this._blankMatrix();
        this._requestInProgress = false;
        this._started = this.props.started;
        this._M = this.props.M;
        this._N = this.props.N;
    }

    changeCellHandler(offsetX, offsetY, live){
        let self = this;
        this.matrix[offsetX][offsetY] = live;
        this.setState((prevState, props) => {
            self.props.onStateChange(prevState.matrixState+1);
            return {matrixState: prevState.matrixState+1}
        });
        
    }

    _blankMatrix() {
        this.setState({matrixState: 0});
        this.props.onStateChange(0);
        this.matrix = new Array()
        for (let i = 0; i < this.props.M; i++) {
            let row = new Array();
            for (let j = 0; j < this.props.N; j++) {
                row.push(false);
            }
            this.matrix.push(row);
        }
    }
    
    _setInitMatrix(initMatrix) {
        if (!initMatrix || !initMatrix.length) return;
        for (let i = 0; i < this.props.M; i++) {
            for (let j = 0; j < this.props.N; j++) {
                if (i<initMatrix.length && j<initMatrix[0].length) {
                    this.matrix[i][j] = initMatrix[i][j];
                }
            }
        }
    }

    sendRequest() {
        let self = this;
        if (!this._requestInProgress) {
            this._requestInProgress = true;
            $.ajax({
                type: "POST",
                url: "/do-game",
                data: {
                    matrix: JSON.stringify(this.matrix)
                }
            })
                .done(function(response) {
                    self.matrix = response.matrix;
                    self.setState((prevState, props) => {
                        self.props.onStateChange(prevState.matrixState+1);
                        return {matrixState: prevState.matrixState+1}
                    });
                    self._requestInProgress = false;
                    if (response.stop_game) self.stopGame();
                })
                .fail(function(error){
                    self.stopGame();
                    self._requestInProgress = false;
                });
        }
    }

    stopGame(){
        this.props.onStopGame();
    }

    render() {
        if (this._M != this.props.M) {
            this._M = this.props.M;
            this._blankMatrix();
        }

        if (this._N != this.props.N) {
            this._N = this.props.N;
            this._blankMatrix();
        }

        if (this._started != this.props.started) {
            if (this._started) {
                this.requestInProgress = false;
                if (this.intervalId) clearInterval(this.intervalId);
            } else {
                this.intervalId = setInterval(this.sendRequest, 600);
            }
            this._started = this.props.started;
        }

        if (this.props.initMatrix && this.props.initMatrix.state == this.state.matrixState) {
            this._setInitMatrix(this.props.initMatrix.matrix);
        }

        const cells = new Array();
        for (let i = 0; i < this.matrix.length; i++) {
            let row = this.matrix[i];
            for (let j = 0; j < row.length; j++) {
                cells.push(<Cell disabled={this.props.started} offsetX={i} offsetY={j} live={row[j]} onChange={this.changeCellHandler}/>);
            }
        }
        return (<div className="conway-board">{cells}</div>);
    }
}

export default Board;