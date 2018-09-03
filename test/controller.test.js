describe('Controller', function () {
    it('should call game.startGame when executing controller.startGame', function () {
        spyOn(game, 'startGame');
        spyOn(view, 'getInitialNumberOfPieces').and.returnValue("4");
        spyOn(view, 'getInitialMistakesAllowed').and.returnValue("0");

        spyOn(view, 'renderPieces');

        controller.startGame();

        expect(game.startGame).toHaveBeenCalled();
    });
});
