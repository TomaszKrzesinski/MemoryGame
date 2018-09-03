var game = (function () {
    var initialNumberOfPieces = 4,
        initialNumberOfAllowedMistakes = 0,
        currentNumberOfPieces,
        numberOfAllowedMistakes,
        numberOfMistakes,
        pieces = [],
        shots = [],

        startGame = function (config) {
            if (config && config.numberOfPieces) {
                currentNumberOfPieces = config.numberOfPieces;
                numberOfAllowedMistakes = config.numberOfAllowedMistakes;
            } else {
                currentNumberOfPieces = initialNumberOfPieces;
                numberOfAllowedMistakes = initialNumberOfAllowedMistakes;
            }
            numberOfMistakes = 0;
            getPieces();
        },

        setNumberOfAllowedMistakes = function(numberOfMistakes) {
            numberOfMistakesAllowed = numberOfMistakes;
        },

        getNumberOfPieces = function() {
            return currentNumberOfPieces;
        },

        getPieces = function () {
            var i,
                numberOfPiecesToGuess,
                piecesAssigned,
                randomPositionInTable;

            pieces = [];
            shots = [];
            for(i=0; i < currentNumberOfPieces; i++) {
                pieces.push({});
                shots.push({});
                pieces[i].toGuess = false;
                shots[i].shoted = false;
            }

            numberOfPiecesToGuess = calculateNumberOfPiecesToGuess(currentNumberOfPieces);
            piecesAssigned = 0;
            while(piecesAssigned<numberOfPiecesToGuess) {
                randomPositionInTable = Math.floor(Math.random() * currentNumberOfPieces);
                if(pieces[randomPositionInTable].toGuess === false) {
                    pieces[randomPositionInTable].toGuess = true;
                    piecesAssigned = piecesAssigned + 1;
                }
            }
            return pieces;
        },

        shoot = function(id) {
            var allPiecesHit = true,
                i;
            if(pieces[id].toGuess === true) {
                if(shots[id].shoted === false) {
                    shots[id].shoted = true;
                    statistics.addAccurateShoot(getNumberOfPieces());
                    for(i=0; i<pieces.length; i++) {
                        if(pieces[i].toGuess===true && shots[i].shoted === false){
                            allPiecesHit = false;
                        }
                    }
                    if(allPiecesHit === true) {
                        return "NEXTLEVEL";
                    }
                    return "OK";
                }
                else {
                    numberOfMistakes = numberOfMistakes + 1;
                    statistics.addMissedShoot(getNumberOfPieces());
                    if(numberOfMistakes>numberOfAllowedMistakes) {
                        return "GAMEOVER";
                    }
                    return "DOUBLESHOT";
                }
            } else {
                numberOfMistakes = numberOfMistakes + 1;
                statistics.addMissedShoot(getNumberOfPieces());
                if(numberOfMistakes>numberOfAllowedMistakes) {
                    return "GAMEOVER";
                }
                return "MISSED";
            }
        },

        calculateNumberOfPiecesToGuess = function (numberOfPieces) {
            return Math.floor(((numberOfPieces-4)/2)+1);
        },

        showPieces = function () {
            return pieces;
        },

        nextLevel = function () {
            var incrementedNumberOfPieces = ++currentNumberOfPieces;
            startGame({
                numberOfPieces: incrementedNumberOfPieces,
                numberOfAllowedMistakes: numberOfAllowedMistakes
            });
        },

        getNumberOfPiecesToGuess = function () {
            return calculateNumberOfPiecesToGuess(currentNumberOfPieces);
        },

        restartLevel = function () {
            startGame({
                numberOfPieces: currentNumberOfPieces,
                numberOfAllowedMistakes: numberOfAllowedMistakes
            });
        };

    return {
        'startGame': startGame,
        'getNumberOfPiecesToGuess': getNumberOfPiecesToGuess,
        'getNumberOfPieces': getNumberOfPieces,
        'shoot': shoot,
        'showPieces': showPieces,
        'nextLevel': nextLevel,
        'restartLevel': restartLevel
    }
})();
