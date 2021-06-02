
// function drawPolygon() {

//     let x1 = 200;
//     let y1 = 200;
//     let x2 = mouseX;
//     let y2 = mouseY;

//     line(x1, y1, x2, y2);
//     ellipse(x1, y1, 7, 7);
//     ellipse(x2, y2, 7, 7);

//     // d is the length of the line
//     // the distance from point 1 to point 2.
//     let d = dist((x1 / 2), y1, x2, y2);

//     // Let's write d along the line we are drawing!
//     push();
//     translate((x1 + x2) / 2, (y1 + y2) / 2);
//     rotate(atan2(y2 - y1, x2 - x1));
//     text(nfc(d / 50, 1 % 1), 0, -5);
//     pop();

// }

var arr = []

function polyVertex(x, y) {
    this.x = x
    this.y = y
    this.height = 7
    this.width = 7
    this.points = []

    this.show = function () {
        for (i = 0; i < arr.length; i++) {
            rect(arr[i].x, arr[i].y, 7, 7)
            console.log(arr[i].x)
            if (arr.length >= 3) {
                if (arr[i].x >= arr[0].x && arr[i].x <= arr[0].x + 7) {
                    arr.length = 0
                }
            }
        }
    }
}

function addPolyVertex() {
    arr.push(new polyVertex(mouseX, mouseY))
}



