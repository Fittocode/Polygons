

function drawPolygon() {

    let x1 = 200;
    let y1 = 200;
    let x2 = mouseX;
    let y2 = mouseY;

    ellipse(x1, y1, 7, 7);
    line(x1, y1, x2, y2);
    ellipse(x2, y2, 7, 7);

    // d is the length of the line
    // the distance from point 1 to point 2.
    let d = dist((x1 / 2), y1, x2, y2);

    // Let's write d along the line we are drawing!
    push();
    translate((x1 + x2) / 2, (y1 + y2) / 2);
    rotate(atan2(y2 - y1, x2 - x1));
    text(nfc(d / 100, 1 % 1), 0, -5);
    pop();

}

function mouseClicked() {

}
