var statistics = (function () {
    var shots = [],
        addAccurateShoot = function (level) {
            var i;
            for(i=0; i<shots.length; i++) {
                if(shots[i].level === level) {
                    shots[i].accurateShoots = shots[i].accurateShoots + 1;
                    return;
                }
            }
            shots.push({
                level: level,
                accurateShoots: 1,
                missedShoots: 0
            })

        },

        addMissedShoot = function (level) {
            var i;
            for(i=0; i<shots.length; i++) {
                if(shots[i].level === level) {
                    shots[i].missedShoots = shots[i].missedShoots + 1;
                    return;
                }
            }
            shots.push({
                level: level,
                accurateShoots: 0,
                missedShoots: 1
            })
        },

        getStats = function () {
            return shots;
        };

    return {
        'addAccurateShoot': addAccurateShoot,
        'addMissedShoot': addMissedShoot,
        'getStats': getStats
    }

})();
