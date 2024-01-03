const title = 'January_2024_cal'

let seed;
let center;
let darkMode = true;

let year = 2024;
let month = 2;

const colours = {
    light: 230,
    dark: 12
}



function setup() {
    canvas = createCanvas(windowWidth, windowHeight, SVG)
    canvas.position(0, 0)
	canvas.style('position', 'fixed')
	canvas.style('z-index', -1)

    seed = floor(random(1000000))
    noLoop()
    noFill()
    center = createVector(width/2, height/2)
}

function draw() {
    clear()
    console.log(`Drawing seed ${seed}, ${width} by ${height}`)
    document.title = `${title} ${seed}`;
    randomSeed(seed)
    noiseSeed(seed)

    if (darkMode) {
        background(colours.dark)
        stroke(colours.light)
    } else {
        background(colours.light)
        stroke(colours.dark)
    }

    let boxWidth = 100;
    let boxHeight = 100;

    // console.log()
    // new Date(year, month, 0).getDate();

    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)
    console.log(startDate, endDate)
    const daysInMonth = endDate.getDate();
    const startDay = ( 7 + (startDate.getDay() - 1)) % 7;
    console.log(daysInMonth, startDay)
    // console.log(date.getDate(), (date.getDa)y() + 1 % 7))
    let counter = 1;
    rectMode(CENTER)
    for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 7; i++) {
            let x = center.x - (boxWidth * 3.5) + (i+0.5) * boxWidth;
            let y = center.y - (boxHeight * 3) + j * boxHeight
            if ((i >= (startDay) || j > 0 )&& counter <= daysInMonth) {
            // textAlign(LEFT, TOP)
                text(counter, x - boxWidth * 0.45, y - boxHeight * 0.35)
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
    if (keyCode === 39) seed++; redraw()
    if (keyCode === 37) seed--; redraw()

    // Press 'S' key to save SVG file
    if (keyCode === 83) save(`${filename()}.svg`)

    // Press 'D' key to toggle dark mode
    if (keyCode === 68) darkMode = !darkMode; redraw()
}

function filename() {
    return `${title}_seed=${seed}_${width}x${height}`
}

function vLine(a, b) {
    line(a.x, a.y, b.x, b.y)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }