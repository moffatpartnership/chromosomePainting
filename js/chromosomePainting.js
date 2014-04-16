// startup vars
var appHeight = 900,
    appWidth = 1106,
    borderContainerYpos = [16,54,93,131,169,207,245,284,323,362,401,439,477,515,553,591,629,668,706,744,783,820],
    containerLength = [932,908,749,725,686,653,612,570,546,529,526,522,458,429,412,371,338,326,260,276,220,233],
    continentKey = [{d:"301",color:"#4663CB",map:0,description:"West Eurasian"},
                    {d:"101",color:"#43914F",map:1000,description:"Sub Saharan African"},
                    {d:"201",color:"#E78038",map:3000,description:"Asian - Native American"}],
    images = [],
    loader;

// wrapper
window.Viewer = {};

// loader
(function(){

    var mapItems, dataload;

    function Loader() {

        var resultid = document.getElementById("canvasChromosomePainting").getAttribute("data-chromosome-painting-id");

        var manifest = [
            {src:"https://www.scotlandsdna.com/assets/EarthsDNA/Mydna/img/result/chromo2/plugins/World3.png", id:"image1"}
        ];

        loader = new createjs.LoadQueue(false);
        loader.addEventListener("fileload", handleFileLoad);
        loader.addEventListener("complete", handleComplete);
        loader.loadManifest(manifest);

        function handleFileLoad(event) {
            images.push(event.item);
        }

        function handleComplete() {

            $.getJSON('https://api.moffpart.com/api/1/databases/sdnacontent/collections/amaChromosomePainting/' + resultid + '?apiKey=50e55b5fe4b00738efa04da0&callback=?', function(ret) {

                mapItems = ret;
                parseData();

            });

        }

        // preloader graphics
        var prossElement = document.createElement('div'),
            dialogElement = document.createElement('div'),
            spinElement = document.createElement('div'),
            paraElement = document.createElement('p'),
            textItem = document.createTextNode("Loading Painting…");

        prossElement.setAttribute('id', "Processing");
        prossElement.setAttribute('Style', "height:" + appHeight + "px; width:" + appWidth + "px;");
        dialogElement.setAttribute('class','dialog');
        spinElement.setAttribute('class','spinner-container');

        paraElement.appendChild(textItem);
        dialogElement.appendChild(paraElement);
        dialogElement.appendChild(spinElement);
        prossElement.appendChild(dialogElement);
        document.getElementById("canvasChromosomePainting").appendChild(prossElement);
        $('#Processing').show();
    }

    Loader.prototype.loadData = function() {


    };

    function parseData() {

        dataload = true;
    }

    Loader.prototype.loadStatus = function() {

        return dataload
    };

    Loader.prototype.returnData = function() {

        allData = {
            drawItems:mapItems
        };
        return allData
    };

    Viewer.Loader = Loader;

})();

// artboard
(function(){

    // data
    var mapData, interactionObject, phaseOne, phaseTwo;



    function Artboard(){

        interactionObject = {
            state:"inactive",
            data:"Nil"
        };
    }

    Artboard.prototype.dataLoad = function (data){

        mapData  = data.drawItems;

    };

    Artboard.prototype.background = function (displayObject){

        // area to add stuff ----->

        var background = new createjs.Container();
        background.x = 39;
        displayObject.addChild(background);

        var worldId = images[0].id,
            wrdImg = new createjs.Bitmap(loader.getResult(worldId));
        wrdImg.x = 340;
        wrdImg.y = 522;
        background.addChild(wrdImg);

        var keyXpos =  740,
            keyYpos =  190;

        for (var g = 0; g < 3; g++) {

            var chromoNum = new createjs.Text(continentKey[g].description,"18px Petrona","#333");
            chromoNum.x = keyXpos;
            chromoNum.y = keyYpos;
            background.addChild(chromoNum);

            var keyShape = new createjs.Shape();
            keyShape.graphics.beginFill(continentKey[g].color).drawRect(keyXpos + 220,keyYpos - 4,30,24);
            background.addChild(keyShape);

            keyYpos += 40;

        }

        for (var h = 0; h < 22; h++) {

            var chromobaseTop = new createjs.Shape();
            chromobaseTop.graphics.beginFill("#ddd").drawRect(-5,0,containerLength[h]-36,10);
            chromobaseTop.y = borderContainerYpos[h];
            chromobaseTop.shadow = new createjs.Shadow("#aaa", 2, 3, 6);
            background.addChild(chromobaseTop);

            var chromobaseBot = new createjs.Shape();
            chromobaseBot.graphics.beginFill("#ddd").drawRect(-5,16,containerLength[h]-36,10);
            chromobaseBot.y = borderContainerYpos[h];
            chromobaseBot.shadow = new createjs.Shadow("#aaa", 2, 3, 6);
            background.addChild(chromobaseBot);
        }

        var color;

        phaseOne = mapData.phaseOne;
        phaseTwo = mapData.phaseTwo;

        for (var i = 0; i < 22; i++) {

            var chromoDataTop = phaseOne["chromosome" + (i)],
                chromoDataTopLength = chromoDataTop.length;

            for (var j = 0; j < chromoDataTopLength; j++) {

                var topindex = getIndex(continentKey,"d",chromoDataTop[j].region.substr(0,3));
                color = continentKey[topindex].color;

                var startTop = Math.round((chromoDataTop[j].start*3.52)/1000000);
                var lengthTop = (chromoDataTop[j].length*3.52)/1000000;

                var bartop = new createjs.Shape();
                bartop.graphics.beginFill(color).drawRect(startTop,borderContainerYpos[i],lengthTop,10);
                background.addChild(bartop)
            }

            var chromoDataBot = phaseTwo["chromosome" + (i)],
                chromoDataBotLength = chromoDataBot.length;

            for (var k = 0; k < chromoDataBotLength; k++) {

                var startBot = Math.round((chromoDataBot[k].start*3.52)/1000000);
                var lengthBot = Math.round((chromoDataBot[k].length*3.52)/1000000);

                var botindex = getIndex(continentKey,"d",chromoDataBot[k].region.substr(0,3));
                color = continentKey[botindex].color;

                var barbot = new createjs.Shape();
                barbot.graphics.beginFill(color).drawRect(startBot,borderContainerYpos[i] + 16,lengthBot,10);
                background.addChild(barbot)
            }
        }

        // <------ area to add stuff

        displayObject.updateCache("source-overlay");

    };

    Artboard.prototype.redraw = function (displayObject){

        // area to add stuff ----->

        // <------ area to add stuff
    };

    Artboard.prototype.eventlayer = function (displayObject){

        // area to add stuff ----->

        var eventback = new createjs.Container();
        displayObject.addChild(eventback);

        for (var l = 0; l < 22; l++) {

            var chromoNum = new createjs.Text(l+1,"18px Petrona","#666");
            chromoNum.x = 16;
            chromoNum.y = borderContainerYpos[l] + 5;
            chromoNum.textAlign = "center";
            eventback.addChild(chromoNum);
        }

        // <------ area to add stuff

        displayObject.updateCache("source-overlay");
    };

    Artboard.prototype.interaction = function(){

        return interactionObject
    };

    Artboard.prototype.resetInteraction = function(){

        interactionObject.state = "inactive";
        interactionObject.data = "Nil";
        interactionObject.chromolength = 0;
        interactionObject.number = 0;
        interactionObject.topPhase = 0;
        interactionObject.botPhase = 0;
    };

    Viewer.Artboard = Artboard;

})();

// dashboard
(function(){

    var user;

    function Dashboard() {



    }

    Dashboard.prototype.controlData = function(data) {


    };

    Dashboard.prototype.background = function(displayObject) {

        // area to add stuff ----->

        // <------ area to add stuff
    };

    Dashboard.prototype.redraw = function() {


    };

    Dashboard.prototype.userFeedback = function() {


    };

    Viewer.Dashboard = Dashboard;

})();

// highlight
(function(){

    var interactionObject, viewInteraction, sliderX, chromoX, state, topPhase, botPhase, chromoEnd,
    appmiddle = appWidth/ 2 - 65.5, coeff = 0, offset = 0, worldxpos = 500, sectionDescription = "";

    function Highlight() {

        interactionObject = {
            state:"inactive",
            data:"Nil"
        };
    }

    Highlight.prototype.dataLoad = function(viewData) {

        viewInteraction = viewData;
    };

    Highlight.prototype.background = function(displayObject) {


    };

    Highlight.prototype.redraw = function(displayObject) {



    };

    Highlight.prototype.eventlayer = function(displayObject) {



    };

    Highlight.prototype.currentState = function() {

        return interactionObject
    };

    Highlight.prototype.resetInteraction = function(){

        interactionObject.state = "inactive";
        interactionObject.data = "Nil";
    };

    Viewer.Highlight = Highlight;

})();

// renderer
(function(){

    var stats, canvas, stage, view, control, highlight,
        artboard, artboardBackground, artboardRedraw, artboardEventArea,
        dashboardRedraw, dashboardBackground,
        highlightContainer, highlightBackground, highlightRedraw, highlightEventArea,
        loader, loadStatus;

    Viewer.loadInit = function(){

       /* stats = new Stats();
        $('.block').prepend(stats.domElement);*/

        // prepare the view
        view = new Viewer.Artboard(appWidth,appHeight);

        // prepare the highlight
        highlight = new Viewer.Highlight();

        // prepare the dashboard
        control = new Viewer.Dashboard();

        // loader init
        loader = new Viewer.Loader();
        loadStatus = false;
        loader.loadData();

        TweenMax.ticker.addEventListener("tick", loadRequest);
    };

    function init() {

        // prepare our canvas
        canvas = document.createElement( 'canvas' );
        canvas.width = appWidth;
        canvas.height = appHeight;
        document.getElementById("canvasChromosomePainting").appendChild(canvas);

        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(10);

        // artboard
        artboard = new createjs.Container();
        artboard.y = 20;
        stage.addChild(artboard);

        artboardBackground = new createjs.Container();
        artboardBackground.cache(0, 0, appWidth, appHeight);
        artboard.addChild(artboardBackground);
        view.background(artboardBackground);

        artboardRedraw = new createjs.Container();
        artboard.addChild(artboardRedraw);

        artboardEventArea = new createjs.Container();
        artboardEventArea.cache(0, 0, appWidth, appHeight);
        artboard.addChild(artboardEventArea);
        view.eventlayer(artboardEventArea);

        // dashboard
        dashboardBackground = new createjs.Container();
        dashboardBackground.cache(0, 0, appWidth, appHeight);
        stage.addChild(dashboardBackground);
        control.background(dashboardBackground);

        dashboardRedraw  = new createjs.Container();
        stage.addChild(dashboardRedraw);

        // highlight
        highlightContainer = new createjs.Container();
        highlightContainer.y = 20;
        stage.addChild(highlightContainer);

        highlightBackground = new createjs.Container();
        highlightBackground.cache(0, 0, appWidth, appHeight);
        highlightContainer.addChild(highlightBackground);

        highlightRedraw  = new createjs.Container();
        stage.addChild(highlightRedraw);

        highlightEventArea = new createjs.Container();
        highlightEventArea.cache(0, 0, appWidth, appHeight);
        highlightContainer.addChild(highlightEventArea);

        TweenMax.ticker.addEventListener("tick", frameRender);

    }

    function loadRequest(event) {

        var loadFinished = loader.loadStatus();
        if (loadFinished) {
            loadStatus = true;
            var data = loader.returnData();
            view.dataLoad(data);
            control.controlData(data);
            removeLoader()
        }
    }

    function removeLoader() {

        $('#Processing').remove();
        TweenMax.ticker.removeEventListener("tick", loadRequest);
        init();
    }

    function frameRender(event) {

        //stats.begin();

        artboardRedraw.removeAllChildren();
        highlightRedraw.removeAllChildren();

        view.redraw(artboardRedraw);
        highlight.redraw(highlightRedraw);
        control.redraw(dashboardRedraw);

        var viewData = view.interaction();

        if (viewData.state === "openhighlight") {
            highlight.dataLoad(viewData);
            highlight.eventlayer(highlightEventArea);
            highlight.background(highlightBackground);
            view.resetInteraction()
        }

        var highlightData = highlight.currentState();

        if (highlightData.state === "closehighlight") {
            highlightBackground.removeAllChildren();
            highlightBackground.updateCache();

            highlightEventArea.removeAllChildren();
            highlightEventArea.updateCache();

            highlight.resetInteraction()
        }

        // update stage
        stage.update();

        //stats.end();
    }

})();

//Init
Viewer.loadInit();

// utils
var getIndex = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
};

//sorts array by key
/*function sortByKey(array, key) {
 return array.sort(function(a, b) {
 var
 x = a[key],
 y = b[key];
 return ((x > y) ? -1 : ((x < y) ? 1 : 0));
 });
 }*/
