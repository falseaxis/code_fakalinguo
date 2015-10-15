var Model = {};
Model.webdb = {};
Model.webdb.db = null;

Model.webdb.open = function () {
    var dbSize = 1 * 1024;
    Model.webdb.db = openDatabase("FalseAxis_fakalinguo", "1.0", "fakalinguo Settings", dbSize);
};

Model.webdb.createTable = function () {
    if (!Model.webdb.db)
        Model.webdb.open();
    var db = Model.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS User (ID INTEGER , Name TEXT,HighScore INTEGER)", []);//PRIMARY KEY ASC
    });
};


Model.webdb.addUser = function (id,name, highScore, callback) {
    var db = Model.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO User (ID,Name,HighScore) VALUES (?,?,?)", [id,name, highScore],
            callback,
            Model.webdb.onError);
    });
};


Model.webdb.updateUser = function (id,name, highScore, callback) {
    var db = Model.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("UPDATE User SET Name = ?, HighScore = ? WHERE ID = ?", [name, highScore,id],
            callback,
            Model.webdb.onError);
    });
};
Model.webdb.onError = function (tx, e) {
    //alert("There has been an error: " + e.message);
};

Model.webdb.onSuccess = function (tx, r) {
    // re-render the data.
    //MModel.webdb.getAllTodoItems(loadTodoItems);
};

Model.webdb.getUser = function (id, callback) {
    var db = Model.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM User where ID = ?", [id], callback,
            Model.webdb.onError);
    });
};

Model.webdb.getAllUsers = function (callback) {
    var db = Model.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM User ", [], callback,
            Model.webdb.onError);
    });
};

Model.webdb.deleteUser = function (id) {
    var db = Model.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("DELETE FROM User where ID=?", [id],
            Model.webdb.onSuccess,
            Model.webdb.onError);
    });
};

Model.webdb.clearAllUsers = function () {
    var db = Model.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("DELETE FROM User", [],
            Model.webdb.onSuccess,
            Model.webdb.onError);
    });
};



Model.init = function () {
    Model.webdb.open();
    Model.webdb.createTable();
    //MModel.webdb.getAllTodoItems(loadTodoItems);
};