function Player() {
    var playerName = null;
    var playerTitle = null;
    var playerID = null;
    var playerStreak = 0;
    var playerMultipler = 1;
    var playerPoint = 0;


    this.setName = function (name) {
        if (name) //js olup olmadığını kontrol et
            playerName = name;
    };
    this.getName = function () {
        if (playerName) //js olup olmadığını kontrol et
            return playerName;
        else return (playerName = "Player 1");
    };
    this.setID = function (ID) {
        if (!isNaN(ID))
            playerID = ID;
    };
    this.getID = function () {
        if (playerID)
            return playerID;
    };
    this.addPoint = function (time,callback) {
        var added = time*132*playerMultipler;
        playerPoint += added;
        if (callback && typeof callback == 'function')
            callback(added);
        return added;
        //Player.setTitle();
        //Player.setMultipler();
    };
    this.getPoint = function()
    {
        return playerPoint;
    };
    this.addStreak = function (callback) {
        playerStreak++;
        if (callback && typeof callback == 'function')
            callback();
        //Player.setTitle();
        //Player.setMultipler();
    };
    this.clearStreak = function (callback) {
        playerStreak = 0;
        if (callback && typeof callback == 'function')
            callback();
    };
    this.setTitle = function (callback) {
        if (playerStreak >= 25)
            playerTitle = "SwearMaster";
        else if (playerStreak >= 18)
            playerTitle = "ProSwearer";
        else if (playerStreak >= 12)
            playerTitle = "RoboSwearer";
        else if (playerStreak >= 8)
            playerTitle = "Swearer";
        else if (playerStreak >= 4)
            playerTitle = "Noob";
        else
            playerTitle = "Lame";
        if (callback && typeof callback == 'function')
            callback();
    };
    this.getTitle = function (callback) {
            this.setTitle();
        if (callback && typeof callback == 'function')
            return callback(playerTitle);
        return playerTitle;
    };
    this.setMultipler = function (callback) {
        if (playerStreak >= 25)
            playerMultipler = 6;
        else if (playerStreak >= 18)
            playerMultipler = 5;
        else if (playerStreak >= 12)
            playerMultipler = 4;
        else if (playerStreak >= 8)
            playerMultipler = 3;
        else if (playerStreak >= 4)
            playerMultipler = 2;
        else
            playerMultipler = 1;
        if (callback && typeof callback == 'function')
            callback();
    };
    this.getMultipler = function (callback) {
        this.setMultipler();
        if (callback && typeof callback == 'function')
            return callback(playerMultipler);
        return playerMultipler;
    };
}