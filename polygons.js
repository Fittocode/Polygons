var vArr = []
let count = 0
let num = 3
let triNumArr = [3];

function pushVertex() {
    // adding vertex coordinates to array for lines to work off of
    vArr.push(new polygon(mouseX, mouseY))
}

function mouseClicked() {
    count++
    num += 4
    triNumArr.push(num)
    pushVertex()
    console.log(vArr[0].x, vArr[0].y)
}

function polygon(x, y) {
    // vertex coordinates pushed to arr in mouseClicked()
    this.x = x
    this.y = y

    this.drawPolygon = function () {
        for (let i = 0; i < vArr.length; i++) {
            // vertex rect
            fill(0)
            rect(vArr[i].x, vArr[i].y, 7, 7)

            // guiding line
            if (count % 4 != 0) {
                line((vArr[vArr.length - 1].x + 3.5), (vArr[vArr.length - 1].y + 3.5), mouseX, mouseY);
                xt1 = vArr[vArr.length - 1].x
                yt1 = vArr[vArr.length - 1].y
                xt2 = mouseX
                yt2 = mouseY

                // position along line where text will appear 
                let d = dist(xt1, yt1, xt2, yt2);
                // text 
                push();
                translate((xt1 + xt2) / 2, (yt1 + yt2) / 2);
                text(nfc(d / 25, 1 % 1), 0, -5);
                pop();
            }
        }

        for (i = 0, j = 1; i < vArr.length; i++, j++) {
            if (count > (i + 1)) {
                // condition to draw lines between triangles, otherwise skip to next triangle
                if (triNumArr.indexOf(i) == -1) {
                    line((vArr[i].x + 3.5), (vArr[i].y + 3.5), (vArr[j].x + 3.5), (vArr[j].y + 3.5))
                }
            }
        }

    }
}
