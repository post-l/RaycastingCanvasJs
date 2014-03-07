var $ = function(id) {return (document.getElementById(id));};

var mapRaw = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,3,0,3,0,0,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,3,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
    [1,0,0,3,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,3,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [1,0,0,3,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,4,0,0,4,2,0,2,2,2,2,2,2,2,2,0,2,4,4,0,0,4,0,0,0,0,0,0,0,1],
    [1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
    [1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
    [1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
    [1,0,0,4,3,3,4,2,2,2,2,2,2,2,2,2,2,2,2,2,4,3,3,4,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];


function Map() {
    this.raw = mapRaw;
    this.width = this.raw[0].length;
    this.height = this.raw.length;
}

Map.prototype.collide = function(pos) {
    if (pos.x < 0 || pos.x >= this.width || pos.y < 0 || pos.y >= this.height)
        return (true);
    else
        return (this.raw[Math.floor(pos.y)][Math.floor(pos.x)] !== 0);
};


function MiniMap(map, scale) {
    var mMCtr = $("minimapContainer");

    this.canvas = $("minimap");
    this.canvasPlayer = $("minimapPlayer");
    this.scale = scale;
    this.canvas.width = map.width * this.scale;
    this.canvas.height = map.height * this.scale;
    this.canvasPlayer.width = this.canvas.width;
    this.canvasPlayer.height = this.canvas.height;
    var w = this.canvas.width + "px";
    var h = this.canvas.height + "px";
    this.canvas.style.width = this.canvasPlayer.style.width = mMCtr.style.width  = w;
    this.canvas.style.height = this.canvasPlayer.style.height = mMCtr.style.height  = h;
    this.drawMap(map);
}

MiniMap.prototype.drawMap = function(map) {
    var ctx = this.canvas.getContext("2d");

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var y = 0; y < map.height; ++y) {
        for (var x = 0; x < map.width; ++x) {
            if (map.raw[y][x] > 0) {
                ctx.fillStyle = "rgb(200, 200, 200)";
                ctx.fillRect(x * this.scale, y * this.scale,
                             this.scale, this.scale);
            }
        }
    }
};

MiniMap.prototype.drawPlayer = function(player) {
    var ctx = this.canvasPlayer.getContext("2d");

    ctx.clearRect(0, 0, this.canvasPlayer.width, this.canvasPlayer.height);
    ctx.fillStyle = "red";
    ctx.fillRect(player.x * this.scale - 2, player.y * this.scale - 2, 4, 4);
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(player.x * this.scale, player.y * this.scale);
    ctx.lineTo((player.x + Math.cos(player.rot) * 4) * this.scale,
               (player.y + Math.sin(player.rot) * 4) * this.scale);
    ctx.closePath();
    ctx.stroke();
};

function Player() {
    this.x = 16;
    this.y = 10;
    this.dir = 0;
    this.rot = 0;
    this.speed = 0;
    this.moveSpeed = 0.18;
    this.rotSpeed = 6 * Math.PI / 180;
}

Player.prototype.move = function(map) {
    var moveStep = this.speed * this.moveSpeed;

    this.rot += this.dir * this.rotSpeed;

    var newPos = {
        x: this.x + Math.cos(this.rot) * moveStep,
        y: this.y + Math.sin(this.rot) * moveStep
    };
    if (!map.collide(newPos)) {
        this.x = newPos.x;
        this.y = newPos.y;
    }
};


function Scene(player, map) {
    this.canvas = $("screen");
    this.player = player;
    this.map = map;
}

Scene.prototype.draw = function() {
    var ctx = this.canvas.getContext("2d");

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var x = 0; x < this.canvas.width; ++x) {
        var wallSize = this.getWallSize(x);
        var skySize = (this.canvas.height - wallSize * 2) / 2;
        ctx.fillStyle = "blue";
        ctx.fillRect(x, 0, x, skySize);
        ctx.fillStyle = "grey";
        ctx.fillRect(x, skySize, x, skySize + wallSize * 2);
        ctx.fillStyle = "green";
        ctx.fillRect(x, skySize + wallSize * 2, x, this.canvas.height);
    }
};

Scene.prototype.getWallSize = function(screenX) {
    var y1 = 1.0 * ((this.canvas.width / 2.0) - screenX) / this.canvas.width;
    var v = {
        x: 0.5 * Math.cos(this.player.rot) - y1 * Math.sin(this.player.rot),
        y: 0.5 * Math.sin(this.player.rot) + y1 * Math.cos(this.player.rot)
    };
    var k = 1.0;
    var dir = {
        x: this.player.x + k * v.x,
        y: this.player.y + k * v.y
    };

    while (dir.x >= 0.0 && dir.y >= 0.0 &&
           dir.x < this.map.width && dir.y < this.map.height &&
           !this.map.raw[Math.floor(dir.y)][Math.floor(dir.x)]) {
        k += 0.01;
        dir.x = this.player.x + k * v.x;
        dir.y = this.player.y + k * v.y;
    }
    return (this.canvas.height / (2.0 * k));
};

function Game() {}

Game.prototype.bindKeys = function() {
    var player = this.player;

    document.onkeydown = function(e) {
        e = e || window.event;
        switch (e.keyCode) {
        case 38:
            player.speed = 1;
            break;
	case 40:
            player.speed = -1;
            break;
        case 37:
            player.dir = 1;
            break;
        case 39:
            player.dir = -1;
            break;
        }
    };
    document.onkeyup = function(e) {
        e = e || window.event;
        switch (e.keyCode) {
        case 38:
        case 40:
            player.speed = 0;
            break;
        case 37:
        case 39:
            player.dir = 0;
            break;
        }
    };
};

Game.prototype.initialize = function() {
    this.map = new Map();
    this.player = new Player();
    this.scene = new Scene(this.player, this.map);
    this.miniMap = new MiniMap(this.map, 10);
    this.bindKeys();
    this.cycle();
};

Game.prototype.cycle = function() {
    var self = this;

    this.update();
    this.draw();
    setTimeout(function() {self.cycle();}, 16);
};

Game.prototype.update = function() {
    this.player.move(this.map);
};

Game.prototype.draw = function() {
    this.scene.draw();
    this.miniMap.drawPlayer(this.player);
};

var myGame = new Game();
setTimeout(function() {myGame.initialize();}, 1);
