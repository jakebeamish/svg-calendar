let seed;
let centre;

let year = 2024;
let month = 4;

let h;

let options = {
    "Year": 2024,
    "Month": 4,
    "Title": true,
    "Title size": 1,
    "DaysOfWeek": true,
    "Day Names size": 1,
    "boxWidth": 100,
    "Font": "Plain",


}

const gui = new dat.GUI();

const hersheyFonts = {
    "Plain": FONT_HERSHEY.PLAIN,
    "Simplex": FONT_HERSHEY.SIMPLEX,
    "Duplex": FONT_HERSHEY.DUPLEX,
    "Triplex": FONT_HERSHEY.TRIPLEX,
    "Complex": FONT_HERSHEY.COMPLEX,
    "Complex Small": FONT_HERSHEY.COMPLEX_SMALL,
    "Gothic English": FONT_HERSHEY.GOTHIC_ENGLISH_TRIPLEX,
    "Gothic German": FONT_HERSHEY.GOTHIC_GERMAN_TRIPLEX,
    "Gothic Italian": FONT_HERSHEY.GOTHIC_ITALIAN_TRIPLEX,
    "Greek Plain": FONT_HERSHEY.GREEK_PLAIN,
    "Greek Simplex": FONT_HERSHEY.GREEK_SIMPLEX,
    "Greek Complex": FONT_HERSHEY.GREEK_COMPLEX,
    "Greek Complex Small": FONT_HERSHEY.GREEK_COMPLEX_SMALL,
    "Italic Complex": FONT_HERSHEY.ITALIC_COMPLEX,
    "Italic Complex Small": FONT_HERSHEY.ITALIC_COMPLEX_SMALL,
    "Italic Triplex": FONT_HERSHEY.ITALIC_TRIPLEX,
    "Script Simplex": FONT_HERSHEY.SCRIPT_SIMPLEX,
    "Script Complex": FONT_HERSHEY.SCRIPT_COMPLEX,
    "Cyrillic Complex": FONT_HERSHEY.CYRILLIC_COMPLEX
};

function setup() {

    canvas = createCanvas(windowWidth,  windowHeight, SVG)
    canvas.position(0, 0)
	canvas.style('position', 'fixed')
	canvas.style('z-index', -1);
    canvas.parent("canvas-container");
    noFill();

    gui.add(options, "Year", 2000, 2050, 1).listen();
    gui.add(options, "Month", 1, 12, 1).listen();
    gui.add(options, "Title");
    gui.add(options, "Title size", 0, 4)
    gui.add(options, "DaysOfWeek").name("Day Names");
    gui.add(options, "Day Names size", 0, 4)
    gui.add(options, "boxWidth", 20, 120, 1).name("Box Width");

    gui.add(options, "Font", Object.keys(hersheyFonts)).listen();


}

function draw() {
    let title = `${year} ${month} calendar`;
    clear()
    document.title = title;
    centre = createVector(width * 0.5, height * 0.6);



    // options["boxWidth"] = width > 500 ? width/12 : 50;
    const boxWidth = options["boxWidth"];
    const boxHeight = boxWidth;

    // scale(0.9)
    if (options["Title"]) {
        drawTitle(centre.x, centre.y - boxHeight * 4, options["Year"], options["Month"]);
    }
    
    if (options["DaysOfWeek"]) {
        drawDaysOfWeek(centre.x, centre.y - boxHeight * 3.6, boxWidth);
    }

    drawCalendar(options["Year"], options["Month"], centre, boxWidth, boxHeight);
}

function drawDaysOfWeek(x, y, boxWidth) {
    for (const [index, value] of daysOfWeek.entries()) {
        push();
        // translate(centre.x - (boxWidth * daysInWeek * 0.5) + (index + 0.5) * boxWidth, 100);
        translate(x - (boxWidth * (daysInWeek * 0.5 - 0.5)) + (index * boxWidth), y)
        noFill();
        stroke(0);
        strokeWeight(1);
        scale(options["Day Names size"])
        P5.hershey.putText(`${value}`, {
            cmap: hersheyFonts[options.Font],
            align: "center"
        })
        pop();

    }
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const daysInWeek = daysOfWeek.length;


function drawCalendar(year, month, centre, boxWidth, boxHeight) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const daysInMonth = endDate.getDate();
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
    translate(x - width * 0.45, y - height * 0.35);
    noFill();
    stroke(0);
    strokeWeight(1);
    scale(0.3)
    P5.hershey.putText(`${day}`, {
        cmap: hersheyFonts[options.Font]
    })
    pop();
    rect(x, y, width, height);
}

function drawTitle(x, y, year, month) {
    const monthString = new Date(year, month - 1, 1).toLocaleString('default', { month: 'long' });

    push();
    translate(x, y);
    noFill();
    stroke(0);
    strokeWeight(1);
    scale(options["Title size"])
    P5.hershey.putText(`${monthString} ${year}`, {
        cmap: hersheyFonts[options.Font],
        align: "center"
    });
    pop();
}

function makeYearCalendar(year, centre, boxWidth, boxHeight) {
    // for (let month = 0; month < 12; month++) {
        // clear();
        drawCalendar(year, month, centre, boxWidth, boxHeight);
        save(`${filename()}.svg`)

    // }
}

function keyPressed() {

    // Press arrow keys to change the month
    if (keyCode === 39) {
        if (options["Month"] == 12) {
            options["Month"] = 1;
            options["Year"]++;
        } else {
            options["Month"]++;
        }
        redraw();
    }

    if (keyCode === 37) {
        if (options["Month"] == 1) {
            options["Month"] = 12;
            options["Year"]--;
        } else {
            options["Month"]--;
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
    // resizeCanvas(windowWidth, o);
    // redraw()
  }
