let vArr = []
let tArr = []
let count = 0
let origin = 0
let triNum = 3
let triColor = 150
let lineColor = 150
let triNumArr = [3];

function pushVertex() {
    // add vertex coordinates to array for lines to work off of
    vArr.push(new polygon(mouseX, mouseY))
}

function mouseClicked() {
    count++
    triNum += 4
    triNumArr.push(triNum)
    pushVertex()
    closeTriangle()
}

function closeTriangle() {
    // push triangle coordinates to new triangle array when triangle path is closed (3rd click is within 1st click box)
    for (let i = 0, j = 1, k = 2; i < vArr.length; i++, j++, k++) {
        if (i > 2) {
            if (vArr[i].x > vArr[origin].x - 7 && vArr[i].x < vArr[origin].x + 10 && vArr[i].y > vArr[origin].y - 7 && vArr[i].y < vArr[origin].y + 7) {
                console.log('it is a triangle!')
                triColor = 0
                lineColor = 0
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
                console.log(tArr)
                origin += 3
            }
            else {
                vArr.length = 0
                tArr.length = 0
            }
        }
    }
}

function polygon(x, y) {
    // vertex coordinates pushed to arr in mouseClicked()
    this.x = x
    this.y = y

    this.drawPolygon = function () {
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
                text(nfc(d / 25, 1 % 1), 0, -5);
                pop();
            }
            // draw triangle if closedTriangle function has been called at least once (aka triangle array has >= 1 item)
            if (tArr.length > 0) {
                fill(color('hsla(160, 100%, 50%, 0.1)'))
                triangle(tArr[0].v0.x + 3.5, tArr[0].v0.y + 3.5, tArr[0].v1.x, tArr[0].v1.y + 3.5, tArr[0].v2.x + 3.5, tArr[0].v2.y + 3.5)
            }
        }
        // guiding line sticks 
        for (i = 0, j = 1; i < vArr.length; i++, j++) {
            if (count > (i + 1)) {
                // condition to draw lines between triangles, otherwise skip to next triangle
                if (triNumArr.indexOf(i) == -1 && i !== 2) {
                    line((vArr[i].x + 3.5), (vArr[i].y + 3.5), (vArr[j].x + 3.5), (vArr[j].y + 3.5))
                }
                if (i === 2) {
                    count = 0
                }
            }
        }
    }
}

// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)

// a = vArr[i].x
// b = vArr[i].y
// c = vArr[j].x
// d = vArr[j].y
// function intersects(a,b,c,d,p,q,r,s) {
//     var det, gamma, lambda;
//     det = (c - a) * (s - q) - (r - p) * (d - b);
//     if (det === 0) {
//       return false;
//     } else {
//       lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
//       gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
//       return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
//     }
//   };

