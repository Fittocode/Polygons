let numBalls = 55;
let spring = 0.05;
let gravity = 0.002;
let friction = -0.9;
let total = 0

class Ball {
    constructor(xin, yin, din, idin, oin) {
        this.x = xin;
        this.y = yin;
        this.vx = 0;
        this.vy = 0;
        this.diameter = din;
        this.id = idin;
        this.others = oin;
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
        this.vy += gravity;
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

    isInsideTriangle() {
        if (tArr.length > 0) {
            for (i = 0; i < tArr.length; i++) {

                let p1 = tArr[i].v0
                let p2 = tArr[i].v1
                let p3 = tArr[i].v2
                let p = { x: this.x, y: this.y }

                let A = Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2.0)

                let A1 = Math.abs((p.x * (p2.y - p3.y) + p2.x * (p3.y - p.y) + p3.x * (p.y - p2.y)) / 2.0)

                let A2 = Math.abs((p1.x * (p.y - p3.y) + p.x * (p3.y - p1.y) + p3.x * (p1.y - p.y)) / 2.0)

                let A3 = Math.abs((p1.x * (p2.y - p.y) + p2.x * (p.y - p1.y) + p.x * (p1.y - p2.y)) / 2.0)

                if (A == (A1 + A2 + A3)) {
                    this.vy = 0
                    this.vx = 0
                    gravity = 0

                    // point text

                }
            }
        }
    }

    //     let A = (tArr[i].v0.x * (tArr[i].v1.y - tArr[i].v2.y) + tArr[i].v1.x * (tArr[i].v2.y - tArr[i].v0.y) + tArr[i].v2.x * (tArr[i].v0.y - tArr[i].v1.y)) / 2
    // let A1 = (((this.x - this.diameter / 2) * (tArr[i].v1.y - tArr[i].v2.y)) + (tArr[i].v1.x * (tArr[i].v2.y - (this.y - this.diameter / 2))) + (tArr[i].v2.x * ((this.y - this.diameter / 2) - tArr[i].v1.y))) / 2
    // let A2 = ((tArr[i].v0.x * ((this.y - this.diameter / 2) - tArr[i].v2.y)) + ((this.x - this.diameter / 2) * (tArr[i].v2.y - tArr[i].v0.y)) + (tArr[i].v2.x * (tArr[i].v0.y - (this.y - this.diameter / 2)))) / 2
    // let A3 = ((tArr[i].v0.x * (tArr[i].v1.y - (this.y - this.diameter / 2))) + (tArr[i].v1.x * ((this.y - this.diameter / 2) - tArr[i].v0.y)) + ((this.x - this.diameter / 2) * (tArr[i].v0.y - tArr[i].v1.y))) / 2

    display() {
        fill(255, 204);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
}



// function calculateTriangleArea() {
//     let A = (tArr[i].v0.x * (tArr[i].v1.y - tArr[i].v2.y) + tArr[i].v1.x * (tArr[i].v2.y - tArr[i].v0.y) + tArr[i].v2.x * (tArr[i].v0.y - tArr[i].v1.y)) / 2
//     let A1 = ((this.x - this.diameter / 2) * (tArr[i].v1.y - tArr[i].v2.y) + tArr[i].v1.x * (tArr[i].v2.y - (this.y - this.diameter / 2)) + tArr[i].v2.x * ((this.y - this.diameter / 2) - tArr[i].v1.y)) / 2
//     let A2 = (tArr[i].v0.x * ((this.y - this.diameter / 2) - tArr[i].v2.y) + (this.x - this.diameter / 2) * (tArr[i].v2.y - tArr[i].v0.y) + tArr[i].v2.x * (tArr[i].v0.y - (this.y - this.diameter / 2))) / 2
//     let A3 = (tArr[i].v0.x * (tArr[i].v1.y - (this.y - this.diameter / 2)) + tArr[i].v1.x * ((this.y - this.diameter / 2) - tArr[i].v0.y) + (this.x - this.diameter / 2) * (tArr[i].v0.y - tArr[i].v1.y)) / 2

//     if (A === A1 + A2 + A3) {
//         console.log('inside!')
//     }
// }


// let A = area(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)

// let A1 = area(p.x, p.y, p2.x, p2.y, p3.x, p3.y)

// let A2 = area(p1.x, p1.y, p.x, p.y, p3.x, p3.y)

// let A3 = area(p1.x, p1.y, p2.x, p2.y, p.x, p.y)