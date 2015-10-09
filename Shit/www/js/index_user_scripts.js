(function () {
    "use strict";
    /*
      hook up event handlers 
    */
    function register_event_handlers() {
        $(document).ready(function () {
            setTimeout(function () {
                setStartupVars();
                activate_page("#mainpage");
            }, 1000);
        });
        $(document).on("pagechange", function (evnt, pageID) {
            if (pageID == "#mainpage") {
                setTimeout(function () {
                    gameStart();
                }, 5000);
            }
        });
        var titleTxt = document.getElementById("titleTxt");
        var pointTxt = document.getElementById("pointTxt");
        var timerTxt = document.getElementById("timerTxt");
        var swearTxt = document.getElementById("swearTxt");
        var multiplerTxt = document.getElementById("multiplerTxt");
        var a = document.getElementById("firstBtn");
        var b = document.getElementById("secondBtn");
        var c = document.getElementById("thirdBtn");
        var d = document.getElementById("fourthBtn");
        var question = 1;
        var selectedQuestions = {};
        var currentAnswer = null;
        var player = GameEngine.createPlayer();
        var myVar;
        var time;

        function gameStart() {
            swearTxt.innerText = question + ".) " + questionSelector() + "?";
            pointTxt.innerText = "Point: "+ player.getPoint();
            answerMaker();
            time = 10;
            myVar = setInterval(function () {
                if (time == 0) {
                    clearInterval(myVar);
                    player.clearStreak(function () {
                        setStartupVars();
                        setTimeout(function () {
                            gameStart();
                        }, 500);
                    });
                }
                timerTxt.innerText = time--;
            }, 1000);
        };

        function answerMaker() {
            var _1 = langSwitcher(currentAnswer);
            var _2 = langSwitcher(currentAnswer);
            var _3 = langSwitcher(currentAnswer);
            var qNumber = Math.floor((Math.random() * 4) + 1);
            if (qNumber == 1) {
                a.innerText = currentAnswer;
                b.innerText = _1;
                c.innerText = _2;
                d.innerText = _3;
            } else if (qNumber == 2) {
                a.innerText = _1;
                b.innerText = currentAnswer;
                c.innerText = _2;
                d.innerText = _3;
            } else if (qNumber == 3) {
                a.innerText = _1;
                b.innerText = _2;
                c.innerText = currentAnswer;
                d.innerText = _3;
            } else if (qNumber == 4) {
                a.innerText = _1;
                b.innerText = _2;
                c.innerText = _3;
                d.innerText = currentAnswer;
            }

        }

        function questionSelector() {
            var qNumber = Math.floor((Math.random() * 22) + 1);
            var langNumber = Math.floor((Math.random() * 10) + 1);
            if (selectedQuestions[qNumber]) {
                if (selectedQuestions[qNumber][abrSwitcher(langNumber)])
                    questionSelector();
            } else {
                if (!selectedQuestions[qNumber])
                    selectedQuestions[qNumber] = {};
                question++;
                return (selectedQuestions[qNumber][abrSwitcher(langNumber)] = DB[qNumber][abrSwitcher(langNumber)]);
            }
        };

        function abrSwitcher(langNumber) {
            switch (langNumber) {
            case 1:
                {
                    currentAnswer = "Türkçe";
                    return "tr-TR";
                }
            case 2:
                {
                    currentAnswer = "İngilizce";
                    return "en-En";
                }
            case 3:
                {
                    currentAnswer = "İspanyolca";
                    return "es-ES";
                }
            case 4:
                {
                    currentAnswer = "Rusça";
                    return "ru-RU";
                }
            case 5:
                {
                    currentAnswer = "İtalyanca";
                    return "it-IT";
                }
            case 6:
                {
                    currentAnswer = "Portekizce";
                    return "pt-PT";
                }
            case 7:
                {
                    currentAnswer = "Almanca";
                    return "de-DE";
                }
            case 8:
                {
                    currentAnswer = "İsveççe";
                    return "sw-SW";
                }
            case 9:
                {
                    currentAnswer = "FTW is da BR?";
                    return "br-BR";
                }
            case 10:
                {
                    currentAnswer = "Fransızca";
                    return "fr-FR";
                }

            }
        };

        function langSwitcher(answer) { //kullanılmış mı kontrolü yap
            var langNumber = Math.floor((Math.random() * 10) + 1);
            switch (langNumber) {
            case 1:
                {
                    return answer == "Türkçe" ? langSwitcher(answer) : "Türkçe";
                }
            case 2:
                {
                    return answer == "İngilizce" ? langSwitcher(answer) : "İngilizce";
                }
            case 3:
                {
                    return answer == "İspanyolca" ? langSwitcher(answer) : "İspanyolca";
                }
            case 4:
                {
                    return answer == "Rusça" ? langSwitcher(answer) : "Rusça";
                }
            case 5:
                {
                    return answer == "İtalyanca" ? langSwitcher(answer) : "İtalyanca";
                }
            case 6:
                {
                    return answer == "Portekizce" ? langSwitcher(answer) : "Portekizce";
                }
            case 7:
                {
                    return answer == "Almanca" ? langSwitcher(answer) : "Almanca";
                }
            case 8:
                {
                    return answer == "İsveççe" ? langSwitcher(answer) : "İsveççe";
                }
            case 9:
                {
                    return answer == "FTW is da BR?" ? langSwitcher(answer) : "FTW is da BR?";
                }
            case 10:
                {
                    return answer == "Fransızca" ? langSwitcher(answer) : "Fransızca";
                }

            }
        };

        function setStartupVars() {
            titleTxt.innerText = "Sir " + player.getTitle();
            pointTxt.innerText = "Point: ";
            timerTxt.innerText = " ";
            swearTxt.innerText = " ";
            multiplerTxt.innerText = "X" + player.getMultipler();
            a.innerText = "";
            b.innerText = "";
            c.innerText = "";
            d.innerText = "";
            selectedQuestions = {};
            currentAnswer = null;
            clearInterval(myVar);

        };
        /* button  #firstBtn */
        $(document).on("click", "#firstBtn", function (evt) {
            /* your code goes here */
            if (a.innerText == currentAnswer) //buton renkleri değişecek
            {
                player.addStreak(function () {
                    player.addPoint(time);
                    setStartupVars();
                    setTimeout(function () {
                        gameStart();
                    }, 500);
                });

            } else {
                player.clearStreak();
            }

        });

        /* button  #secondBtn */
        $(document).on("click", "#secondBtn", function (evt) {
            /* your code goes here */
            if (b.innerText == currentAnswer) {
                player.addStreak(function () {
                    player.addPoint(time);
                    setStartupVars();
                    setTimeout(function () {
                        gameStart();
                    }, 500);
                });

            } else {
                player.clearStreak();
            }
        });

        /* button  #thirdBtn */
        $(document).on("click", "#thirdBtn", function (evt) {
            /* your code goes here */
            if (c.innerText == currentAnswer) {
                player.addStreak(function () {
                    player.addPoint(time);
                    setStartupVars();
                    setTimeout(function () {
                        gameStart();
                    }, 500);
                });

            } else {
                player.clearStreak();
            }
        });

        /* button  #fourthBtn */
        $(document).on("click", "#fourthBtn", function (evt) {
            /* your code goes here */
            if (d.innerText == currentAnswer) {
                player.addStreak(function () {
                    player.addPoint(time);
                    setStartupVars();
                    setTimeout(function () {
                        gameStart();
                    }, 500);
                });

            } else {
                player.clearStreak();
            }
        });

    }
    document.addEventListener("app.Ready", register_event_handlers, false);
})();