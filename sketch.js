const title = 'Untitled'

let seed;
let center;
let darkMode;

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
        stroke(colours.light)
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