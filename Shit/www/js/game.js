Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
};
var GameEngine = {};
GameEngine.Streaks = [];
GameEngine.Players = [];
GameEngine.addStreakByID = function (playerID) {
    var player = GameEngine.Streaks[player.getID()];
    GameEngine.addStreakByPlayer(player);
};
GameEngine.addStreakByPlayer = function (player) {
    player.addStreak(
        function () {
            player.setTitle(function () {
                player.setMultipler();
            });
        });
};
GameEngine.clearStreakByID = function (playerID) {
    var player = GameEngine.Streaks[player.getID()];
    GameEngine.clearStreakByPlayer(player);
};
GameEngine.clearStreakByPlayer = function (player) {
    player.clearStreak(
        function () {
            player.setTitle(function () {
                player.setMultipler();
            });
        });
};
GameEngine.createPlayer = function () {

    var newPlayer = new Player();
    var ID = 1;
    newPlayer.setID(ID);
    newPlayer.setName("Test User1");
    newPlayer.getPoint();
    newPlayer.setTitle(function () {
        newPlayer.setMultipler();
    });
    if (GameEngine.Players && !GameEngine.Players[ID])
        return (GameEngine.Players[ID] = newPlayer);
};