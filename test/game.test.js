describe('Game', function () {
   it('should have 4 pieces after game start', function () {
      var pieces;
      game.startGame();

      pieces = game.showPieces();

      expect(pieces.length).toBe(4);
   });

    it('one pieces should be to guess after game start', function () {
        var piecesToGuess;
        game.startGame();

        piecesToGuess = findPiecesToGuess(game.showPieces());

        expect(piecesToGuess.length).toBe(1);
    });

    it('should start game with configured number of pieces', function () {
        var config = {
                numberOfPieces: 6,
                numberOfAllowedMistakes: 1
            },
            numberOfPieces;
        game.startGame(config);

        numberOfPieces = game.getNumberOfPieces();

        expect(numberOfPieces).toBe(6);
    });

    it('should calculate number of pieces to guess when number of pieces is 4', function () {
        var numberOfPiecesToGuess,
            config = {
                numberOfPieces: 4,
                numberOfAllowedMistakes: 1
            };

        game.startGame(config);
        numberOfPiecesToGuess = game.getNumberOfPiecesToGuess();

        expect(numberOfPiecesToGuess).toBe(1);
    });

    it('should calculate number of pieces to guess when number of pieces is 6', function () {
        var numberOfPiecesToGuess,
            config = {
                numberOfPieces: 6,
                numberOfAllowedMistakes: 1
            };

        game.startGame(config);
        numberOfPiecesToGuess = game.getNumberOfPiecesToGuess();

        expect(numberOfPiecesToGuess).toBe(2);
    });

    it('should calculate number of pieces to guess when number of pieces is 14', function () {
        var numberOfPiecesToGuess,
            config = {
                numberOfPieces: 14,
                numberOfAllowedMistakes: 1
            };

        game.startGame(config);
        numberOfPiecesToGuess = game.getNumberOfPiecesToGuess();

        expect(numberOfPiecesToGuess).toBe(6);
    });

    it('should return OK when shooting right piece', function () {
        var pieces,
            config = {
                numberOfPieces: 6,
                numberOfAllowedMistakes: 1
            },
            i,
            resultOfShoot = "";

        game.startGame(config);
        pieces = game.showPieces();

        for(i=0; i<pieces.length; i++) {
            if(pieces[i].toGuess === true) {
                resultOfShoot = game.shoot(i);
                break;
            }
        }

        expect(resultOfShoot).toBe("OK");
    });

    it('should return DOUBLESHOT when shooting twice in right piece with 1 mistake allowed', function () {
        var pieces,
            config = {
                numberOfPieces: 6,
                numberOfAllowedMistakes: 1
            },
            i,
            resultOfShoot = "";

        game.startGame(config);
        pieces = game.showPieces();


        for(i=0; i<pieces.length; i++) {
            if(pieces[i].toGuess === true) {
                game.shoot(i);
                resultOfShoot = game.shoot(i);
                break;
            }
        }

        expect(resultOfShoot).toBe("DOUBLESHOT");
    });

    it('should return MISSED when shooting twice in right piece', function () {
        var pieces,
            config = {
                numberOfPieces: 6,
                numberOfAllowedMistakes: 1
            },
            i,
            resultOfShoot = "";

        game.startGame(config);
        pieces = game.showPieces();
        for(i=0; i<pieces.length; i++) {
            if(pieces[i].toGuess == false) {
                resultOfShoot = game.shoot(i);
                break;
            }
        }

        expect(resultOfShoot).toBe("MISSED");
    });

    it('should return GAMEOVER when shooting twice in right piece with no mistake allowed', function () {
        var pieces,
            config = {
                numberOfPieces: 6,
                numberOfAllowedMistakes: 0
            },
            i,
            resultOfShoot = "";

        game.startGame(config);
        pieces = game.showPieces();


        for(i=0; i<pieces.length; i++) {
            if(pieces[i].toGuess == true) {
                game.shoot(i);
                resultOfShoot = game.shoot(i);
                break;
            }
        }
        expect(resultOfShoot).toBe("GAMEOVER");
    });

    it('should return GAMEOVER when shooting in wrong piece with no mistake allowed', function () {
        var pieces,
            config = {
                numberOfPieces: 6,
                numberOfAllowedMistakes: 0
            },
            i,
            resultOfShoot = "";

        game.startGame(config);
        pieces = game.showPieces();


        for(i=0; i<pieces.length; i++) {
            if(pieces[i].toGuess == false) {
                resultOfShoot = game.shoot(i);
                break;
            }
        }
        expect(resultOfShoot).toBe("GAMEOVER");
    });

    it('should start nextlevel with increased number of pieces', function () {
        var pieces,
            i,
            resultOfShoot = "";

        game.startGame();
        game.nextLevel();

        pieces = game.showPieces();

        expect(pieces.length).toBe(5);
    });


    function findPiecesToGuess(pieces) {
        return pieces.filter(function (piece) {
           return piece.toGuess;
        });
    }
});
