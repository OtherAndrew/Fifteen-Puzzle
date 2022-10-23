/**
 * Andrew Nguyen ##1620988
 * CSE 154 AD with Garrett Jaeger
 * Homework 4: Fifteen Puzzle
 *   
 * This file contains the internal code for a
 * site that hosts a Fifteen-tile sliding puzzle.
 */
(function () {
    "use strict";
    //aliases
    var $ = function(id) { return document.getElementById(id); };
    var qsa = function(sel) { return document.querySelectorAll(sel); };
    
    /**
     * Adds fifteen tiles to the puzzle area on the page and defines
     * the shuffle functionality.
     */
    window.onload = function () {
        TILE_MOVEMENT.addTiles();
        $("shufflebutton").onclick = function shuffleTiles () {
            for (var i = 0; i < 1000; i++) {
                var neighbors = [];
                var tiles = qsa(".tile");
                for (var j = 0; j < tiles.length; j++) {
                    if (TILE_MOVEMENT.movable(tiles[j])) {
                        neighbors.push(tiles[j]);
                    }
                }
                var moveThisTile = neighbors[Math.floor(Math.random() * neighbors.length)];
                TILE_MOVEMENT.moveTileShuf(moveThisTile);
            }
        };
    };
    
    /**
     * Container function for various tile movement functions.
     * 
     * @returns functions relating to tile movement to be used by outside functions
     */
    var TILE_MOVEMENT = (function () {
        //The following two variables define where an
        //empty tile space would occur.
        var emptyPosX = 3;
        var emptyPosY = 3;
        var puzzleSideLength = 4;
        var tileSize = 100;
        
        /**
         * Moves the clicked tile to an empty space on the board if said
         * tile is adjacent to the empty space. Does nothing otherwise.
         */
        function moveTile () {
            if (TILE_MOVEMENT.movable(this)) {
                var tempX = parseInt(this.style.left);
                var tempY = parseInt(this.style.top);
                this.style.left = emptyPosX * tileSize + "px";
                this.style.top = emptyPosY * tileSize + "px";
                this.id = "tile_" + emptyPosX + "_" + emptyPosY;
                emptyPosX = tempX / tileSize;
                emptyPosY = tempY / tileSize;
            }
        }
        
        return {
            
            /**
             * Adds fifteen tiles to the board, numbered from one to fifteen.
             * Each tile is given a unique ID, formatted as "tile_[x]_[y]", 
             * where x and y refer to the tile's position on the board, zero-indexed.
             * Also supplies functionality to tile onclick and mouseover events.
             */
            addTiles: function () {
                var tileNum = 1;
                for (var row = 0; row < puzzleSideLength; row++) {
                    for (var col = 0; col < puzzleSideLength; col++) {
                        var tile = document.createElement("div");
                        tile.id = "tile_" + col + "_" + row;
                        tile.classList.add("tile");
                        tile.classList.add("black");
                        tile.style.left = col * tileSize + "px";
                        tile.style.top = row * tileSize + "px";
                        tile.style.backgroundPosition = col * -tileSize + "px " + row * -tileSize+ "px";
                        tile.innerHTML = tileNum;
                        $("puzzlearea").appendChild(tile);
                        tileNum++;
                    }
                }
                
                $("puzzlearea").removeChild($("tile_3_3"));
                var tiles = qsa(".tile");
                for (var i = 0; i < tiles.length; i++) {
                    tiles[i].onclick = moveTile;
                    tiles[i].onmouseover = mouseOverTile;
                    tiles[i].onmouseout = mouseOutTile;
                }
            },
            
            /**
             * Moves the "thisTile" to an empty space on the board,
             * provided that "thisTile" is adjacent to the empty space.
             * Does nothing otherwise.
             * 
             * @param thisTile - tile to be moved
             */
            moveTileShuf: function (thisTile) {
                if (TILE_MOVEMENT.movable(thisTile)) {
                    var tempX = parseInt(thisTile.style.left);
                    var tempY = parseInt(thisTile.style.top);
                    thisTile.style.left = emptyPosX * tileSize + "px";
                    thisTile.style.top = emptyPosY * tileSize + "px";
                    thisTile.id = "tile_" + emptyPosX + "_" + emptyPosY;
                    emptyPosX = tempX / tileSize;
                    emptyPosY = tempY / tileSize;
                }
            },
            
            /**
             * Determines if "thisTile" is adjacent to an empty space
             * on the board, and therefore "movable."
             * 
             * @param thisTile - tile to be examined for proximity to empty space
             * @returns if "thisTile" can be moved, as a boolean
             */
            movable: function (thisTile) {
                var posX = parseInt(thisTile.style.left) / tileSize;
                var posY = parseInt(thisTile.style.top) / tileSize;
                return posX - 1 == emptyPosX && posY == emptyPosY ||
                    posX + 1 == emptyPosX && posY == emptyPosY ||
                    posX == emptyPosX && posY - 1 == emptyPosY ||
                    posX == emptyPosX && posY + 1 == emptyPosY;
            }
        };
        
    })();
    
    /**
     * Specifies the styling for a tile if a user hovers over said tile
     * with their cursor. The tile's border and text will turn red if
     * the user hovers over it, but only if the tile is able to be moved.
     */
    function mouseOverTile () {
        if (TILE_MOVEMENT.movable(this)) {
            this.classList.remove("black");
            this.classList.add("red");
        }
    }
    
    /**
     * Returns a tile to its previous styling after a user's cursor has left
     * the boundaries of the tile, in this case, to black borders and text.
     */
    function mouseOutTile () {
        this.classList.remove("red");
        this.classList.add("black");
    }
    
})();
