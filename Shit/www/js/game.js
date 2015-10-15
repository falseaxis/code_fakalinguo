Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
};
var GameEngine = {};
GameEngine.Streaks = [];
GameEngine.Players = [];
GameEngine.Questions = [];


GameEngine.getQuestions = function () {
    return GameEngine.Questions;
};
GameEngine.setQuestions = function (questions) {
    GameEngine.Questions = [];
    GameEngine.Questions = GameEngine.Questions.concat(questions);
};

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
    Model.init();
    var newPlayer = new Player();
    var ID = 1;
    newPlayer.setID(ID);
    newPlayer.setName("Test User1");
    newPlayer.getPoint();
    newPlayer.setTitle(function () {
        newPlayer.setMultipler();
    });
    var user = Model.webdb.getUser(ID,
    function (user) {
        if (!user)
            Model.webdb.addUser(ID, newPlayer.getName(), 0);
        else
            newPlayer.setHighScore(user.HighScore);
    });

    if (GameEngine.Players && !GameEngine.Players[ID]) {
        return (GameEngine.Players[ID] = newPlayer);
    }
};