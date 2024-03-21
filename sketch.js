let seed;
let centre;

let year = 2024;
let month = 4;


function setup() {
    canvas = createCanvas(windowWidth, windowHeight, SVG)
    canvas.position(0, 0)
	canvas.style('position', 'fixed')
	canvas.style('z-index', -1)
    noLoop();
    noFill();

}

function draw() {
    let title = `${year} ${month} calendar`;
    clear()
    document.title = title;
    centre = createVector(width/2, height/2);

    const boxWidth = width / 12;

    drawCalendar(year, month, centre, boxWidth, boxWidth);
}

function drawCalendar(year, month, centre, boxWidth, boxHeight) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const daysInMonth = endDate.getDate();
    const daysInWeek = 7;
    const startDay = startDate.getDay() - 1; // Adjusted to start from 1 (Monday)

    rectMode(CENTER);
    let counter = 1;

    for (let j = 0; counter <= daysInMonth; j++) {
        for (let i = 0; i < daysInWeek; i++) {
            const x = centre.x - (boxWidth * daysInWeek * 0.5) + (i + 0.5) * boxWidth;
            const y = centre.y - (boxHeight * 3) + j * boxHeight;

            if ((j > 0 || i >= startDay) && counter <= daysInMonth) {
                drawCell(x, y, counter, boxWidth, boxHeight);
                counter++;
            }
        }
    }
}

function drawCell(x, y, day, width, height) {
    push();
    fill(0);
    textSize(width/8);
    text(day, x - width * 0.45, y - height * 0.35);
    pop();
    rect(x, y, width, height);
}


function keyPressed() {

    // Press arrow keys to change the month
    if (keyCode === 39) {
        if (month == 12) {
            month = 1;
            year++;
        } else {
            month++;
        }
        redraw();
    }

    if (keyCode === 37) {
        if (month == 1) {
            month = 12;
            year--;
        } else {
            month--;
        }
        redraw();
    }

    // Press 'S' key to save SVG file
    if (keyCode === 83) save(`${filename()}.svg`)
}

function filename() {
    return `${year}_${month}_calendar`
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }