var view = (function () {
    var getInitialNumberOfPieces = function () {
            return document.getElementById("initNumberOfPieces").value;
        },

        getDelayTime = function() {
            return document.getElementById("delayTimeInput").value;
        },

        getInitialMistakesAllowed = function() {
            return document.getElementById("mistakesAllowedInput").value;
        },

        renderPieces = function () {
            var gamePanel = document.getElementById("gamepanel"),
                i,
                content,
                j,
                piece,
                pieces,

                clearGamePanel = function() {
                    while(document.getElementById("gamepanel").hasChildNodes()){
                        piece = document.getElementById("gamepanel").firstChild;
                        document.getElementById("gamepanel").removeChild(piece);
                    }
                };

            clearGamePanel();
            pieces = controller.showPieces();

            for(i=0; i<pieces.length; i++) {
                var id="piece_"+i;
                content = document.createElement("div");
                if(pieces[i].toGuess == true) {
                    content.setAttribute("class", "bluePiece");
                } else {
                    content.setAttribute("class", "piecedisabled");
                }

                content.setAttribute("id", id);
                content.setAttribute("onclick", "controller.shoot("+i+")");
                gamePanel.appendChild(content);

                setTimeout(releasePieces, getDelayTime());
            }
        },

        releasePieces = function() {
            var pieces = document.getElementById("gamepanel").children,
                i;
            for(i=0; i<pieces.length; i++) {
                pieces[i].setAttribute("class", "piece");
            }
        },

        changePieceState = function(id, shootResult) {
            var piece = document.getElementById("piece_" + id);
            if (shootResult == "OK") {
                piece.setAttribute("class", "hitedPiece");
            } else if(shootResult == "NEXTLEVEL") {
                piece.setAttribute("class", "hitedPiece");
            } else if(shootResult == "DOUBLESHOT") {
                piece.setAttribute("class", "missedPiece");
            } else if(shootResult == "MISSED") {
                piece.setAttribute("class", "missedPiece");
            } else if(shootResult == "GAMEOVER") {
                 piece.setAttribute("class", "missedPiece");
            }
        },

        renderBlue = function (pieces) {
            var i,
                piece;
            for(i=0; i<pieces.length; i++) {
                if(pieces[i].toGuess==true) {
                    piece = document.getElementById("piece_"+i);
                    piece.setAttribute("class", "bluePiece");
                }
            }
        },

        changeCommunicate = function (msg) {
            var communicate = document.getElementById("communicate");
            communicate.innerHTML = msg;
        };



    return {
        'getInitialNumberOfPieces': getInitialNumberOfPieces,
        'getInitialMistakesAllowed': getInitialMistakesAllowed,
        'getDelayTime': getDelayTime,
        'renderPieces': renderPieces,
        'changePieceState': changePieceState,
        'renderBlue': renderBlue,
        'changeCommunicate': changeCommunicate
    }
})();
