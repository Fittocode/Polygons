let p = new polygonBlueprint();
let balls = [];

function setup() {
    createCanvas(1800, 1000)
    strokeWeight(1)
    for (let i = 0; i < numBalls; i++) {
        balls[i] = new Ball(
            random(width),
            random(height / 4),
            random(10, 20),
            i,
            balls
        );
    }
}

function draw() {
    background(255)
    p.drawBlueprint()
    drawTriangle()
    captureCircles()
    balls.forEach(ball => {
        ball.collide();
        ball.move();
        ball.display();
        // ball.freezeInTriangle()
    });
}

