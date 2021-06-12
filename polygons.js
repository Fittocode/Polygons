let vArr = []
let tArr = []
let capturedArr = []
let scoreArr = []
let count = 0
let total = 0
let blueTotal = 0
let greenTotal = 0
let yellowTotal = 0

function pushVertex() {
    // add vertex coordinates to array for lines to work off of
    vArr.push(new polygonBlueprint(mouseX, mouseY))
}

function mouseClicked() {
    console.log(vArr)
    count++
    pushVertex()
    closeTriangle()
    if (closeTriangle()) {
        count = 0
        vArr.length = 0
    }
}

function closeTriangle() {
    // push triangle coordinates to new triangle array when triangle path is closed (3rd click is within 1st click box)
    for (let i = 0; i < vArr.length; i++) {
        if (i > 2) {
            if (vArr[i].x > vArr[0].x - 7 && vArr[i].x < vArr[0].x + 10 && vArr[i].y > vArr[0].y - 7 && vArr[i].y < vArr[0].y + 7) {
                tArr.push({
                    v0: {
                        x: vArr[0].x,
                        y: vArr[0].y
                    },
                    v1: {
                        x: vArr[1].x,
                        y: vArr[1].y
                    },
                    v2: {
                        x: vArr[2].x,
                        y: vArr[2].y
                    },
                })
                vArr.length = 0
                count = 0
            }
            else {
                vArr.length = 0
                count = 0
            }
        }
    }
}

function drawTriangle() {
    for (i = 0; i < tArr.length; i++) {
        // side lengths
        let d1 = Math.floor(dist(tArr[i].v0.x, tArr[i].v0.y, tArr[i].v1.x, tArr[i].v1.y) / 20)
        let d2 = Math.floor(dist(tArr[i].v1.x, tArr[i].v1.y, tArr[i].v2.x, tArr[i].v2.y) / 20)
        let d3 = Math.floor(dist(tArr[i].v2.x, tArr[i].v2.y, tArr[i].v0.x, tArr[i].v0.y) / 20)
        // check if equilateral 
        if (d1 === d2 && d2 === d3) {
            drawTriangleTotal(yellowTotal, tArr, color('hsla(60, 100%, 50%, 0.2)'))
            // check if isosceles
        } else if (d1 === d2 || d1 === d3 || d2 === d3) {
            drawTriangleTotal(greenTotal, tArr, color('hsla(160, 100%, 50%, 0.2)'))
            // else scalene
        } else {
            drawTriangleTotal(blueTotal, tArr, color('hsla(200, 100%, 50%, 0.2)'))
        }
    }
}

function polygonBlueprint(x, y) {
    // vertex coordinates pushed to arr in mouseClicked()
    this.x = x
    this.y = y

    this.drawBlueprint = function () {
        for (let i = 0; i < vArr.length; i++) {
            // draw vertex rect
            if (i !== 3) {
                fill(0)
                rect(vArr[i].x, vArr[i].y, 7, 7)
            }

            // draw guiding line
            if (count % 4 != 0) {
                line((vArr[vArr.length - 1].x + 3.5), (vArr[vArr.length - 1].y + 3.5), mouseX, mouseY);
                xt1 = vArr[vArr.length - 1].x
                yt1 = vArr[vArr.length - 1].y
                xt2 = mouseX
                yt2 = mouseY

                // position along line where text will appear 
                let d = dist(xt1, yt1, xt2, yt2);
                // draw text 
                push();
                translate((xt1 + xt2) / 2, (yt1 + yt2) / 2);
                text(nfc(d / 20, 1 % 1), 0, -5);
                pop();
            }
        }
        // guiding line sticks 
        for (i = 0, j = 1; i < vArr.length; i++, j++) {
            if (count > (i + 1)) {
                // condition to draw lines between triangles, otherwise skip to next triangle
                if (i < 4) {
                    line((vArr[i].x + 3.5), (vArr[i].y + 3.5), (vArr[j].x + 3.5), (vArr[j].y + 3.5))
                }
            }
            if (i === 4) [
                vArr.length = 0
            ]
        }
    }
}

function freezeBalls() {
    for (i = 0; i < balls.length; i++) {
        balls[i].vy = 0
        balls[i].vx = 0
    }
    console.log('freeze')
}

function unFreezeBalls() {
    for (i = 0; i < balls.length; i++) {
        balls[i].vy = 0
        balls[i].vx = 0
        // setTimeout(() => {
        //     break;
        // }, 5000)
    }
    console.log('unfreeze')
}

function drawTriangleTotal(colorTotal, tArr, fillColor) {
    fill(fillColor)
    triangle(tArr[i].v0.x, tArr[i].v0.y, tArr[i].v1.x, tArr[i].v1.y, tArr[i].v2.x, tArr[i].v2.y)
    push()
    fill(0)
    translate(((tArr[i].v0.x + tArr[i].v1.x + tArr[i].v2.x) / 3), ((tArr[i].v0.y + tArr[i].v1.y + tArr[i].v2.y) / 3))
    textSize(20);
    text(colorTotal, -10, 0);
    pop();
}

function checkIfGolden(tArr) {
    let d1 = Math.floor(dist(tArr[tArr.length - 1].v0.x, tArr[tArr.length - 1].v0.y, tArr[tArr.length - 1].v1.x, tArr[tArr.length - 1].v1.y) / 20)
    let d2 = Math.floor(dist(tArr[tArr.length - 1].v1.x, tArr[tArr.length - 1].v1.y, tArr[tArr.length - 1].v2.x, tArr[tArr.length - 1].v2.y) / 20)
    let d3 = Math.floor(dist(tArr[tArr.length - 1].v2.x, tArr[tArr.length - 1].v2.y, tArr[tArr.length - 1].v0.x, tArr[tArr.length - 1].v0.y) / 20)

    if (d1 === d2 && d2 === d3) {
        freezeBalls()
    } else {
    }
}