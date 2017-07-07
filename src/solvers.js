/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, wi
//th n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  
  
  
  var solution = undefined;
  //create new board
  var newBoard = new Board({'n': n});
  //var colIndex = 0;
  //var rowIndex = 0; 
  //set starting piece 
  //newBoard.togglePiece(rowIndex, colIndex); 
  //use some function to populate matrix with one rook
  for (var rowIndex = 0; rowIndex < n; rowIndex++) {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      newBoard.togglePiece(rowIndex, colIndex);
      
      if (newBoard.hasAnyRowConflicts() || newBoard.hasAnyColConflicts()) {
        newBoard.togglePiece(rowIndex, colIndex);
      }
    }
    
  } 
  solution = newBoard.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};  

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  
  var newBoard = new Board({'n': n});
  var rows = newBoard.rows();
  var currentRowIndex = 0; 
  var currentColIndex = 0; 
  
  var recurses = function(currentRowIndex) {

    if (currentRowIndex === n) {
      solutionCount++;
      console.log(JSON.stringify(rows));
      return;
    }
  
    for (var i = 0; i < n; i++) {
      newBoard.togglePiece(currentRowIndex, i);
    
      if (!newBoard.hasAnyRooksConflicts()) {    
        recurses(currentRowIndex + 1);
      } 
      newBoard.togglePiece(currentRowIndex, i);
    }    
  };
  recurses(currentRowIndex);  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;  
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};
