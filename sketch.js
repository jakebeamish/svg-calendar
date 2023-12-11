const title = 'Untitled'

let seed;
let center;

function setup() {
    createCanvas(windowWidth, windowHeight, SVG)
    seed = floor(random(1000000))
    randomSeed(seed)
    noiseSeed(seed)
    noLoop()
    center = createVector(width/2, height/2)
}

function draw() {
    clear()
    document.title = title;
    randomSeed(seed)
    noiseSeed(seed)
}

function keyPressed() {
    if (keyCode === 39) seed++; redraw()
    if (keyCode === 37) seed--; redraw()
    if (keyCode === 83) {
        save(`${filename()}.svg`)
    }
}

function filename() {
    return `${title}_seed=${seed}_${width}x${height}`
}