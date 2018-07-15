/**
 * Created by stefan on 12.07.18.
 */
//Draggable camera object
/* DRAGGABLE CAMERA OBJECT
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
    console.log(`x: ${Crafty.viewport.x} y: ${Crafty.viewport.y} bounds: ${Crafty.viewport.bounds}`)

    oldx = event.clientX;
    oldy = event.clientY;
    console.log(direction)
});
camera.alpha = 0.3;
*/
