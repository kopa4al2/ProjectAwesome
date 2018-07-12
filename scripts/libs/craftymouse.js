Crafty.c("MouseFace", {
    _dirAngle: 0, // simple type -> not shared

    _onmouseup: function (e) {
        if (this.disableControls || this.disregardMouseInput) {
            return;
        }
        this.trigger("MouseUp", e);
    },
    _onmousedown: function (e) {
        if (this.disableControls || this.disregardMouseInput) {
            return;
        }
        this.trigger("MouseDown", e);
    },
    _onmousemove: function (e) {
        if (this.disableControls || this.disregardMouseInput) {
            return;
        }

        this._mousePos.x = e.realX;
        this._mousePos.y = e.realY;

        var dx = this.x - e.realX,
            dy = this.y - e.realY;

        if (this._origin) {
            dx += this._origin.x;
            dy += this._origin.y;
        }

        // normalize vector
//        var normal = Math.sqrt(dx * dx + dy * dy);
//        dx /= normal;
//        dy /= normal;

        this._dirAngle = Math.atan2(dy, dx);

        this.trigger("MouseMoved", {pos: this._mousePos,
            rad: this._dirAngle + this.pi,
            grad: (this._dirAngle + this.pi) * this._rad});

        if (Crafty.math.withinRange(this._dirAngle, this._pi_4, this.pi_4)) { // FACE LEFT
            this._dirMove = this._directions.left;
        } else if (Crafty.math.withinRange(this._dirAngle, this.pi_4, this.pi_34)) { // FACE UP
            this._dirMove = this._directions.up;
        } else if (Crafty.math.withinRange(this._dirAngle, this.pi_34, this.pi)) { // FACE RIGHT
            this._dirMove = this._directions.right;
        }

        if (Crafty.math.withinRange(this._dirAngle, this._pi, this._pi_34)) { // FACE LEFT
            this._dirMove = this._directions.right;
        } else if (Crafty.math.withinRange(this._dirAngle, this._pi_34, this._pi_4)) { // FACE DOWN
            this._dirMove = this._directions.down;
        } else if (Crafty.math.withinRange(this._dirAngle, this._pi_4, 0)) { // FACE RIGHT
            this._dirMove = this._directions.left;
        }
    },
    init: function () {
        this.requires("Mouse");

        this._mousePos = {x: 0, y: 0};

        // Init radian angular measurements with respect to atan2 (arctangent) calculations.
        // This would mean in the ranges of (0, -pi) and (0, pi).
        // A helpful link :P - http://en.wikipedia.org/wiki/File:Degree-Radian_Conversion.svg
        this.pi = Math.PI;
        this._pi = -1 * Math.PI;
        this.pi_4 = Math.PI / 4;
        this._pi_4 = -1 * this.pi_4;
        this.pi_34 = 3 * Math.PI / 4;
        this._pi_34 = -1 * this.pi_34;
        this._rad = 180 / Math.PI;

        this._directions = {none: 0, left: -1, right: 1, up: -2, down: 2};
        this._dirMove = this._directions.none;

        Crafty.addEvent(this, Crafty.stage.elem, "mousemove", this._onmousemove);
        Crafty.addEvent(this, Crafty.stage.elem, "mouseup", this._onmouseup);
        Crafty.addEvent(this, Crafty.stage.elem, "mousedown", this._onmousedown);
    },
    MouseFace: function(origin) {
        this._origin = origin;
        return this;
    },
    /**@
     * #MouseFace.getDirection
     *
     * This method get the direction the sprite must be turned to.
     * This direction is relative to the current position of the mouse cursor.
     *
     * @example
     * ~~~
     * var direction = this.getDirection();
     * if (direction == this._directions.left) // Sprite image must face Left
     * ~~~
     */
    getDirection: function() {
        return this._dirMove;
    },
    getAngle: function() {
        return this._dirAngle + this.pi;
    }
}); 