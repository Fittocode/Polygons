var p;
var x
var y

function setup() {
    createCanvas(1800, 1200)
    strokeWeight(1)
}

function draw() {
    background(255)
    arr
    p = new polyVertex(x, y)
    p.show()
}

function mouseClicked() {
    x = mouseX
    y = mouseY
    addPolyVertex()
    console.log(arr)
}
