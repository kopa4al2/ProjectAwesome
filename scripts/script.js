let GAME_WIDTH;
let GAME_HEIGHT;
let SCREEN_WIDTH;
let SCREEN_HEIGHT;
$(document).ready(() => {

    let gameContainer = $('#game-container');

    GAME_HEIGHT = gameContainer.height();
    GAME_WIDTH = gameContainer.width();
    SCREEN_HEIGHT = document.body.clientHeight;
    SCREEN_WIDTH = document.body.clientWidth;

    Crafty.init(GAME_WIDTH, GAME_HEIGHT, gameContainer[0]);
    Crafty.viewport.init(GAME_WIDTH, GAME_HEIGHT, gameContainer[0]);
    Crafty.viewport.mouselook(true);
    Crafty.viewport.clampToEntities = true;
    Crafty.viewport.bounds = {
        min: {x: 0, y: 0},
        max: {x: 500, y: 500}
    };


    //TODO: maybe battle scene and some more features
    Crafty.scene('loading', initLoading, uninitLoading);
    Crafty.scene('race-map', initRaceMap, uninitRaceMap);
    Crafty.scene('inner-map', initInnerMap, uninitInnerMap);
    Crafty.scene('town-map', initTownMap, uninitTownMap);

    function initLoading() {
        //TODO:
        // - Loading screen
        // - Loading animation

        // Crafty.background("#000");
        Crafty.e("2D, DOM, Text").attr({w: GAME_WIDTH, h: 30, x: 0, y: 100})
            .text("Loading...")
            .css({"text-align": "center", "font-size": "50px"});

        let assets = {
            "images": "../images/assets/sprites/map.png"
        };

        Crafty.load(assets, () => {
            // setTimeout(() => {
            Crafty.scene("inner-map")
            // }, 2000);

        })
    }

    function uninitLoading() {
        //If first time playing
        //loadScene('race-map')
        //else
        //loadScene('town-map')
    }

    function initRaceMap() {
        //if first time playing
        //choose race
        //else
        //option to pick region and look around
    }

    function uninitRaceMap() {
        //Send information about which innerMap to load
    }

    function initInnerMap() {

        let oldx = 0;
        let oldy = 0;

        let camera = Crafty.e('2D, Canvas, Color, Draggable')
            .attr({x: -1000, y: -1000, w: 3000, h: 3000, z: 50})
            .color('red')
            .bind("Dragging", function (event) {
                let direction = "";
                // console.log("X : " + Crafty.viewport.x);
                // console.log("Y:  " + Crafty.viewport.y);
                if (event.clientY < oldy) {
                    direction = "up";
                    if (Crafty.viewport.y > -770)
                    Crafty.viewport.y -= 10;
                }

                if (event.clientY > oldy) {
                    direction = "down";
                     if (Crafty.viewport.y < 0)
                    Crafty.viewport.y += 10;
                }

                if (event.clientX < oldx) {
                    direction = "left";
                    if (Crafty.viewport.x > 50)
                    Crafty.viewport.x -= 10;

                } else if (event.clientX > oldx) {
                    direction = "right";
                    if (Crafty.viewport.x < 700)
                    Crafty.viewport.x += 10;
                }
                // console.log(`x: ${Crafty.viewport.x} y: ${Crafty.viewport.y} bounds: ${Crafty.viewport.bounds}`)

                oldx = event.clientX;
                oldy = event.clientY;
                // console.log(direction)
            });
        camera.alpha = 0;


        let e = Crafty.e("2D, Canvas, TiledMapBuilder")
            .setMapDataSource(source)
            .createWorld()
            // .createView(0, -500, 40, 40)

        // Crafty.viewport.x = 450;
        // Crafty.viewport.y = -400;
        // Crafty.viewport.scale(1.2)

        // load player town's locations from DB
        // load creature locations from DB
        //render
    }

    function uninitInnerMap() {
        //Send info about next scene
    }

    function initTownMap() {
        //Load buildings and resources from DB
        //render
    }

    function uninitTownMap() {
        //Send info about next scene
    }

    let initResize = function () {
        Crafty.sprite(920, 920, "../images/util/arrow-fullscreen-box.png", {"exit-btn": [0, 0]});
        let resize = Crafty.e('2D, Canvas, exit-btn')
            .attr({x: GAME_WIDTH - 90, y: 0, w: 80, h: 80})

        resize.onMouseDown = function (e) {
            //TODO: Make fullscreen
        };
        resize.onMouseOver = function (e) {
            //TODO: hover effect
        };
        Crafty.addEvent(resize, Crafty.stage.elem, "mousedown", resize.onMouseDown);
        Crafty.addEvent(resize, Crafty.stage.elem, "mouseover", resize.onMouseOver);
    };


    // =====>>>>> EVERYTHING STARTS HERE <<<<=======
    Crafty.scene('loading')

});

