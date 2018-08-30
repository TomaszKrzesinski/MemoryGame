var view = (function () {
    var getInitialNumberOfPieces = function () {
            var numberOfPieces =  document.getElementById("initNumberOfPieces").value;
            if(numberOfPieces<4) {
                numberOfPieces = 4;
                document.getElementById("initNumberOfPieces").value = 4;
            }
            return numberOfPieces;
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
            deactivateButtons();
            for(i=0; i<pieces.length; i++) {
                var id="piece_"+i;
                content = document.createElement("div");
                if(pieces[i].toGuess === true) {
                    content.setAttribute("class", "bluePiece");
                } else {
                    content.setAttribute("class", "piecedisabled");
                }

                content.setAttribute("id", id);
                content.setAttribute("onclick", "controller.shoot("+i+")");
                gamePanel.appendChild(content);
            }
            strechPieces();
            setTimeout(releasePieces, getDelayTime());

        },

        releasePieces = function() {
            var pieces = document.getElementById("gamepanel").children,
                i;
            for(i=0; i<pieces.length; i++) {
                pieces[i].setAttribute("class", "piece");
            }
            activateButtons();
        },

        changePieceState = function(id, shootResult) {
            var piece = document.getElementById("piece_" + id);
            if (shootResult === "OK") {
                piece.setAttribute("class", "hitedPiece");
            } else if(shootResult === "NEXTLEVEL") {
                piece.setAttribute("class", "hitedPiece");
            } else if(shootResult === "DOUBLESHOT") {
                piece.setAttribute("class", "missedPiece");
            } else if(shootResult === "MISSED") {
                piece.setAttribute("class", "missedPiece");
            } else if(shootResult === "GAMEOVER") {
                 piece.setAttribute("class", "missedPiece");
            }
        },

        renderBlue = function (pieces) {
            var i,
                piece;
            for(i=0; i<pieces.length; i++) {
                if(pieces[i].toGuess===true) {
                    piece = document.getElementById("piece_"+i);
                    piece.setAttribute("class", "bluePiece");
                }
            }
        },

        changeCommunicate = function (msg) {
            var communicate = document.getElementById("communicate");
            communicate.innerHTML = msg;
        },

        activateButtons = function () {
            document.getElementById("startButton").disabled = false;
            document.getElementById("restartLevelButton").disabled = false;
        },

        deactivateButtons = function () {
            document.getElementById("startButton").disabled = true;
            document.getElementById("restartLevelButton").disabled = true;
        },

        updateStatistics = function (stats) {
            var list = document.getElementById("statsList"),
                clearList = function () {
                    while(list.hasChildNodes()) {
                        list.removeChild(list.firstChild);
                    }
                },
                addToList = function(element, index, array) {
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(
                        element.level+": "+element.accurateShoots+", "+element.missedShoots+", "+
                        Math.round(100*element.accurateShoots/(element.accurateShoots+element.missedShoots)) +"%"
                    ));
                    list.appendChild(li);
                };
            clearList();
            stats.forEach(addToList);
        },

        strechPieces = function () {
            var gamePanel = document.getElementById("gamepanel"),
                piece = document.getElementById("piece_1"),
                pieces = gamePanel.children;
                numberOfPieces = controller.getNumberOfPieces(),
                numberOfPiecesInRow = Math.ceil(Math.sqrt(numberOfPieces)),
                pieceTotalWidth = Math.floor((gamePanel.clientWidth-40)/numberOfPiecesInRow),
                pieceTotalHeight = Math.floor((gamePanel.clientHeight-40)/numberOfPiecesInRow),
                pieceContentWidth = pieceTotalWidth-6,
                pieceContentHeight = pieceTotalHeight-6;
                for(var i=0; i<pieces.length; i++) {
                    pieces[i].setAttribute("style","width: "+pieceContentWidth+"px;"+"height: "+pieceContentHeight+"px;");
                }
        };



    return {
        'getInitialNumberOfPieces': getInitialNumberOfPieces,
        'getInitialMistakesAllowed': getInitialMistakesAllowed,
        'getDelayTime': getDelayTime,
        'renderPieces': renderPieces,
        'changePieceState': changePieceState,
        'renderBlue': renderBlue,
        'changeCommunicate': changeCommunicate,
        'updateStatistics': updateStatistics
    }
})();
