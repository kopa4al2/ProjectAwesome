let GAME_WIDTH;
let GAME_HEIGHT;
let SCREEN_WIDTH;
let SCREEN_HEIGHT;
let TILE_WIDTH = 64;
let TILE_HEIGHT = 64;


let player = {
    availableResources: {
        wood: 100,
        gold: 100
    }
};

let blacksmithBuilding = {
    init: function () {
        Crafty.sprite(305, 259, this.asset, {smith: [0, 0]})
    },
    asset:"../images/blacksmith.png",
    widthInTiles: 2,
    heightInTiles: 2,
    draw: function (x, y) {
        if(Isometric.isCursorOnMap()) {
            let smith = Crafty.e('2D, Canvas, smith')
                .attr({x: x, y: y, w: this.widthInTiles * TILE_WIDTH, h: this.heightInTiles * TILE_HEIGHT, z: 500})
            this.builded = true;
            this.topLeftCoordinate = Isometric.selectedTileX
        }
    },
    price: {
        gold: 30,
        wood: 20
    },

    builded: false,
    topLeftCoordinate: null
};
$(document).ready(() => {

    let gameContainer = $('#game-container');

    let buildingCanvas = $('#buildings-layer')[0];
    let buildingCtx = buildingCanvas.getContext('2d');

    let tileCanvas = $('#tile-layer')[0];
    let tileCtx = tileCanvas.getContext('2d');

    GAME_HEIGHT = gameContainer.height();
    GAME_WIDTH = gameContainer.width();
    SCREEN_HEIGHT = document.body.clientHeight;
    SCREEN_WIDTH = document.body.clientWidth;

    Crafty.init(GAME_WIDTH, GAME_HEIGHT, gameContainer[0]);
    Crafty.viewport.init(GAME_WIDTH, GAME_HEIGHT, gameContainer[0]);
    Crafty.viewport.mouselook(true);
    Crafty.viewport.clampToEntities = true;

    let initHUD = function () {
    };

    function populateBuildings() {
        //TODO: LOAD ALL BUILDINGS FROM DB OR FLAT FILE
        let image = new Image();
        image.src = "../images/blacksmith.png";
        $(image).css({
            'width': '100px',
            'height': '100px'
        }).appendTo($('.building-option'));
        let cost = $('<span>')
            .text(`GOLD: ${blacksmithBuilding.price.gold} WOOD: ${blacksmithBuilding.price.wood}`)
            .appendTo($('.building-option'))
    }

    populateBuildings();

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

        $('#inner-map-hud').show();
        $('#town-map-hud').hide();

        $('#town-link').click(() => {
            Crafty.scene('town-map');
        });


        let e = Crafty.e("2D, Canvas, TiledMapBuilder")
            .setMapDataSource(source)
            .createWorld();

        Crafty.sprite(305, 259, '../images/blacksmith.png', {
            blacksmith: [0, 0]
        });


        Crafty.sprite(300, 268, '../images/workshop.png', {
            workshop: [0, 0]
        });
        let workshop = Crafty.e('2D, Canvas, workshop')
            .attr({
                x: -50,
                y: 200,
                w: 100,
                h: 100,
                z: 60
            });
        let blacksmith = Crafty.e('2D, Canvas, blacksmith')
            .attr({
                x: -90,
                y: 400,
                w: 100,
                h: 100,
                z: 60
            })

        // console.log(blacksmith._y)
        // console.log(blacksmith._h)

        blacksmith.onMouseDown = function (e) {
            // console.log(e.realX)
            // console.log(e.realY)

            if (e.realX >= blacksmith._x
                && e.realX <= blacksmith._x + blacksmith._w
                && e.realY >= blacksmith._y
                && e.realY <= blacksmith._y + blacksmith._h) {
                //TODO: SHOW INFO ABOUT BUILDING
            }

        };

        Crafty.addEvent(blacksmith, Crafty.stage.elem, "mousedown", blacksmith.onMouseDown)

        setTimeout(() => {
            Crafty.viewport.centerOn(blacksmith, 100)
        }, 200);


        Crafty.viewport.scale(1.3)

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
        $('#inner-map-hud').hide();
        $('#town-map-hud').show();

        $('#building-menu').bind('click', () => {
            $('#buildings-list').show();
        });

        $('.building-option').click(()=>{
            placeBuilding(blacksmithBuilding);
            $('body').css({
                'cursor':'none'
            });
            $('#buildings-list').hide();
        });

        //TODO: FETCH FROM DATABASE
        function renderResource() {
            $('#gold-amount').text(player.availableResources.gold);
            $('#wood-amount').text(player.availableResources.wood);
        }

        renderResource();


        Isometric.load();


        function placeBuilding(building) {
            setTimeout(() => {
                building.init();
                let mousemove_timeout = null;
                let img = new Image();
                img.src = building.asset;
                let myFunction = function (e) {
                    if (Isometric.isCursorOnMap()) {
                        $(img)
                            .css({
                                "position": "relative",
                                "z-index": 100,
                                "width": building.widthInTiles * TILE_WIDTH,
                                "height": building.heightInTiles * TILE_HEIGHT,
                                "top": e.clientY - TILE_HEIGHT,
                                "left": e.clientX - TILE_WIDTH
                            })
                            .appendTo($('#game-container'));
                    }
                    window.clearTimeout(mousemove_timeout);
                    mousemove_timeout = null;

                };
                $('#game-container')[0].addEventListener("click", function () {
                    if (building.price.gold < player.availableResources.gold &&
                        building.price.wood < player.availableResources.wood &&
                        Isometric.isCursorOnMap()) {
                        $('body').css({
                            'cursor':'default'
                        });
                        building.draw($(img).css('top'), $(img).css('left'));

                        player.availableResources.gold =
                            player.availableResources.gold - building.price.gold;
                        player.availableResources.wood =
                            player.availableResources.wood - building.price.wood;
                        renderResource();
                    }
                }, {once: true});
                $(window).bind('mousemove', (e) => {
                    if (Isometric.isCursorOnMap()) {
                        if (mousemove_timeout === null) {
                            mousemove_timeout = window.setTimeout(myFunction, 30, e);
                        }
                    }
                });
            }, 100);
        }
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
    // Crafty.scene('loading')






    $('#inner-map-hud').hide();
    $('#town-map-hud').show();

    $('#building-menu').bind('click', () => {
        $('#buildings-list').show();
    });

    $('.building-option').click(()=>{
        placeBuilding(blacksmithBuilding);
        $('body').css({
            'cursor':'none'
        });
        $('#buildings-list').hide();
    });

    //TODO: FETCH FROM DATABASE
    function renderResource() {
        $('#gold-amount').text(player.availableResources.gold);
        $('#wood-amount').text(player.availableResources.wood);
    }

    renderResource();


    Isometric.load();


    function placeBuilding(building) {
        setTimeout(() => {
            building.init();
            let mousemove_timeout = null;
            let img = new Image();
            img.src = building.asset;
            let myFunction = function (e) {
                if (Isometric.isCursorOnMap()) {
                    $(img)
                        .css({
                            "position": "relative",
                            "z-index": 100,
                            "width": building.widthInTiles * TILE_WIDTH,
                            "height": building.heightInTiles * TILE_HEIGHT,
                            "top": e.clientY - TILE_HEIGHT,
                            "left": e.clientX - TILE_WIDTH
                        })
                        .appendTo($('#game-container'));
                }
                window.clearTimeout(mousemove_timeout);
                mousemove_timeout = null;

            };
            $('#game-container')[0].addEventListener("click", function () {
                if (building.price.gold < player.availableResources.gold &&
                    building.price.wood < player.availableResources.wood &&
                    Isometric.isCursorOnMap()) {
                    $('body').css({
                        'cursor':'default'
                    });
                    building.draw($(img).css('top'), $(img).css('left'));

                    player.availableResources.gold =
                        player.availableResources.gold - building.price.gold;
                    player.availableResources.wood =
                        player.availableResources.wood - building.price.wood;
                    renderResource();
                }
            }, {once: true});
            $('#buildings-layer').bind('mousemove', (e) => {
                if (Isometric.isCursorOnMap()) {
                    if (mousemove_timeout === null) {
                        mousemove_timeout = window.setTimeout(myFunction, 30, e);
                    }
                }
            });
        }, 100);
    }
});

