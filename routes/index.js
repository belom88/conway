let express = require('express');
let router = express.Router();
let _ = require('underscore');
let stateModel = require('../modules/state_model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Conway' });
});

router.post('/do-game', function(req, res, next) {

  let matrix = JSON.parse(req.body.matrix);

  let stopGame = true;
  let newMatrix = new Array();
  _.each(matrix, (row) => {
    newMatrix.push(_.clone(row));
  });

  let getNeighborCount = (matrix, i, j) => {
    let result = 0;
    let row = matrix.length ? matrix[0] : new Array();

    let iSub1Index = i - 1;
    if (i == 0) {
      iSub1Index = matrix.length-1;
      if (iSub1Index <= i + 1) iSub1Index = -1;
    }

    let jSub1Index = j - 1;
    if (j == 0) {
      jSub1Index = row.length-1;
      if (jSub1Index <= j + 1) jSub1Index = -1;
    }

    let iPlus1Index = i + 1;
    if (i == matrix.length-1) {
      iPlus1Index = 0;
      if (iPlus1Index >= i-1) iPlus1Index = -1;
    }

    let jPlus1Index = j + 1;
    if (j == row.length-1) {
      jPlus1Index = 0;
      if (jPlus1Index >= j-1) jPlus1Index = -1;
    }

    if (iSub1Index >= 0) {
      if (matrix[iSub1Index][j]) result++;
      if (jSub1Index >= 0) if (matrix[iSub1Index][jSub1Index]) result++;
      if (jPlus1Index >= 0) if (matrix[iSub1Index][jPlus1Index]) result++;
    }
    if (iPlus1Index >= 0) {
      if (matrix[iPlus1Index][j]) result++;
      if (jSub1Index >= 0) if (matrix[iPlus1Index][jSub1Index]) result++;
      if (jPlus1Index >= 0) if (matrix[iPlus1Index][jPlus1Index]) result++;
    }
    if (jSub1Index >= 0) if (matrix[i][jSub1Index]) result++;
    if (jPlus1Index >= 0) if (matrix[i][jPlus1Index]) result++;
    return result;
  };

  _.each(matrix, (row, i) => {
    _.each(row, (val, j) => {
      let neighborCount = getNeighborCount(matrix, i, j);
      if (!val) {
        if (neighborCount == 3) {
          newMatrix[i][j] = true;
          stopGame = false;
        }
      } else {
        if (neighborCount < 2 || neighborCount > 3) {
          newMatrix[i][j] = false;
        } else {
          stopGame = false;
        }
      }
    });
  });

  stateModel.push({matrix: req.body.matrix}, function(err){
    if (err) console.log(err);
    res.json({
      stop_game: stopGame,
      matrix: newMatrix
    });
  });
  
});

router.post('/backward', function(req, res, next) {

  stateModel.pop(function(err, row){
    if (err) console.log(err);
    res.json({
      matrix: row && row.value ? JSON.parse(row.value.matrix) : null
    });
  });
  
});

module.exports = router;
