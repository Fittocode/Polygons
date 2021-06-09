var p = new polygonBlueprint();

function setup() {
    createCanvas(1800, 1200)
    strokeWeight(1)
}

function draw() {
    background(255)
    p.drawBlueprint()
    drawTriangle()
}
