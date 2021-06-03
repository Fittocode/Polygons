
var vArr = []
var fPolygons = []
let x2 = 200;
let y2 = 200;
let vCount = 0
let lCount = 0
let pCount = 0

function addPolygons() {
    vArr.push(new polygon(mouseX, mouseY))
}

function mouseClicked() {
    vCount++
    lCount++
    console.log(lCount)
    addPolygons()
    console.log(fPolygons)
}


function polygon(x, y) {
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
            line((vArr[vArr.length - 1].x1 + this.center), (vArr[vArr.length - 1].y1 + this.center), mouseX, mouseY);

            // variables for text
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

            // condition for completed polygon
            if (vArr.length >= 3) {
                if (vArr[i].x1 > (vArr[0].x1) && vArr[i].x1 < (vArr[0].x1 + 8)) {
                    vCount = 0
                }
            }
        }
        // connecting lines - max 5 for pentagon
        for (let i = 0; i < vArr.length; i++) {
            if (lCount > (i + 1)) {
                if (vArr[i].x1 > vArr[0].x1 && vArr[i].x1 < (vArr[0].x1 + 10)) {
                    continue;
                }
                // condition to reset array and count after closing polygon or 5 sides (6 vertices) 
                line((vArr[i].x1 + this.center), (vArr[i].y1 + this.center), (vArr[i + 1].x1 + this.center), (vArr[i + 1].y1 + this.center))
            }
        }
    }
}
