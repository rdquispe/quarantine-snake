// Global Variables
let s;
let scl = 20;
let food;
let playfield = 600;

function setup() {
    createCanvas(playfield, 640);
    background(51);
    s = new Snake();
    frameRate(10);
    pickLocation();
}

// Draw

function draw() {
    background(51);
    scoreboard();
    if (s.eat(food)) {
        pickLocation();
    }
    s.death();
    s.update();
    s.show();

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
}

// Pick

function pickLocation() {
    var cols = floor(playfield / scl);
    var rows = floor(playfield / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);

    for (var i = 0; i < s.tail.length; i++) {
        var pos = s.tail[i];
        var d = dist(food.x, food.y, pos.x, pos.y);
        if (d < 1) {
            pickLocation();
        }
    }
}

// Scoreboard

function scoreboard() {
    fill(0);
    rect(0, 600, 600, 40);
    fill(255);
    textFont("Georgia");
    textSize(18);
    text("Score: ", 10, 625);
    text("Highscore: ", 450, 625)
    text(s.score, 70, 625);
    text(s.highscore, 540, 625)
}

// Control

function keyPressed() {
    if (keyCode === UP_ARROW) {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
    }
}
