const $paintField = document.getElementById('paint-field');
const $svg = document.getElementById("svg");
const $drawCursor = document.getElementById("draw-cursor");
const obj_title = document.getElementById("raster-stack");

let mousedownFlag = false,
    length = Math.round(screen.width / 130),
    previousX = null,
    previousY = null,
    redoFlag = false,
    i = 0,
    j = 0;

window.mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

const $canvas = document.getElementById('picture-canvas');
let vw = Math.max(document.body.clientWidth || 0, window.innerWidth || 0);
let vh = Math.max(document.body.clientHeight || 0, window.innerHeight || 0);

function setCanvasSize() {
    vw = Math.max(document.body.clientWidth || 0, window.innerWidth || 0);
    vh = Math.max(document.body.clientHeight || 0, window.innerHeight || 0);

    $canvas.width = vw;
    $canvas.height = vh;

    $paintField.style.height = `${vh}px`;
}

window.addEventListener('load', setCanvasSize);

const ctx = $canvas.getContext('2d');

window.addEventListener('resize', function() {
    const canvasData = ctx.getImageData(0, 0, vw, vh);

    setCanvasSize();

    ctx.putImageData(canvasData, 0, 0);
});

let wasDrawn = false;

function convertRgbToHex(rgb) {
    const hex = {
        r: Math.round(rgb.r).toString(16),
        g: Math.round(rgb.g).toString(16),
        b: Math.round(rgb.b).toString(16)
    };

    if (hex.r.length < 2) {
        hex.r = '0' + hex.r;
    }
    if (hex.g.length < 2) {
        hex.g = '0' + hex.g;
    }
    if (hex.b.length < 2) {
        hex.b = '0' + hex.b;
    }

    if ((hex.r[0] === hex.r[1]) && (hex.g[0] === hex.g[1]) && (hex.b[0] === hex.b[1])) {
        hex.r = hex.r[0];
        hex.g = hex.g[0];
        hex.b = hex.b[0];
    }

    return hex.r + hex.g + hex.b;
};

function convertHsvToRgb(hsv) {
    let rgb = {r: 0, g: 0, b: 0},
        h = Math.round(hsv.h),
        s = Math.round(hsv.s),
        v = Math.round(hsv.v),

        h1 = Math.floor(h / 60) % 6,
        vmin = (100 - s) * v / 100,
        a = (v - vmin) * ((h % 60) / 60),
        vinc = vmin + a,
        vdec = v - a;

    switch (h1) {
        case 0:
            rgb = {r: v, g: vinc, b: vmin};
            break;
        case 1:
            rgb = {r: vdec, g: v, b: vmin};
            break;
        case 2:
            rgb = {r: vmin, g: v, b: vinc};
            break;
        case 3:
            rgb = {r: vmin, g: vdec, b: v};
            break;
        case 4:
            rgb = {r: vinc, g: vmin, b: v};
            break;
        case 5:
            rgb = {r: v, g: vmin, b: vdec};
            break;
    }

    rgb.r *= 2.55;
    rgb.g *= 2.55;
    rgb.b *= 2.55;

    return rgb;
};

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawPoint(x, y) {
    if (document.getElementById("point" + x + y) == null) {
        ctx.fillStyle = `#${palette.currentColor.hex}`;
        ctx.fillRect(x, y, length, length)
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

function drawLine(x1, y1, x2, y2) {
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

document.addEventListener('mousedown', (e) => {
    e = e || window.event;
    var target = e.target || e.srcElement,
        className = target.getAttribute("class");

    console.log({touchIntent, className});
    if (!touchIntent && className == "palette") {
        mousedownFlag = true;

        const {x, y} = normalizeXY(e.pageX, e.pageY);

        startDrawing(x, y);
    }
});

document.addEventListener("mousemove", (e) => {
    const {x, y} = normalizeXY(e.pageX, e.pageY);

    if (mousedownFlag) {
        draw(x, y);
    }
}, false);

function normalizeXY(x, y) {
    return {
        x: Math.floor(x / length) * length,
        y: Math.floor(y / length) * length
    };
}

document.addEventListener("mouseup", () => {
    finishDrawing();
}, false);

function startDrawing(x, y) {
    drawPoint(x, y);

    entryToSend = x;
    unreadItem = y;

    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
}

function draw(x, y) {
    if (mousedownFlag) {
        if (previousX != null && previousY != null && (x !== previousX || y !== previousY)) {
            drawLine(previousX, previousY, x, y);
        }
        previousX = x;
        previousY = y;
    }
}

function finishDrawing() {
    document.body.style.userSelect = "auto";
    document.body.style.webkitUserSelect = "auto";

    mousedownFlag = false;

    previousX = null;
    previousY = null;
}

function change() {
    undoFlag = false;
    i = i < j ? i + 1 : j;
    document.getElementById("layer" + i).classList.remove("unvisible");
    console.log("redo", i);
    console.log(i);
}
