
function drawPolygon() {

    let x1 = 200;
    let y1 = 200;
    let x2 = mouseX;
    let y2 = mouseY;

    line(x1, y1, x2, y2);
    ellipse(x1, y1, 7, 7);
    ellipse(x2, y2, 7, 7);

    // d is the length of the line
    // the distance from point 1 to point 2.
    let d = dist((x1 / 2), y1, x2, y2);

    // Let's write d along the line we are drawing!
    push();
    translate((x1 + x2) / 2, (y1 + y2) / 2);
    rotate(atan2(y2 - y1, x2 - x1));
    text(nfc(d / 50, 1 % 1), 0, -5);
    pop();

}

var vArr = []
var lArr = []
let x2 = 200;
let y2 = 200;
let count = 0

function addPolyVertex() {
    vArr.push(new polyVertex(mouseX, mouseY))
}

function mouseClicked() {
    count++
    console.log(count)
    addPolyVertex()
}


function polyVertex(x, y) {
    this.x1 = x
    this.y1 = y
    this.height = 7
    this.weight = 7
    this.c = this.height / 2
    this.points = []

    this.show = function () {
        for (let i = 0; i < vArr.length; i++) {
            fill(0)
            rect(vArr[i].x1, vArr[i].y1, 7, 7)
            line((vArr[vArr.length - 1].x1 + 3.5), (vArr[vArr.length - 1].y1 + 3.5), mouseX, mouseY);

            if (count > 1) {
                line((vArr[0].x1 + this.c), (vArr[0].y1 + this.c), (vArr[1].x1 + this.c), (vArr[1].y1 + this.c))
                let d = dist((vArr[0].x1 / 2), vArr[0].y1, vArr[1].x2, vArr[1].y2);
                push();
                translate((vArr[0].x1 + vArr[1].x2) / 2, (vArr[0].y1 + vArr[1].y2) / 2);
                rotate(atan2(vArr[1].y2 - vArr[0].y1, vArr[1].x2 - vArr[0].x1));
                text(nfc(d / 50, 1 % 1), 0, -5);
                pop();
            }
            if (count > 2) {
                line((vArr[1].x1 + this.c), (vArr[1].y1 + this.c), (vArr[2].x1 + this.c), (vArr[2].y1 + this.c))
            }
            if (count > 3) {
                line((vArr[2].x1 + this.c), (vArr[2].y1 + this.c), (vArr[3].x1 + this.c), (vArr[3].y1 + this.c))
            }
            if (count > 4) {
                line((vArr[3].x1 + this.c), (vArr[3].y1 + this.c), (vArr[4].x1 + this.c), (vArr[4].y1 + this.c))
            }


            if (vArr.length === 6) {
                vArr.length = 0
                count = 0
            }

            if (vArr.length >= 3) {
                if (vArr[i].x1 > (vArr[0].x1) && vArr[i].x1 < (vArr[0].x1 + 8)) {
                    vArr.length = 0
                    count = 0
                }
            }
        }

    }
}



// function attachLine() {
//     if (vArr.length > 1) {
//         for (i = 0; i < vArr.length; i++) {
//             line((vArr[0].x + 3.5), (vArr[0].y + 3.5), (vArr[1].x + 3.5), (vArr[1].x + 3.5))
//         }
//     }
// }

