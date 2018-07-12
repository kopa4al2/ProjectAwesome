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


    // Crafty.sprite(64, "../images/assets/sprites/map.png", {
    //     tileA: [0, 0, 1, 1],
    //     tileB: [1, 0, 1, 1],
    //     grass3: [2, 0, 1, 1],
    //     grass4: [3, 0, 1, 1],
    // });
    // let iso = Crafty.diamondIso.init(64, 128, 20, 20);
    // Crafty.diamondIso.place('tileA', 0, 0, 1)

    // iso.place('tileA', 100, 100, 50);

    //All our scenes
    //TODO: maybe battle scene and some more features
    Crafty.scene('loading', initLoading, uninitLoading);
    Crafty.scene('race-map', initRaceMap, uninitRaceMap);
    Crafty.scene('inner-map', initInnerMap, uninitInnerMap);
    Crafty.scene('town-map', initTownMap, uninitTownMap);

    function initLoading() {
        //TODO:
        // - Loading screen
        // - Loading animation
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

        /*
         * Declare sprite resources
         */


        // for (var y = 0; y < height / spriteSize * 3; y++) {
        //     for (var x = 0; x < width / spriteSize - 1; x++) {
        //         var tile = Crafty.e('2D, Canvas, grass1, mouse')
        //             .areaMap([32, 16], [64, 32], [32, 48], [0, 32])
        //             .bind("click", function () {
        //                 this.destroy();
        //             });
        // iso.place(x, y, 0, tile);
        // }
        // }


        const VIEW_ROWS = 12;
        const VIEW_COLS = 12;

        const MAX_ROWS = 32;
        const MAX_COLS = 32;

        let tileWidthInPixels = GAME_WIDTH / VIEW_ROWS;
        let tileHeightInPixels = GAME_HEIGHT / VIEW_COLS;
        let currentX = 0;
        let currentY = 0;
        let offsetX = 0;
        let offsetY = 0;

        let gameFieldMatrix = [];
        let tileMatrix = [];


        let oldx = 0;
        let oldy = 0;
        let camera = Crafty.e('2D, Canvas, Color, Draggable')
            .attr({x: 0, y: 0, w: GAME_WIDTH, h: GAME_HEIGHT, z: 2})
            .bind("Dragging", function (event) {
                let direction = "";

                if (event.clientY < oldy) {
                    direction = "up"
                    Crafty.viewport.y -= 10;
                }

                if (event.clientY > oldy) {
                    direction = "down"
                    Crafty.viewport.y += 10;
                }

                if (event.clientX < oldx) {
                    direction = "left";
                    Crafty.viewport.x -= 10;

                } else if (event.clientX > oldx) {
                    direction = "right";
                    Crafty.viewport.y += 10;
                }
                if (offsetX > MAX_ROWS)
                    offsetX = MAX_ROWS;
                if (offsetX < 0)
                    offsetX = 0;
                if (offsetY > MAX_COLS)
                    offsetY = MAX_COLS;
                if (offsetY < 0)
                    offsetY = 0;

                // renderMap(offsetX, offsetY);

                oldx = event.clientX;
                oldy = event.clientY;
                // console.log(direction)
            });
        camera.alpha = 0;

        //INITIALIZE MATRIX AND TILES
        for (let i = 0; i < MAX_ROWS; i++) {
            gameFieldMatrix[i] = [];
            for (let j = 0; j < MAX_COLS; j++) {
                gameFieldMatrix[i][j] = Math.floor(Math.random() * Math.floor(2));
                //If == 1 => tileA ; if== 2  => tileB

                //INITIALIZE TILES
                // let tile = Crafty.e(`2D, Canvas, ${gameFieldMatrix[i][j] === 1 ? 'tileA' : 'tileB'}`)
                //     .attr({x: currentX + offsetX,
                //         y: currentY + offsetY,
                //         w: tileWidthInPixels,
                //         h: tileHeightInPixels,
                //         rotation:20
                //     })
                // let iso = Crafty.diamondIso.init(tileWidthInPixels, tileHeightInPixels, GAME_WIDTH, GAME_HEIGHT)
                // iso.place('tileA, 1, 1, 1');
                // console.log(Crafty.diamond)
                // let tile = Crafty.diamond(`2D, Canvas, ${gameFieldMatrix[i][j] === 1 ? 'tileA' : 'tileB'}`)
                //     .attr({x: currentX + offsetX,
                //         y: currentY + offsetY,
                //         w: tileWidthInPixels,
                //         h: tileHeightInPixels,
                //         rotation:10
                //     })

                currentX += tileWidthInPixels;
            }
            currentX = 0;
            currentY += tileHeightInPixels;
        }


        //RENDER THE VIEW
        let renderMap = function (offsetX, offsetY) {
            for (let i = 0; i < MAX_ROWS; i++) {
                for (let j = 0; j < MAX_COLS; j++) {
                    let x = i + offsetX;
                    let y = i + offsetY;
                    if (x > MAX_ROWS)
                        x = MAX_ROWS;
                    if (y > MAX_COLS)
                        y = MAX_COLS;
                    Crafty.e(`2D, Canvas, ${gameFieldMatrix[i + offsetX][j + offsetY] === 1 ? 'tileA' : 'tileB'}`)
                        .attr({
                            x: currentX,
                            y: currentY,
                            w: tileWidthInPixels,
                            h: tileHeightInPixels,
                            z: 1
                        });
                    currentX += tileWidthInPixels;
                }
                currentX = 0;
                currentY += tileHeightInPixels;
            }

        }

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


    Crafty.init(GAME_WIDTH, GAME_HEIGHT, gameContainer[0]);
    Crafty.viewport.init(GAME_WIDTH, GAME_HEIGHT, gameContainer[0]);
    Crafty.viewport.mouselook(true);
    Crafty.viewport.clampToEntities = false;
    Crafty.viewport.bounds = {
        min:{x:0,y:0},
        max:{x:500,y:500}
    };
    Crafty.scene("Load", function () {
        Crafty.background("#000");
        Crafty.e("2D, DOM, Text").attr({w: GAME_WIDTH, h: 30, x: 0, y: 100})
            .text("Loading...")
            .css({"text-align": "center", "font-size": "30px"});

        let assets = {
            "images": "../images/assets/sprites/map.png"
        };

        // Crafty.load(assets, () => {
        Crafty.scene("Main")
        // })

    });


    Crafty.scene("Main", function () {
        let oldx = 0;
        let oldy = 0;
        let camera = Crafty.e('2D, Canvas, Color, Draggable')
            .attr({x: -1000, y: -1000, w: 3000, h: 3000, z: 50})
            .color('red')
            .bind("Dragging", function (event) {
                let direction = "";

                if (event.clientY < oldy) {
                    direction = "up"
                    // if (Crafty.viewport.y > -30)
                    Crafty.viewport.y -= 10;
                }

                if (event.clientY > oldy) {
                    direction = "down"
                    // if (Crafty.viewport.y < 500)
                    Crafty.viewport.y += 10;
                }

                if (event.clientX < oldx) {
                    direction = "left";
                    // if (Crafty.viewport.x > 0)
                    Crafty.viewport.x -= 10;

                } else if (event.clientX > oldx) {
                    direction = "right";
                    // if (Crafty.viewport.x < GAME_WIDTH)
                        Crafty.viewport.x += 10;
                }
                // console.log(`x: ${Crafty.viewport.x} y: ${Crafty.viewport.y} bounds: ${Crafty.viewport.bounds}`)

                oldx = event.clientX;
                oldy = event.clientY;
                // console.log(direction)
            });
        camera.alpha = 0;

        Crafty.e("2D, Canvas, TiledMapBuilder")
            .setMapDataSource(source)
            .createWorld()

    });

    Crafty.scene("Load");


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

});

