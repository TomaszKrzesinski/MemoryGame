var controller = function () {
    var startGame = function () {
            var initialNumberOfPieces = view.getInitialNumberOfPieces(),
                initialNumberOfAllowedMistakes = view.getInitialMistakesAllowed();

            game.startGame({
                numberOfPieces: initialNumberOfPieces,
                numberOfAllowedMistakes: initialNumberOfAllowedMistakes
            });

            view.renderPieces(initialNumberOfPieces);
        },

        getNumberOfPieces = function () {
            return game.getNumberOfPieces();
        },

        shoot = function (id) {
            var shotResult;

            shotResult = game.shoot(id);
            view.updateStatistics(statistics.getStats());
            view.changePieceState(id, shotResult);
            if(shotResult === "GAMEOVER") {
                gameOver();
                view.changeCommunicate("You lose. Starting new game in 3 seconds.");
                setTimeout(startNewGameAfter3Seconds, 3000);
            } else if(shotResult === "NEXTLEVEL") {
                view.changeCommunicate("Excellent. Starting new level in 3 seconds.");
                setTimeout(nextLevel, 3000);
            }
        },

        showPieces = function () {
            return game.showPieces();
        },

        gameOver = function () {
            var pieces = game.showPieces();
            view.renderBlue(pieces);
        },

        startNewGameAfter3Seconds = function () {
            view.changeCommunicate("New game started");
            startGame();
        },

        nextLevel = function () {
            game.nextLevel();
            view.changeCommunicate("New level. Number of pieces to guess: "+game.getNumberOfPiecesToGuess());
            view.renderPieces();
        },

        restartLevel = function () {
            game.restartLevel();
            view.changeCommunicate("Level restarted. Number of pieces to guess: "+game.getNumberOfPiecesToGuess());
            view.renderPieces();
        },

        addPiece = function () {
            var increasedNumberOfPieces = controller.getNumberOfPieces()+1,
                initialNumberOfAllowedMistakes = view.getInitialMistakesAllowed();

            game.startGame({
                numberOfPieces: increasedNumberOfPieces,
                numberOfAllowedMistakes: initialNumberOfAllowedMistakes
            });

            view.changeCommunicate("Level restarted. Number of pieces to guess: "+game.getNumberOfPiecesToGuess());
            view.renderPieces(increasedNumberOfPieces);
        };


    return {
        'startGame': startGame,
        'showPieces': showPieces,
        'getNumberOfPieces': getNumberOfPieces,
        'startNewGameAfter3Seconds': startNewGameAfter3Seconds,
        'shoot': shoot,
        'restartLevel': restartLevel,
        'addPiece': addPiece
    }
}();
