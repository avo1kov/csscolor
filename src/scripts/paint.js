const $paintField = document.getElementById('paint-field');
const $svg = document.getElementById("svg"),
    $drawCursor = document.getElementById("draw-cursor"),
    obj_title = document.getElementById("raster-stack");
let mousedownFlag = false,
    length = Math.round(screen.width / 160),
    previousX = null,
    previousY = null,
    redoFlag = false,
    i = 0,
    j = 0;

let wasDrawn = false;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const drawPoint = (x, y) => {
    if (document.getElementById("point" + x + y) == null) {
        let steps = 1 - Math.random() * 0.4;
        let size = length;
        let point = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        point.setAttribute("x", (x - size / 2).toString());
        point.setAttribute("y", (y - size / 2).toString());
        point.setAttribute("width", size.toString());
        point.setAttribute("height", size.toString());
        let color = palette.currentColor.hex;
        if (!palette.isColorChanged) {
            color = palette.convertRgbToHex(palette.convertHsvToRgb({
                h: y / 2,
                s: 60 * Math.random() + 40,
                v: 100
            }));
        }
        point.setAttribute("fill", "#" + color);
        point.setAttribute("id", "point" + x + y);
        $svg.appendChild(point);
    }
};

const d = (x1, y1, x2, y2) => {
    let dy = x2 - x1;
    let dx = y2 - y1;
    let i = length;
    if (dx < 0) {
        i = i * -1;
        dx = -dx;
    }
    let y = 2 * dx - dy;
    let item = y1;
    let x = x1;
    for (; x <= x2; x = x + length) {
        drawPoint(x, item);
        if (y > 0) {
            item = item + i;
            y = y - 2 * dy;
        }
        y = y + 2 * dx;
    }
};

const e = (x1, y1, x2, y2) => {
    let dy = x2 - x1;
    let dx = y2 - y1;
    let i = length;
    if (dy < 0) {
        i = i * -1;
        dy = -dy;
    }
    let sum = 2 * dy - dx;
    let x = x1;
    let y = y1;
    for (; y <= y2; y = y + length) {
        drawPoint(x, y);
        if (sum > 0) {
            x = x + i;
            sum = sum - 2 * dx;
        }
        sum = sum + 2 * dy;
    }
};

drawLine = (x1, y1, x2, y2) => {
    if (Math.abs(y2 - y1) < Math.abs(x2 - x1)) {
        if (x1 > x2) {
            d(x2, y2, x1, y1);
        } else {
            d(x1, y1, x2, y2);
        }
    } else {
        if (y1 > y2) {
            e(x2, y2, x1, y1);
        } else {
            e(x1, y1, x2, y2);
        }
    }
};

document.addEventListener('mousedown', e => {
    e = e || window.event;
    var target = e.target || e.srcElement,
        className = target.getAttribute("class");
    if (!touchIntent && className == "palette") {
        mousedownFlag = true;
        let [x, y] = [
            Math.round(e.pageX / length) * length,
            Math.round(e.pageY / length) * length
        ];
        drawPoint(x, y);
        entryToSend = x;
        unreadItem = y;

        wrapper.classList.add('non-select');
    }
});

document.addEventListener("mousemove", (e) => {
    let [x, y] = [
        Math.round(e.pageX / length) * length,
        Math.round(e.pageY / length) * length
    ];
    $drawCursor.style.left = x - length / 2 + "px";
    $drawCursor.style.top = y - length / 2 + "px";
    if (mousedownFlag) {
        if (previousX != null && previousY != null && (x !== previousX || y !== previousY)) {
            drawLine(previousX, previousY, x, y);
        }
        previousX = x;
        previousY = y;
    }
}, false);

document.addEventListener("mouseup", () => {
    wrapper.classList.remove('non-select');

    mousedownFlag = false;
    previousX = null;
    previousY = null;
    undoFlag = false;
    l = i + 1;
    for (; l <= j; l++) {
        console.log(l);
        document.getElementById("layer" + l).remove();
    }
    i++;
    j = i;
    const svg_xml = (new XMLSerializer).serializeToString($svg);
    const raterizedImage = document.createElement("img");
    raterizedImage.setAttribute("src", "data:image/svg+xml;base64," + btoa(svg_xml));
    raterizedImage.setAttribute("id", "layer" + i);
    raterizedImage.setAttribute("class", "layer");
    raterizedImage.style.width = document.body.clientWidth + "px";
    raterizedImage.style.height = document.body.scrollHeight + "px";
    obj_title.appendChild(raterizedImage);
    /**
     * @return {undefined}
     */
    raterizedImage.onload = function() {
        for (; $svg.firstChild;) {
            $svg.removeChild($svg.firstChild);
        }
    };
    console.log(i);
}, false);

function onClick() {
    /** @type {boolean} */
    redoFlag = false;
    if (!redoFlag) {
        document.getElementById("layer" + i).classList.add("unvisible");
        console.log("undo", "layer" + i);
    }
    /** @type {number} */
    i = i > 1 ? i - 1 : 1;
    if (redoFlag) {
        document.getElementById("layer" + i).classList.add("unvisible");
        console.log("undo", "layer" + i);
    }
    /** @type {boolean} */
    undoFlag = true;
    console.log(i);
}
/**
 * @return {undefined}
 */
function change() {
    /** @type {boolean} */
    undoFlag = false;
    i = i < j ? i + 1 : j;
    document.getElementById("layer" + i).classList.remove("unvisible");
    console.log("redo", i);
    console.log(i);
}

let undoFlag = false;
document.addEventListener("keyup", function(event) {
    if (event.metaKey || event.ctrlKey) {
        switch(event.which) {
            case 89:
                event.preventDefault();
                event.stopPropagation();
                change();
                break;
            case 90:
                if (event.shiftKey) {
                    event.preventDefault();
                    event.stopPropagation();
                    change();
                } else {
                    event.preventDefault();
                    event.stopPropagation();
                    onClick();
                }
                break;
        }
    }
}, false);