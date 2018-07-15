// Map between index and filename
var IsometricMap = {
    tiles: [
        "../images/newTiles/grass.png" 		// 0
        ],
    map: (function() {
        let map = [];
        for(let i = 0;i<12;i++) {
            map[i] = [];
            for(let j = 0;j<12;j++){
                map[i][j] = 0;
            }
        }
        return map;
    })()
};
