
var vArr = []
var fPolygons = []
let count = 0
let num = 3
let triangle = [3];

function addPolygons() {
    vArr.push(new vertex1(mouseX, mouseY))
}

function mouseClicked() {
    count++
    num += 4
    triangle.push(num)
    addPolygons()
}


function vertex1(x, y) {
    this.x1 = x
    this.y1 = y
    this.height = 7
    this.weight = 7
    this.center = this.height / 2

    this.constructPolygons = function () {
        for (let i = 0; i < vArr.length; i++) {
            // vertex rect
            fill(0)
            rect(vArr[i].x1, vArr[i].y1, 7, 7)
            // guiding line
            if (count % 4 != 0) {
                line((vArr[vArr.length - 1].x1 + this.center), (vArr[vArr.length - 1].y1 + this.center), mouseX, mouseY);
                xt1 = vArr[vArr.length - 1].x1
                yt1 = vArr[vArr.length - 1].y1
                xt2 = mouseX
                yt2 = mouseY

                // position along line where text appears 
                let d = dist(xt1, yt1, xt2, yt2);
                // text 
                push();
                translate((xt1 + xt2) / 2, (yt1 + yt2) / 2);
                text(nfc(d / 25, 1 % 1), 0, -5);
                pop();
            }

            // condition for completed polygon

            // connecting lines - max 5 for pentagon
        }

        for (i = 0, j = 1; i < vArr.length; i++, j++) {
            if (count > (i + 1)) {
                if (count % 4 === 0) {
                    if (vArr[i].x1 > vArr[i].x1 && vArr[i].x1 < (vArr[i].x1 + 10)) {
                        break
                    }
                }
                // condition to reset array and count after closing polygon or 5 sides (6 vertices) 

                if (triangle.indexOf(i) == -1) {
                    line((vArr[i].x1 + this.center), (vArr[i].y1 + this.center), (vArr[j].x1 + this.center), (vArr[j].y1 + this.center))
                }
            }
        }

    }
}

