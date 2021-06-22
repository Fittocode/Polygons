let numBalls = 40
let spring = 0.05
let friction = -0.9

class Ball {
    constructor(x, y, r, vx, vy, idin, oin) {
        this.posx = x;
        this.posy = y;
        this.radius = r;
        this.velx = vx;
        this.vely = vy;
        this.id = idin
        this.others = oin
        this.gravity = 0.04
        this.health = 10
        this.frozenBalls = 0
    }

    collide() {
        for (let i = this.id + 1; i < numBalls; i++) {
            // console.log(others[i]);
            let bdx = this.others[i].posx - this.posx;
            let bdy = this.others[i].posy - this.posy;
            let distance = sqrt(bdx * bdx + bdy * bdy);
            let minDist = this.others[i].radius + this.radius;
            //   console.log(distance);
            //console.log(minDist);
            if (distance < minDist) {
                //console.log("2");
                let angle = atan2(bdy, bdx);
                let targetX = this.posx + cos(angle) * minDist;
                let targetY = this.posy + sin(angle) * minDist;
                let ax = (targetX - this.others[i].posx) * spring;
                let ay = (targetY - this.others[i].posy) * spring;
                this.velx -= ax;
                this.vely -= ay;
                this.others[i].velx += ax;
                this.others[i].vely += ay;
            }
        }
    }

    display() {
        // fill and draw ellipse(ball) at (posx,posy)
        fill(0, 0, 255)
        ellipse(this.posx, this.posy, 2 * this.radius, 2 * this.radius);
    }
    move() {
        // move ball
        this.vely = this.vely + this.gravity
        this.posx += this.velx;
        this.posy += this.vely;
    }
    checkWallsCollision() {
        // check top and the two side walls only
        // reverse direction if collide
        if (this.posx > width - this.radius) {
            this.posx = width - this.radius
            this.velx *= friction
        }

        if (this.posx < this.radius) {
            this.posx = this.radius
            this.velx *= friction
        }
    }
    checkInclineCollision() {
        for (i = 0; i < ground.length; i++) {
            // check incline collision and reverse direction
            // use coordinate rotation trick, see lecture video for more details. 

            // (dx, dy) is relative position of ball with respect to (gx,gy)

            let dx = this.posx - ground[i].x;
            let dy = this.posy - ground[i].y;


            // compute cosine, sine of rot angle.
            let cosine = cos(ground[i].rot);
            let sine = sin(ground[i].rot);


            // rotate (dx,dy) to new coordinate (dx_,dy_)
            // rotate (velx, vely) to (velx_,vely_)
            // see lecture video for the formulas
            let dx_ = cosine * dx + sine * dy;
            let dy_ = cosine * dy - sine * dx;
            let velx_ = cosine * this.velx + sine * this.vely;
            let vely_ = -sine * this.velx + cosine * this.vely;


            // once rotated, it is easy to see when to bounce
            // and how to bounce(negate vertical velocity in rotated coordinate)
            if (dy_ > -this.radius && this.posx >= ground[i].x1 && this.posx < ground[i].x2) {
                dy_ = -this.radius
                vely_ = -1 * vely_;
            }

            // rotate everything back to restore the original 
            // coordinate axis.
            dx = cosine * dx_ - sine * dy_;
            dy = cosine * dy_ + sine * dx_;
            this.velx = cosine * velx_ - sine * vely_;
            this.vely = cosine * vely_ + sine * velx_;
            this.posx = ground[i].x + dx
            this.posy = ground[i].y + dy
        }

    }

    checkTriangleSide1() {
        // check incline collision and reverse direction
        // use coordinate rotation trick, see lecture video for more details. 

        // (dx, dy) is relative position of ball with respect to (gx,gy)

        if (tArr.length > 0) {
            for (i = 0; i < tArr.length; i++) {
                let midX = (tArr[i].v0.x + tArr[i].v1.x) / 2;
                let midY = (tArr[i].v0.y + tArr[i].v1.y) / 2;

                let dx = this.posx - midX;
                let dy = this.posy - midY;

                let rot = atan2((tArr[i].v1.y - tArr[i].v0.y), (tArr[i].v1.x - tArr[i].v0.x))

                // compute cosine, sine of rot angle.
                let cosine = cos(rot);
                let sine = sin(rot);

                // rotate (dx,dy) to new coordinate (dx_,dy_)
                // rotate (velx, vely) to (velx_,vely_)s
                // see lecture video for the formulas
                let dx_ = cosine * dx + sine * dy;
                let dy_ = cosine * dy - sine * dx;
                let velx_ = cosine * this.velx + sine * this.vely;
                let vely_ = -sine * this.velx + cosine * this.vely;

                // once rotated, it is easy to see when to bounce
                // and how to bounce(negate vertical velocity in rotated coordinate)

                let p1 = tArr[i].v0;
                let p2 = tArr[i].v1
                let p3 = tArr[i].v2

                let d1 = dist(p1.x, p1.y, p2.x, p2.y)
                let db1 = dist(this.posx, this.posy, p1.x, p1.y)
                let db2 = dist(this.posx, this.posy, p2.x, p2.y)
                let buffer = .5

                // side 1: p1 - p2
                if (db1 + db2 >= d1 - buffer && db1 + db2 <= d1 + buffer) {
                    vely_ = -1 * vely_;
                    if (p1.y < p3.y && p1.x > p3.x) {
                        if (p1.y > p2.y && p1.x < p2.x) {
                            // good
                            dy_ = this.radius
                        } else if (p1.y > p2.y && p1.x > p2.x) {
                            // good
                            dy_ = this.radius
                        } else if (p1.y < p2.y && p1.x < p2.x) {
                            // good 
                            dy_ = -this.radius
                        } else if (p1.y < p2.y && p1.x > p2.x) {
                            // good 
                            dy_ = -this.radius
                        }
                    } else if (p1.y < p3.y && p1.x < p3.x) {
                        if (p1.y > p2.y && p1.x < p2.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p1.y > p2.y && p1.x > p2.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p1.y < p2.y && p1.x < p2.x) {
                            // good
                            dy_ = this.radius
                        } else if (p1.y < p2.y && p1.x > p2.x) {
                            // good
                            dy_ = this.radius
                        }
                    } else if (p1.y > p3.y && p1.x < p3.x) {
                        if (p1.y > p2.y && p1.x < p2.x) {
                            // good
                            dy_ = this.radius
                        } else if (p1.y > p2.y && p1.x > p2.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p1.y < p2.y && p1.x < p2.x) {
                            // good
                            dy_ = this.radius
                        } else if (p1.y < p2.y && p1.x > p2.x) {
                            // good
                            dy_ = this.radius
                        }
                    } else if (p1.y > p3.y && p1.x > p3.x) {
                        if (p1.y > p2.y && p1.x < p2.x) {
                            // good
                            dy_ = this.radius
                        } else if (p1.y > p2.y && p1.x > p2.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p1.y < p2.y && p1.x < p2.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p1.y < p2.y && p1.x > p2.x) {
                            // good
                            dy_ = -this.radius
                        }
                    }
                }

                // rotate everything back to restore the original 
                // coordinate axis.
                dx = cosine * dx_ - sine * dy_;
                dy = cosine * dy_ + sine * dx_;
                this.velx = cosine * velx_ - sine * vely_;
                this.vely = cosine * vely_ + sine * velx_;
                this.posx = midX + dx
                this.posy = midY + dy
            }
        }
    }

    checkTriangleSide2() {
        // check incline collision and reverse direction
        // use coordinate rotation trick, see lecture video for more details. 

        // (dx, dy) is relative position of ball with respect to (gx,gy)

        if (tArr.length > 0) {
            for (i = 0; i < tArr.length; i++) {
                let midX = (tArr[i].v1.x + tArr[i].v2.x) / 2;
                let midY = (tArr[i].v1.y + tArr[i].v2.y) / 2;

                let dx = this.posx - midX;
                let dy = this.posy - midY;

                let rot = atan2((tArr[i].v2.y - tArr[i].v1.y), (tArr[i].v2.x - tArr[i].v1.x))

                // compute cosine, sine of rot angle.
                let cosine = cos(rot);
                let sine = sin(rot);

                // rotate (dx,dy) to new coordinate (dx_,dy_)
                // rotate (velx, vely) to (velx_,vely_)s
                // see lecture video for the formulas
                let dx_ = cosine * dx + sine * dy;
                let dy_ = cosine * dy - sine * dx;
                let velx_ = cosine * this.velx + sine * this.vely;
                let vely_ = -sine * this.velx + cosine * this.vely;

                // once rotated, it is easy to see when to bounce
                // and how to bounce(negate vertical velocity in rotated coordinate)

                let p1 = tArr[i].v0;
                let p2 = tArr[i].v1
                let p3 = tArr[i].v2

                let d1 = dist(p2.x, p2.y, p3.x, p3.y)
                let db1 = dist(this.posx, this.posy, p2.x, p2.y)
                let db2 = dist(this.posx, this.posy, p3.x, p3.y)
                let buffer = .5

                // side 1: p1 - p2
                if (db1 + db2 >= d1 - buffer && db1 + db2 <= d1 + buffer) {
                    vely_ = -1 * vely_;
                    if (p2.y < p1.y && p2.x > p1.x) {
                        if (p2.y > p3.y && p2.x < p3.x) {
                            // good
                            dy_ = this.radius
                        } else if (p2.y > p3.y && p2.x > p3.x) {
                            // good
                            dy_ = this.radius
                        } else if (p2.y < p3.y && p2.x < p3.x) {
                            // good 
                            dy_ = -this.radius
                        } else if (p2.y < p3.y && p2.x > p3.x) {
                            // good 
                            dy_ = -this.radius
                        }
                    } else if (p2.y < p1.y && p2.x < p1.x) {
                        if (p2.y > p3.y && p2.x < p3.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p2.y > p3.y && p2.x > p3.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p2.y < p3.y && p2.x < p3.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p2.y < p3.y && p2.x > p3.x) {
                            // good
                            dy_ = this.radius
                        }
                    } else if (p2.y > p1.y && p2.x < p1.x) {
                        if (p2.y > p3.y && p2.x < p3.x) {
                            // good
                            dy_ = this.radius
                        } else if (p2.y > p3.y && p2.x > p3.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p2.y < p3.y && p2.x < p3.x) {
                            // good
                            dy_ = this.radius
                        } else if (p2.y < p3.y && p2.x > p3.x) {
                            // good
                            dy_ = this.radius
                        }
                    } else if (p2.y > p1.y && p2.x > p1.x) {
                        if (p2.y > p3.y && p2.x < p3.x) {
                            // good
                            dy_ = this.radius
                        } else if (p2.y > p3.y && p2.x > p3.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p2.y < p3.y && p2.x < p3.x) {
                            // good
                            dy_ = this.radius
                        } else if (p2.y < p3.y && p2.x > p3.x) {
                            // good
                            dy_ = -this.radius
                        }
                    }
                }

                // rotate everything back to restore the original 
                // coordinate axis.
                dx = cosine * dx_ - sine * dy_;
                dy = cosine * dy_ + sine * dx_;
                this.velx = cosine * velx_ - sine * vely_;
                this.vely = cosine * vely_ + sine * velx_;
                this.posx = midX + dx
                this.posy = midY + dy
            }
        }
    }
    checkTriangleSide3() {
        // check incline collision and reverse direction
        // use coordinate rotation trick, see lecture video for more details. 

        // (dx, dy) is relative position of ball with respect to (gx,gy)

        if (tArr.length > 0) {
            for (i = 0; i < tArr.length; i++) {
                let midX = (tArr[i].v2.x + tArr[i].v0.x) / 2;
                let midY = (tArr[i].v2.y + tArr[i].v0.y) / 2;

                let dx = this.posx - midX;
                let dy = this.posy - midY;

                let rot = atan2((tArr[i].v0.y - tArr[i].v2.y), (tArr[i].v0.x - tArr[i].v2.x))

                // compute cosine, sine of rot angle.
                let cosine = cos(rot);
                let sine = sin(rot);

                // rotate (dx,dy) to new coordinate (dx_,dy_)
                // rotate (velx, vely) to (velx_,vely_)s
                // see lecture video for the formulas
                let dx_ = cosine * dx + sine * dy;
                let dy_ = cosine * dy - sine * dx;
                let velx_ = cosine * this.velx + sine * this.vely;
                let vely_ = -sine * this.velx + cosine * this.vely;

                // once rotated, it is easy to see when to bounce
                // and how to bounce(negate vertical velocity in rotated coordinate)

                let p1 = tArr[i].v0;
                let p2 = tArr[i].v1
                let p3 = tArr[i].v2

                let d1 = dist(p3.x, p3.y, p1.x, p1.y)
                let db1 = dist(this.posx, this.posy, p3.x, p3.y)
                let db2 = dist(this.posx, this.posy, p1.x, p1.y)
                let buffer = .5

                // side 1: p1 - p2
                if (db1 + db2 >= d1 - buffer && db1 + db2 <= d1 + buffer) {
                    vely_ = -1 * vely_;
                    if (p3.y < p2.y && p3.x > p2.x) {
                        if (p3.y > p1.y && p3.x < p1.x) {
                            // good
                            dy_ = this.radius
                        } else if (p3.y > p1.y && p3.x > p1.x) {
                            // good
                            dy_ = this.radius
                        } else if (p3.y < p1.y && p3.x < p1.x) {
                            // good 
                            dy_ = -this.radius
                        } else if (p3.y < p1.y && p3.x > p1.x) {
                            // good 
                            dy_ = this.radius
                        }
                    } else if (p3.y < p2.y && p3.x < p2.x) {
                        if (p3.y > p1.y && p3.x < p1.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p3.y > p1.y && p3.x > p1.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p3.y < p1.y && p3.x < p1.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p3.y < p1.y && p3.x > p1.x) {
                            // good
                            dy_ = this.radius
                        }
                    } else if (p3.y > p2.y && p3.x < p2.x) {
                        if (p3.y > p1.y && p3.x < p1.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p3.y > p1.y && p3.x > p1.x) {
                            // good
                            dy_ = -this.radius
                        } else if (p3.y < p1.y && p3.x < p1.x) {
                            // good
                            dy_ = this.radius
                        } else if (p3.y < p1.y && p3.x > p1.x) {
                            // good
                            dy_ = this.radius
                        }
                    } else if (p3.y > p2.y && p3.x > p2.x) {
                        if (p3.y > p1.y && p3.x < p1.x) {

                            dy_ = this.radius
                        } else if (p3.y > p1.y && p3.x > p1.x) {
                            // good
                            dy_ = this.radius
                        } else if (p3.y < p1.y && p3.x < p1.x) {

                            dy_ = -this.radius
                        } else if (p3.y < p1.y && p3.x > p1.x) {

                            dy_ = -this.radius
                        }
                    }
                }

                // rotate everything back to restore the original 
                // coordinate axis.
                dx = cosine * dx_ - sine * dy_;
                dy = cosine * dy_ + sine * dx_;
                this.velx = cosine * velx_ - sine * vely_;
                this.vely = cosine * vely_ + sine * velx_;
                this.posx = midX + dx
                this.posy = midY + dy
            }
        }
    }
}

function captureBalls() {
    for (i = 0; i < tArr.length; i++) {
        let d1 = Math.floor(dist(tArr[tArr.length - 1].v0.x, tArr[tArr.length - 1].v0.y, tArr[tArr.length - 1].v1.x, tArr[tArr.length - 1].v1.y) / 20)
        let d2 = Math.floor(dist(tArr[tArr.length - 1].v1.x, tArr[tArr.length - 1].v1.y, tArr[tArr.length - 1].v2.x, tArr[tArr.length - 1].v2.y) / 20)
        let d3 = Math.floor(dist(tArr[tArr.length - 1].v2.x, tArr[tArr.length - 1].v2.y, tArr[tArr.length - 1].v0.x, tArr[tArr.length - 1].v0.y) / 20)
        // check if equilateral 
        if (d1 === d2 && d2 === d3) {
            isInsideTriangle(3, 0, 0, 3)
            // check if isosceles
        } else if (d1 === d2 || d1 === d3 || d2 === d3) {
            isInsideTriangle(2, 0, 2, 0)
            // else scalene
        } else {
            isInsideTriangle(1, 1, 0, 0)
        }
    }
}

function isInsideTriangle(multiplier, bluePoints, greenPoints, yellowPoints) {
    if (tArr.length > 0) {
        for (i = 0; i < tArr.length; i++) {
            for (j = 0; j < balls.length; j++) {
                let p1 = tArr[i].v0
                let p2 = tArr[i].v1
                let p3 = tArr[i].v2

                let A = Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2.0)

                let A1 = Math.abs((balls[j].posx * (p2.y - p3.y) + p2.x * (p3.y - balls[j].posy) + p3.x * (balls[j].posy - p2.y)) / 2.0)

                let A2 = Math.abs((p1.x * (balls[j].posy - p3.y) + balls[j].posx * (p3.y - p1.y) + p3.x * (p1.y - balls[j].posy)) / 2.0)

                let A3 = Math.abs((p1.x * (p2.y - balls[j].posy) + p2.x * (balls[j].posy - p1.y) + balls[j].posx * (p1.y - p2.y)) / 2.0)

                if (A == (A1 + A2 + A3)) {
                    balls[j].vely = 0
                    balls[j].velx = 0
                    balls[j].gravity = 0
                    if (capturedArr.includes(balls[j])) {
                        continue
                    } else {
                        capturedArr.push(balls[j])
                        total += multiplier
                        blueTotal += bluePoints
                        greenTotal += greenPoints
                        yellowTotal += yellowPoints
                        if (capturedArr.length === numBalls) {
                            numBalls += 1
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
                            capturedArr.length = 0
                        }
                    }
                }
                // balls not captured will bounce off triangles
            }
        }
    }
}
