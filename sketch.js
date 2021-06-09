var p = new polygon();

function setup() {
    createCanvas(1800, 1200)
    strokeWeight(1)
}

function rectangle(x, y, width, height) {
    fill(0)
    rect(x, y, width, height)
}

function draw() {
    background(255)
    p.drawPolygon()
}
