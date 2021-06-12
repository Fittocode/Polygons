let p = new polygonBlueprint();
let balls = [];

function setup() {
    createCanvas(1800, 1000)
    strokeWeight(1)
    for (let i = 0; i < numBalls; i++) {
        balls[i] = new Ball(
            random(width / 2),
            10,
            10,
            i,
            balls,
            tArr
        );
    }
}

function draw() {
    background(255)
    p.drawBlueprint()
    drawTriangle()
    captureCircles()
    balls.forEach(ball => {
        ball.collideBall();
        ball.move();
        ball.display();
        // ball.freezeInTriangle()
    });
    // point text
    push();
    fill(0)
    translate(width / 2, 50)
    textSize(60)
    text(total, 10, 30);
    pop();
}

