// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //iterate through array ===  rowIndex and check if 1 exists
      var row = this.get(rowIndex);
      // var oneCount = row.reduce(function(ones, col) {
      //   if (col === 1) {
      //     return ones += 1;
      //   }   
      // }, 0);
      var count = 0;
      for ( var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          count++;
        }    
      }
      //if so, return true.
      //else return false.
      //return count > 1;
      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //iterate over rows and invoke hasRowConflictAt
      var count = 0;
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasRowConflictAt(i)) {
        //if (this.rows()[i].this.hasRowConflictAt(i)) {
          count++;   
        }    
                  
      }
      //keep track with wasFound variable
      //return wasFound variable
      return count > 0;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    columnMaker: function(colIndex) {
      var resultingArray = [];
      //iterate over .rows()
      var rows = this.rows();
      rows.forEach(function(row) {
        resultingArray.push(row[colIndex]);
      });
      return resultingArray;
    },
    
    hasColConflictAt: function(colIndex) {
      var wasFound = this.columnMaker(colIndex).reduce(function(counter, item) {
        if (item === 1) {
          counter++;
          return counter;
        } else {
          return counter;
        }
      }, 0); 
      return wasFound > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //initialize empty array
      //iterate over this.rows()
      var wasFound = false;
      //var resultingArray = [];
      var rows = this.rows();
      for (var i = 0; i < rows[0].length; i++) {
        //resultingArray.push(columnMaker(i));
        if (this.hasColConflictAt(i)) {
          wasFound = true;  
        }  
      }
      //for each row [index] invoke columnMaker(i) and push results into empty array
      //invoke hasAnyRowConflicts
      return wasFound;
    },

    
    
    

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // diagonalMaker: function() {
    //   var diagonals = []; //an array of major diagonals  
    
    //   var rows = this.rows();
    //   var rowLength = rows[0].length;
    //   // for (var i = -rowLength + 1; i < rows.length; i++) {
    //   //   result.push(rows[i][i]);
    //   // for (var i = 0; i < rows.length; i++) {
    //   //   var nested = [];
    //   //   for (var j = -rows.length + 2; j < rows.length; j++ ) {
    //   //     if (j >= 0 && i >= 0) {
    //   //       nested.push(rows[i][j]);
    //   //     }
      
      
      
    //   for (var i = 0
    //   ) {
      
    //     var nested = [];
    //     var i = 0;
    //     for (var j = - rows.length + 2; j < rows.length; j++) {
    //     //create second array sub
    //       if (j >= 0 && i < rows.length) {
    //         nested.push(rows[i][j]);
    //       }
        
    //       i++;
    //     //          
    //     }  
    //     diagonals.push(nested);
    //     //push (i, j), i = 1 (1, 1)
    //     //push i = 1 (i, i + 1)
    //   }  
        
      
       
    //   //determine if column index < 0
    //     //if not, push the column index and row index + 1 
      
    //   console.log(diagonals);
    // },
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
  
    //create counter
      var counter = 0;
      var rows = this.rows();
    
      for (var i = 0; i < rows.length; i++) {
        if (rows[i][majorDiagonalColumnIndexAtFirstRow] === 1) {
          counter++;
        }
        majorDiagonalColumnIndexAtFirstRow++;
      }
    //check majorDiagonalINcex at row i
      //if 1 is found, increment counter
    //iterate over rows
    //increment i
    //increment majorDiagonalColumnIndexAtFirstRow  
      return counter > 1; 
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rows = this.rows();
      var hasConflicts = false;
      for (var i = -rows.length + 2; i < rows.length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          hasConflicts = true;
        }          
      }
      return hasConflicts; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
