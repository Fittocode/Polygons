let p = new polygonBlueprint()

let ground = []
let balls = []
let segments = 15
let peakHeights = []

let gx, gy, rot, len, ball;

function setup() {
    createCanvas(1800, 1000);
    for (let i = 0; i < numBalls; i++) {
        balls[i] = new Ball(random(width, 0), random(height / 8, height / 3), 10, .1, .1, i, balls, tArr)
    }

    for (i = 0; i <= segments; i++) {
        peakHeights.push(random(height - 80, height - 20))
    }

    for (i = 0; i < segments; i++) {
        ground[i] = new Ground(width / segments * i, peakHeights[i], width / segments * (i + 1), peakHeights[i + 1])
    }
    // center of segment = midpoint of (0,400) and (width, height)
    gx = width / 2;
    gy = 500;
}

function draw() {
    background(255);
    // fill and draw triangle(inclined ramp): (0,400), (width,height), (0, height)

    p.drawBlueprint()
    drawTriangle()
    captureBalls()

    balls.forEach(ball => {
        ball.move();
        ball.checkWallsCollision();
        ball.collide()
        ball.checkInclineCollision()
        ball.checkTriangleSide1()
        ball.checkTriangleSide2()
        ball.checkTriangleSide3()
        ball.display();
    })

    fill(155, 300, 200);
    beginShape()
    for (let i = 0; i < segments; i++) {
        vertex(ground[i].x1, ground[i].y1)
        vertex(ground[i].x2, ground[i].y2)
    }
    vertex(ground[segments - 1].x2, height)
    vertex(ground[0].x1, height)
    endShape(CLOSE)

    // point text
    push();
    fill(0)
    translate(width / 2, 50)
    textSize(60)
    text(total, 10, 30);
    pop();

}
