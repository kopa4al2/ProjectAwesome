let GAME_WIDTH;
let GAME_HEIGHT;
$(document).ready(() => {

    let gameContainer = $('#game-container');

    GAME_HEIGHT = gameContainer.height();
    GAME_WIDTH = gameContainer.width();

    //GAME LOOP

    let assetObj = {
        "sprites": {
            "../images/util/arrow-fullscreen-box.png": {
                tile: 960,
                tileh: 960,
                "exit_btn": [0, 0]
            }
        }
    };

    // Crafty.load("../images/util/arrow-fullscreen-box.png");

    Crafty.init(GAME_WIDTH, GAME_HEIGHT, gameContainer[0]);
    let exit = Crafty.e('2D, DOM, Image')
        .image("../images/util/arrow-fullscreen-box.png")
        .attr({x: GAME_WIDTH - 100, y: 0, w: 100, h: 100})
        .bind("Click",
            () => {
                window.alert('Cyk');
                console.log("cyk")
            });
    console.log(exit)
    // Crafty.e('2D, Canvas, exit_btn').attr({x: GAME_WIDTH - 100, y: 0, w: 100, h: 100});


});

