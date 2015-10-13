(function () {
    "use strict";
    /*
      hook up event handlers 
    */
    function register_event_handlers() {
        $(document).ready(function () {
            initAd();
            selectedQuestions = JSON.parse(DB);
            usedlang=JSON.parse(Languages);
            player = GameEngine.createPlayer();
            setTimeout(function () {
                setStartupVars();
                showGecisModalDialog();
                activate_page("#mainpage", function () {
                    window.plugins.AdMob.createBannerView();
                });
            }, 1000);
        });
        $(document).on("pagechange", function (evnt, pageID) {
            if (pageID == "#mainpage") {          
                //setTimeout(function () {
                //    gameStart();
                //}, 5000);
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
        
        var question = 1;
        var selectedQuestions = null;
        var usedlang = null;
        var currentAnswer = null;
        var player;
        var intervals = [];
        var time;

        function showGecisModalDialog(answer) {

            if (answer === true)
                gecisAnswerTxt.innerText = "Doğru :)";
            else if (answer === false)
                gecisAnswerTxt.innerText = "Yanlış :(";
            else if (answer == "timeup")
                gecisAnswerTxt.innerText = "Süre doldu :(";
            else if (!answer)
                gecisAnswerTxt.innerText = "";

            gecistitleTxt.innerText = "Sir " + player.getTitle();
            gecispointTxt.innerText = "Point: " + player.getPoint();
            gecismultiplerTxt.innerText = "Multipler: X" + player.getMultipler();
            gecisModal.modal();
        };

        function hideGecisModalDialog(time) {
            if (!time)
                setTimeout(function () {
                    gecisModal.modal('hide');
                }, 200);
            else
                setTimeout(function () {
                    gecisModal.modal('hide');
                }, time);
        };

        function gameStart(selectedQuestions) {
            swearTxt.innerText = question + ".) " + questionSelector(selectedQuestions) + "?";
            pointTxt.innerText = "Point: " + player.getPoint();
            answerMaker();
            time = 10;
            for(var i =0; i < intervals.length; i++)
            {
                clearInterval(intervals[i]);
            }
            intervals = [];
             var myVar = setInterval(function () {
                if (time == 0) {
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
        
        function questionSelector(selectedQuestions) {
            
            usedlang=JSON.parse(Languages);
            var qNumber = Math.floor((Math.random() * selectedQuestions.length) + 1);
            var langNumber = Math.floor((Math.random() * (Object.keys(selectedQuestions[qNumber]).length-2)) + 1);
            //if (selectedQuestions[qNumber]) {
            //    if (selectedQuestions[qNumber][abrSwitcher(langNumber)])
            //        questionSelector();
            //} else {
                //if (!selectedQuestions[qNumber])
                //    selectedQuestions[qNumber] = {};
                question++;
                //return (selectedQuestions[qNumber][abrSwitcher(langNumber)] = DB[qNumber][abrSwitcher(langNumber)]);
                var selected = selectedQuestions[qNumber][abrSwitcher(langNumber)];
                usedlang.remove(currentAnswer);
                delete selectedQuestions[qNumber][abrSwitcher(langNumber)];
                return selected;
            //}
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
                    currentAnswer = "BR";
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
            //usedlang=JSON.parse(Languages);
            var langNumber = Math.floor((Math.random() * usedlang.length) + 1);
            var itm = usedlang[langNumber];
            usedlang.remove(itm);
            return itm;
            //switch (langNumber) {
            //case 1:
            //    {
            //        return usedlang["Türkçe"] ? langSwitcher(answer) : answer == "Türkçe" ? langSwitcher(answer) : (usedlang["Türkçe"] = "Türkçe");
            //    }
            //case 2:
            //    {
            //        return usedlang["İngilizce"] ? langSwitcher(answer) : answer == "İngilizce" ? langSwitcher(answer) : (usedlang["İngilizce"] = "İngilizce");
            //    }
            //case 3:
            //    {
            //        return usedlang["İspanyolca"] ? langSwitcher(answer) : answer == "İspanyolca" ? langSwitcher(answer) : (usedlang["İspanyolca"] = "İspanyolca");
            //    }
            //case 4:
            //    {
            //        return usedlang["Rusça"] ? langSwitcher(answer) : answer == "Rusça" ? langSwitcher(answer) : (usedlang["Rusça"] = "Rusça");
            //    }
            //case 5:
            //    {
            //        return usedlang["İtalyanca"] ? langSwitcher(answer) : answer == "İtalyanca" ? langSwitcher(answer) : (usedlang["İtalyanca"] = "İtalyanca");
            //    }
            //case 6:
            //    {
            //        return usedlang["Portekizce"] ? langSwitcher(answer) : answer == "Portekizce" ? langSwitcher(answer) : (usedlang["Portekizce"] = "Portekizce");
            //    }
            //case 7:
            //    {
            //        return usedlang["Almanca"] ? langSwitcher(answer) : answer == "Almanca" ? langSwitcher(answer) : (usedlang["Almanca"] = "Almanca");
            //    }
            //case 8:
            //    {
            //        return usedlang["İsveççe"] ? langSwitcher(answer) : answer == "İsveççe" ? langSwitcher(answer) : (usedlang["İsveççe"] = "İsveççe");
            //    }
            //case 9:
            //    {
            //        return usedlang["BR"] ? langSwitcher(answer) : answer == "BR" ? langSwitcher(answer) : (usedlang["BR"] = "BR");
            //    }
            //case 10:
            //    {
            //        return usedlang["Fransızca"] ? langSwitcher(answer) : answer == "Fransızca" ? langSwitcher(answer) : (usedlang["Fransızca"] = "Fransızca");
            //    }
//
            //}
        };

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
            selectedQuestions = {};
            currentAnswer = null;
            usedlang=null;
            for(var i =0; i < intervals.length; i++)
            {
                clearInterval(intervals[i]);
            }
            intervals = [];
            //clearInterval(myVar);

        };
        /* button  #firstBtn */
        $(document).on("click", "#firstBtn", function (evt) {
            /* your code goes here */
            if (a.innerText == currentAnswer) //buton renkleri değişecek
            {
                player.addStreak(function () {
                    player.addPoint(time);
                    setStartupVars();
                    showGecisModalDialog(true);
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
                    player.addPoint(time);
                    setStartupVars();
                    showGecisModalDialog(true);
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
                    player.addPoint(time);
                    setStartupVars();
                    showGecisModalDialog(true);
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
                    player.addPoint(time);
                    setStartupVars();
                    showGecisModalDialog(true);
                });

            } else {
                player.clearStreak(function () {
                    setStartupVars();
                    showGecisModalDialog(false);
                });
            }
        });
        $(document).on("click", "#btnGecisCloase", function (evt) {
            $('#btnGecisCloase').prop('disabled', true);
            setTimeout(function () {
                window.plugins.AdMob.createBannerView();
                selectedQuestions = JSON.parse(DB);
                gameStart(selectedQuestions);
                hideGecisModalDialog();
                $('#btnGecisCloase').prop('disabled', false);
            }, 500);
        });

    }

    function initApp() {
        initAd();
        // display the banner at startup
        //window.plugins.AdMob.createBannerView();
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
                clearInterval(intval)
                    (navigator.app && navigator.app.exitApp()) || (device && device.exitApp())
            } else {
                exitApp = true;
                window.plugins.toast.show('Çıkmak için bir kere daha geri tuşuna basın!', 'short', 'bottom');
            }
        }, false);
    }, false);
})();