(function () {
    "use strict";
    /*
      hook up event handlers 
    */
    var question = 1;
    //var selectedQuestions = [];
    var usedlang = null;
    var currentAnswer = null;
    var player;
    var intervals = [];
    var time;

    function register_event_handlers() {
        $(document).ready(function () {
            initAd();
            GameEngine.setQuestions(JSON.parse(DB));
            usedlang = JSON.parse(Languages);
            player = GameEngine.createPlayer();
            window.plugins.AdMob.createInterstitialView();
            //setStartupVars();
            //setTimeout(function () {
            //    setStartupVars();
            //    //showAdModalDialog();
            //    activate_page("#mainpage", function () {});
            //}, 1000);
        });
        $(document).on("pagechange", function (evnt, pageID) {
            if (pageID == "#mainpage") {
                //showAdModalDialog();
                //window.plugins.AdMob.createInterstitialView();
            }
        });
        var titleTxt = document.getElementById("titleTxt");
        var pointTxt = document.getElementById("pointTxt");
        var timerProgress = $("#timerProgress");
        var timerTxt = document.getElementById("timerTxt");
        var swearTxt = document.getElementById("swearTxt");

        var gecismultiplerTxt = document.getElementById("gecismultiplerTxt");
        var gecistitleTxt = document.getElementById("gecistitleTxt");
        var gecispointTxt = document.getElementById("gecispointTxt");
        var gecisAnswerTxt = document.getElementById("gecisAnswerTxt");


        var a = document.getElementById("firstBtn");
        var b = document.getElementById("secondBtn");
        var c = document.getElementById("thirdBtn");
        var d = document.getElementById("fourthBtn");

        var gecisModal = $('#gecisModal');
        var endGameModal = $('#endGameModal');

        function showEndGameModal() {
            endGameModal.modal();
        }

        function hideEndGameModal(time) {
            if (!time)
                setTimeout(function () {
                    endGameModal.modal('hide');
                }, 200);
            else
                setTimeout(function () {
                    endGameModal.modal('hide');
                }, time);
        }

        function showGecisModalDialog(answer, addedPoints) {

            if (answer === true)
                gecisAnswerTxt.innerText = "Doğru :)";
            else if (answer === false)
                gecisAnswerTxt.innerText = "Yanlış :(";
            else if (answer == "timeup")
                gecisAnswerTxt.innerText = "Süre doldu :(";
            else if (!answer)
                gecisAnswerTxt.innerText = "";

            gecistitleTxt.innerText = "Sir " + player.getTitle();
            if (!addedPoints || addedPoints <= 0)
                gecispointTxt.innerText = "";
            else
                gecispointTxt.innerText = "You Get " + addedPoints + " Points";
            gecismultiplerTxt.innerText = "Multipler: X" + player.getMultipler();
            gecisModal.modal();
        }

        function hideGecisModalDialog(time) {
            if (!time)
                setTimeout(function () {
                    gecisModal.modal('hide');
                }, 200);
            else
                setTimeout(function () {
                    gecisModal.modal('hide');
                }, time);
        }

        function gameStart() {
            swearTxt.innerText = question + ".) " + questionSelector() + "?";
            pointTxt.innerText = "Point: " + player.getPoint();
            answerMaker();
            time = 10;
            for (var i = 0; i < intervals.length; i++) {
                clearInterval(intervals[i]);
            }
            intervals = [];
            var myVar = setInterval(function () {
                if (time === 0) {
                    clearInterval(myVar);
                    intervals.pop(myVar);
                    player.clearStreak(function () {
                        setStartupVars();
                        showGecisModalDialog("timeup");
                        //setTimeout(function () {
                        //    gameStart();
                        //}, 500);
                    });
                }
                var newTime = time--;
                timerTxt.innerText = newTime;
                var a = newTime * 10;
                timerProgress.attr('aria-valuenow', a);
                timerProgress.width(a + '%');
            }, 1000);
            intervals.push(myVar);
        }

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
            usedlang = [];
            usedlang = JSON.parse(Languages).slice(0);
            var questions = GameEngine.getQuestions();
            var selectNumber = Math.floor((Math.random() * questions.length));
            var langNumber = Math.floor((Math.random() * (Object.keys(questions[selectNumber]).length - 2)));
            
            question++;
            var selected = questions[selectNumber][abrSwitcher(langNumber)];
            usedlang.remove(currentAnswer);
            delete GameEngine.getQuestions()[selectNumber][abrSwitcher(langNumber)];

            return selected;
        }

        function abrSwitcher(langNumber) {
            switch (langNumber) {
            case 0:
                {
                    currentAnswer = "Türkçe";
                    return "tr-TR";
                }
            case 1:
                {
                    currentAnswer = "İngilizce";
                    return "en-En";
                }
            case 2:
                {
                    currentAnswer = "İspanyolca";
                    return "es-ES";
                }
            case 3:
                {
                    currentAnswer = "Rusça";
                    return "ru-RU";
                }
            case 4:
                {
                    currentAnswer = "İtalyanca";
                    return "it-IT";
                }
            case 5:
                {
                    currentAnswer = "Portekizce";
                    return "pt-PT";
                }
            case 6:
                {
                    currentAnswer = "Almanca";
                    return "de-DE";
                }
            case 7:
                {
                    currentAnswer = "İsveççe";
                    return "sw-SW";
                }
            case 8:
                {
                    currentAnswer = "BR";
                    return "br-BR";
                }
            case 9:
                {
                    currentAnswer = "Fransızca";
                    return "fr-FR";
                }

            }
        }



        function langSwitcher(answer) { //kullanılmış mı kontrolü yap
            //usedlang=JSON.parse(Languages);
            //usedlang = JSON.parse(Languages).slice(0);
            var langNumber = Math.floor((Math.random() * usedlang.length));
            var itm = usedlang[langNumber];
            if (!itm)
                imt = langSwitcher(answer);
            usedlang.remove(itm);
            return itm;
        }

        function reStart() {

            player.clearPoint();
            player.clearStreak();
            titleTxt.innerText = "Sir " + player.getTitle();
            pointTxt.innerText = "Point: " + player.getPoint();
            timerProgress.innerText = " ";
            swearTxt.innerText = " ";
            multiplerTxt.innerText = "X" + player.getMultipler();
            a.innerText = "";
            b.innerText = "";
            c.innerText = "";
            d.innerText = "";
            //selectedQuestions = {};
            currentAnswer = null;
            usedlang = null;
            question = 1;
            for (var i = 0; i < intervals.length; i++) {
                clearInterval(intervals[i]);
            }
            intervals = [];
            GameEngine.setQuestions(JSON.parse(DB));
            usedlang = JSON.parse(Languages);
            window.plugins.AdMob.createInterstitialView();
            
            //gameStart();
            $('#endGameModalRestart').prop('disabled', false);
            hideEndGameModal();
        }

        function setStartupVars() {

            titleTxt.innerText = "Sir " + player.getTitle();
            pointTxt.innerText = "Point: " + player.getPoint();
            timerProgress.innerText = " ";
            swearTxt.innerText = " ";
            multiplerTxt.innerText = "X" + player.getMultipler();
            a.innerText = "";
            b.innerText = "";
            c.innerText = "";
            d.innerText = "";
            //selectedQuestions = {};
            currentAnswer = null;
            usedlang = null;
            for (var i = 0; i < intervals.length; i++) {
                clearInterval(intervals[i]);
            }
            intervals = [];
            //clearInterval(myVar);

        }
        /* button  #firstBtn */
        $(document).on("click", "#firstBtn", function (evt) {
            /* your code goes here */
            if (a.innerText == currentAnswer) //buton renkleri değişecek
            {
                player.addStreak(function () {
                    var added = player.addPoint(time);
                    setStartupVars();
                    showGecisModalDialog(true, added);
                });

            } else {
                player.clearStreak(function () {
                    setStartupVars();
                    showGecisModalDialog(false);
                });
            }

        });

        /* button  #secondBtn */
        $(document).on("click", "#secondBtn", function (evt) {
            /* your code goes here */
            if (b.innerText == currentAnswer) {
                player.addStreak(function () {
                    var added = player.addPoint(time);
                    setStartupVars();
                    showGecisModalDialog(true, added);
                });

            } else {
                player.clearStreak(function () {
                    setStartupVars();
                    showGecisModalDialog(false);
                });
            }
        });

        /* button  #thirdBtn */
        $(document).on("click", "#thirdBtn", function (evt) {
            /* your code goes here */
            if (c.innerText == currentAnswer) {
                player.addStreak(function () {
                    var added = player.addPoint(time);
                    setStartupVars();
                    showGecisModalDialog(true, added);
                });

            } else {
                player.clearStreak(function () {
                    setStartupVars();
                    showGecisModalDialog(false);
                });
            }
        });

        /* button  #fourthBtn */
        $(document).on("click", "#fourthBtn", function (evt) {
            /* your code goes here */
            if (d.innerText == currentAnswer) {
                player.addStreak(function () {
                    var added = player.addPoint(time);
                    setStartupVars();
                    showGecisModalDialog(true, added);
                });

            } else {
                player.clearStreak(function () {
                    setStartupVars();
                    showGecisModalDialog(false);
                });
            }
        });

        $(document).on("click", "#endGameModalRestart", function (evt) {
            $('#endGameModalRestart').prop('disabled', true);
            setTimeout(function () {
                reStart();
            }, 1000);
        });

        $(document).on("click", "#endGameModalClose", function (evt) {
            ((navigator.app && navigator.app.exitApp()) || (device && device.exitApp()))
        });

        $(document).on("click", "#btnGecisClose", function (evt) {
            $('#btnGecisClose').prop('disabled', true);
            if (question <= 25)
                setTimeout(function () {
                    //window.plugins.AdMob.createBannerView();
                    //selectedQuestions = JSON.parse(DB);
                    gameStart();
                    hideGecisModalDialog();
                    //hideAdModalDialog();
                    $('#btnGecisClose').prop('disabled', false);
                }, 500);
            else {
                document.getElementById("txtScore").innerText = "Score: " + player.getPoint();
                document.getElementById("txtHighScore").innerText = "HighScore: " + player.getHighScore();
                hideGecisModalDialog();
                showEndGameModal();
            }
        });

        $(document).on("onDismissInterstitialAd", function (evt) {
            setTimeout(function () {
                gameStart();
                activate_page("#mainpage", function () {
                    window.plugins.AdMob.createBannerView();
                    hideEndGameModal();
                });
            }, 1000);
        });

        $(document).on("onReceiveInterstitialAd", function (evt) {});
        $(document).on("onPresentInterstitialAd", function (evt) {});
        $(document).on("onFailedToReceiveAd", function (data) {
            if (data.adType == "interstitial") setTimeout(function () {
                gameStart();
                activate_page("#mainpage", function () {
                    window.plugins.AdMob.createBannerView();
                });
            }, 1000);
        });

    }

    function initApp() {
        initAd();
        // display the banner at startup
        //window.plugins.AdMob.createInterstitialView();
    }

    function initAd() {
        if (window.plugins && window.plugins.AdMob) {
            var ad_units = {
                ios: {
                    banner: 'ca-app-pub-5453713931180772/8923085641',
                    interstitial: 'ca-app-pub-5453713931180772/1399818844'
                },
                android: {
                    banner: 'ca-app-pub-5453713931180772/8923085641',
                    interstitial: 'ca-app-pub-5453713931180772/1399818844'
                },
                wp8: {
                    banner: 'ca-app-pub-5453713931180772/8923085641',
                    interstitial: 'ca-app-pub-5453713931180772/1399818844'
                }
            };
            var admobid = "";
            if (/(android)/i.test(navigator.userAgent)) {
                admobid = ad_units.android;
            } else if (/(iphone|ipad)/i.test(navigator.userAgent)) {
                admobid = ad_units.ios;
            } else {
                admobid = ad_units.wp8;
            }
            window.plugins.AdMob.setOptions({
                publisherId: admobid.banner,
                interstitialAdId: admobid.interstitial,
                bannerAtTop: false, // set to true, to put banner at top
                overlap: false, // set to true, to allow banner overlap webview
                offsetTopBar: false, // set to true to avoid ios7 status bar overlap
                isTesting: false, // receiving test ad
                autoShow: true // auto show interstitial ad when loaded
            });
            registerAdEvents();

        } else {
            alert('admob plugin not ready');
        }
    }
    // optional, in case respond to events
    function registerAdEvents() {
        document.addEventListener('onReceiveAd', function () {});
        document.addEventListener('onFailedToReceiveAd', function (data) {});
        document.addEventListener('onPresentAd', function () {});
        document.addEventListener('onDismissAd', function () {});
        document.addEventListener('onLeaveToAd', function () {});
        document.addEventListener('onReceiveInterstitialAd', function () {});
        document.addEventListener('onPresentInterstitialAd', function () {});
        document.addEventListener('onDismissInterstitialAd', function () {});
    }

    function onResize() {
        var msg = 'web view: ' + window.innerWidth + ' x ' + window.innerHeight;
        document.getElementById('sizeinfo').innerHTML = msg;
    }
    document.addEventListener("app.Ready", register_event_handlers, false);
    var intval;
    document.addEventListener('deviceready', function () {
        var exitApp = false,
            intval = setInterval(function () {
                exitApp = false;
            }, 600);
        document.addEventListener("backbutton", function (e) {
            e.preventDefault();
            if (exitApp) {
                clearInterval(intval);
                ((navigator.app && navigator.app.exitApp()) || (device && device.exitApp()))
            } else {
                exitApp = true;
                //window.plugins.toast.show('Çıkmak için bir kere daha geri tuşuna basın!', 'short', 'bottom');
            }
        }, false);
    }, false);
})();