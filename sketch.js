let seed;
let centre;

let year = 2024;
let month = 4;


function setup() {
    canvas = createCanvas(windowWidth, windowHeight, SVG)
    canvas.position(0, 0)
	canvas.style('position', 'fixed')
	canvas.style('z-index', -1)

    noLoop()
    noFill()
    centre = createVector(width/2, height/2)
}

function draw() {
    let title = `${year} ${month} calendar`;
    clear()
    document.title = title;

    let boxWidth = 100;
    let boxHeight = 100;

    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)
    const daysInMonth = endDate.getDate();
    const startDay = ( 7 + (startDate.getDay() - 1)) % 7;

    
    let counter = 1;
    rectMode(CENTER)
    for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 7; i++) {
            let x = centre.x - (boxWidth * 3.5) + (i+0.5) * boxWidth;
            let y = centre.y - (boxHeight * 3) + j * boxHeight
            if ((i >= (startDay) || j > 0 )&& counter <= daysInMonth) {
                push();
                fill(0)
                text(counter, x - boxWidth * 0.45, y - boxHeight * 0.35)
                pop();
                
                rect(
                x,
                y,
                boxWidth, boxHeight)
                counter++;
            }
        }
    }
}

function keyPressed() {

    // Press arrow keys to change the seed
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
        redraw()
    }

    // Press 'S' key to save SVG file
    if (keyCode === 83) save(`${filename()}.svg`)

    // Press 'D' key to toggle dark mode
    // if (keyCode === 68) darkMode = !darkMode; redraw()
}

function filename() {
    return `${year}_${month}_calendar`
}

function vLine(a, b) {
    line(a.x, a.y, b.x, b.y)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }