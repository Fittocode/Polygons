let numBalls = 10;
let spring = 0.05;
let friction = -0.9;

class Ball {
    constructor(xin, yin, din, idin, oin) {
        this.x = xin;
        this.y = yin;
        this.vx = 0;
        this.vy = 0;
        this.diameter = din;
        this.id = idin;
        this.others = oin;
        this.total = 0
        this.frozenBalls = 0
        this.gravity = 0.02
    }

    collide() {
        for (let i = this.id + 1; i < numBalls; i++) {
            // console.log(others[i]);
            let dx = this.others[i].x - this.x;
            let dy = this.others[i].y - this.y;
            let distance = sqrt(dx * dx + dy * dy);
            let minDist = this.others[i].diameter / 2 + this.diameter / 2;
            //   console.log(distance);
            //console.log(minDist);
            if (distance < minDist) {
                //console.log("2");
                let angle = atan2(dy, dx);
                let targetX = this.x + cos(angle) * minDist;
                let targetY = this.y + sin(angle) * minDist;
                let ax = (targetX - this.others[i].x) * spring;
                let ay = (targetY - this.others[i].y) * spring;
                this.vx -= ax;
                this.vy -= ay;
                this.others[i].vx += ax;
                this.others[i].vy += ay;
            }
        }
    }

    move() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x + this.diameter / 2 > width) {
            this.x = width - this.diameter / 2;
            this.vx *= friction;
        } else if (this.x - this.diameter / 2 < 0) {
            this.x = this.diameter / 2;
            this.vx *= friction;
        }
        if (this.y + this.diameter / 2 > height) {
            this.y = height - this.diameter / 2;
            this.vy *= friction;
        } else if (this.y - this.diameter / 2 < 0) {
            this.y = this.diameter / 2;
            this.vy *= friction;
        }
    }

    display() {
        fill(255, 205)
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
}


function captureCircles() {
    for (i = 0; i < tArr.length; i++) {
        let d1 = Math.floor(dist(tArr[tArr.length - 1].v0.x, tArr[tArr.length - 1].v0.y, tArr[tArr.length - 1].v1.x, tArr[tArr.length - 1].v1.y) / 20)
        let d2 = Math.floor(dist(tArr[tArr.length - 1].v1.x, tArr[tArr.length - 1].v1.y, tArr[tArr.length - 1].v2.x, tArr[tArr.length - 1].v2.y) / 20)
        let d3 = Math.floor(dist(tArr[tArr.length - 1].v2.x, tArr[tArr.length - 1].v2.y, tArr[tArr.length - 1].v0.x, tArr[tArr.length - 1].v0.y) / 20)
        // check if equilateral 
        if (d1 === d2 && d2 === d3) {
            isCaptured(3, 0, 0, 3)
            // check if isosceles
        } else if (d1 === d2 || d1 === d3 || d2 === d3) {
            isCaptured(2, 0, 2, 0)
            // else scalene
        } else {
            isCaptured(1, 1, 0, 0)
        }
    }
}

function isCaptured(multiplier, bluePoints, greenPoints, yellowPoints) {
    if (tArr.length > 0) {
        for (i = 0; i < tArr.length; i++) {
            for (j = 0; j < balls.length; j++) {
                let p1 = tArr[i].v0
                let p2 = tArr[i].v1
                let p3 = tArr[i].v2
                // let p = { x: balls[j].x, y: balls[j].y }

                let A = Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2.0)

                let A1 = Math.abs((balls[j].x * (p2.y - p3.y) + p2.x * (p3.y - balls[j].y) + p3.x * (balls[j].y - p2.y)) / 2.0)

                let A2 = Math.abs((p1.x * (balls[j].y - p3.y) + balls[j].x * (p3.y - p1.y) + p3.x * (p1.y - balls[j].y)) / 2.0)

                let A3 = Math.abs((p1.x * (p2.y - balls[j].y) + p2.x * (balls[j].y - p1.y) + balls[j].x * (p1.y - p2.y)) / 2.0)

                if (A == (A1 + A2 + A3)) {
                    balls[j].vy = 0
                    balls[j].vx = 0
                    balls[j].gravity = 0
                    if (capturedArr.includes(balls[j])) {
                        continue
                    } else {
                        capturedArr.push(balls[j])
                        total += multiplier
                        blueTotal += bluePoints
                        greenTotal += greenPoints
                        yellowTotal += yellowPoints
                    }
                }
            }
        }
    }
}