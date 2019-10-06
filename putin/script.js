const $paintField = document.getElementById('paint-field');
const $svg = document.getElementById("svg"),
    $drawCursor = document.getElementById("draw-cursor"),
    obj_title = document.getElementById("raster-stack");
let mousedownFlag = true,
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

const $loadCanvas = document.getElementById('loading-canvas');
const $canvasBack = document.getElementById('picture-back');
const $canvas = document.getElementById('picture');
$canvas.width = window.innerWidth;
$canvas.height = window.innerHeight;
$canvasBack.width = window.innerWidth;
$canvasBack.height = window.innerHeight;
$loadCanvas.width = window.innerWidth;
$loadCanvas.height = window.innerHeight;
const ctx = $canvas.getContext('2d');
const ctxBack = $canvasBack.getContext('2d');
const ctxLoad =  $loadCanvas.getContext('2d');
function dis(context) {
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
}
dis(ctx);
dis(ctxBack);
dis(ctxLoad);
var img = new Image();
// img.src = './VVP.jpg';
img.src = 'VVP.jpg';
ctx.fillStyle="white";
ctx.fillRect(0, 0, $canvasBack.width, $canvasBack.height);
let length = Math.round(screen.width / 130);
img.onload = function(){
    if (window.mobilecheck) {
        length = 7;
    }

    // ctxLoad.drawImage(img,0,0);
    let newImgWidth, newImgHeight;
    if (img.width > img.height) {
        // ctxLoad.drawImage(img, 0, 0, window.innerWidth / length, (img.height * (img.width / window.innerWidth)) / length);
        newImgWidth = window.innerWidth;
        newImgHeight = (img.height / (img.width / window.innerWidth));
    } else {
        // ctxLoad.drawImage(img, 0, 0, (img.width * (img.height / window.innerHeight))/ length, window.innerHeight / length);
        newImgWidth = (img.width / (img.height / window.innerHeight));
        newImgHeight = window.innerHeight;
    }
    console.log(newImgWidth, newImgHeight);
    ctxLoad.drawImage(img, 0, 0, newImgWidth / length, newImgHeight / length);
    for (let x = 0; x < $canvasBack.width; x += newImgWidth) {
        for (let y = 0; y < $canvasBack.height; y += newImgHeight) {
            ctxBack.drawImage($loadCanvas, 0, 0, newImgWidth / length, newImgHeight / length, x, y, newImgWidth, newImgHeight);
        }
    }
    // ctx.putImageData(ctxLoad.getImageData(0, 0, img.width / 5, img.height / 5), 0, 0, 0, 0, img.width, img.height);
    // ctxBack.drawImage(img,0,0);

    // console.log($loadCanvas.width, $loadCanvas.height);
    // for (let x = 0; x < $loadCanvas.width; x += length) {
    //     for (let y = 0; y < $loadCanvas.height; y += length) {
    //         drawPoint(x, y);
    //     }
    // }
    console.log('vse');
    //     for (let y = 0; x < $loadCanvas.height; y += length) {
    //         drawPoint(x, y);
    //     }
    // }
    // console.log($canvas.width, $canvas.height);
    // for (i = 0; i < 10 + Math.random() * 20; i++) {
    //     const rx = Math.round(Math.random() * $canvas.width);
    //     const ry = Math.round(Math.random() * $canvas.height);
    //     drawPoint(rx, ry);
    // }
};

// pictures = [];
// for (let i = 1; i <= 15; i++) {
//     pictures.push(`${i}.jpeg`);
// }
// function shuffle(array) {
//     array.sort(() => Math.random() - 0.5);
// }
// shuffle(pictures);
// setInterval(() => {
//     img.src = 'pics/' + pictures.shift();
// }, 7000);
// var audio = new Audio('gimn.mp3');
// audio.play();

let wasDrawn = false;

const convertRgbToHex = (rgb) => {
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

const convertHsvToRgb = (hsv) => {
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

const drawPoint = (x, y) => {
    if (document.getElementById("point" + x + y) == null) {
        let steps = 1 - Math.random() * 0.4;
        let size = length;
        // let point = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        // point.setAttribute("x", (x - size / 2).toString());
        // point.setAttribute("y", (y - size / 2).toString());
        // point.setAttribute("width", size.toString());
        // point.setAttribute("height", size.toString());
        const x1 = x % img.width,
            y1 = y % img.height;
        // console.log(x1, y1);
        const rgb = ctxLoad.getImageData(Math.round(x1), Math.round(y1), 1, 1).data;
        // console.log(x, y, rgb);
        const color = convertRgbToHex({
            r: rgb[0],
            g: rgb[1],
            b: rgb[2]
        });
        ctxBack.fillStyle = "#" + color;
        ctxBack.fillRect(x, y, length, length);
        // point.setAttribute("fill", "#" + color);
        // point.setAttribute("id", "point" + x + y);
        // $svg.appendChild(point);
    }
};

const drawRect = (x, y, width) => {
    // console.log(length);
    const w = 9 * length;
    // ctx.fillStyle = "rgba(0, 0, 0, 0)";
    // ctx.fillRect(x, y, w * 2, w * 2);
    // ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    // ctx.clearRect(x - w, y - w, w * 2, w * 2);

    ctx.putImageData(ctxBack.getImageData(x-w/2, y-w/2, w, w), x - w/2, y - w/2);
    ctx.putImageData(ctxBack.getImageData(x-w/2, y-w/2, w, w), x - w/2, y - w/2);
    // for (let i = x - w; i <= x + w; i+=length) {
    //     for (let j = y - w; j <= y + w; j+=length) {
    //         drawPoint(i, j);
    //     }
    // }
};

// const CHANNELS_PER_PIXEL = 4;
// function drawCircle(x0, y0, radius) {
//     var x = radius;
//     var y = 0;
//     var decisionOver2 = 1 - x;   // Decision criterion divided by 2 evaluated at x=r, y=0
//     var imageWidth = $canvas.width;
//     var imageHeight = $canvas.height;
//     var imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
//     var pixelData = imageData.data;
//     var makePixelIndexer = function (width) {
//         return function (i, j) {
//             var index = CHANNELS_PER_PIXEL * (j * width + i);
//             //index points to the Red channel of pixel
//             //at column i and row j calculated from top left
//             return index;
//         };
//     };
//     var pixelIndexer = makePixelIndexer(imageWidth);
//     var drawPixel = function (x, y) {
//         var idx = pixelIndexer(x,y);
//         pixelData[idx] = 255;	//red
//         pixelData[idx + 1] = 0;	//green
//         pixelData[idx + 2] = 255;//blue
//         pixelData[idx + 3] = 255;//alpha
//     };
//     drawPixel = drawPoint;
//
//     while (x >= y) {
//         drawPixel((x * length) + x0, (y* length) + y0);
//         drawPixel((y* length) + x0, (x* length) + y0);
//         drawPixel((-x* length) + x0, (y* length) + y0);
//         drawPixel((-y* length) + x0, (x* length) + y0);
//         drawPixel((-x* length) + x0, (-y* length) + y0);
//         drawPixel((-y* length) + x0, (-x* length) + y0);
//         drawPixel((x* length) + x0, (-y* length) + y0);
//         drawPixel((y* length) + x0, (-x* length) + y0);
//         y++;
//         if (decisionOver2 <= 0) {
//             decisionOver2 += 2 * y + 1; // Change in decision criterion for y -> y+1
//         } else {
//             x--;
//             decisionOver2 += 2 * (y - x) + 1; // Change for y -> y+1, x -> x-1
//         }
//     }
//
//     ctx.putImageData(imageData, 0, 0);
// }

const radius = 1;
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
        drawRect(x, item, radius);
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
        drawRect(x, y, radius);
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

document.addEventListener('touchstart', function(event) {
    length = 10;
    document.getElementById("gimn").play();
    mousedownFlag = true;

    if (event.targetTouches.length > 0) {
        const touch = event.targetTouches[0];
        let [x, y] = [Math.round(touch.pageX) * length, Math.round(touch.pageY) * length];
        drawPoint(x, y);
        entryToSend = x;
        unreadItem = y;

        document.body.style.userSelect = "none";
        document.body.style.webkitUserSelect = "none";
    }
});

document.addEventListener('mousedown', (e) => {
    // document.getElementById("gimn").play();
    // if (!touchIntent) {
        mousedownFlag = true;
        let [x, y] = [
            Math.round(e.pageX / length) * length,
            Math.round(e.pageY / length) * length
        ];
        // drawPoint(x, y);
        drawRect(x, y, radius);
        entryToSend = x;
        unreadItem = y;

        document.body.style.userSelect = "none";
        document.body.style.webkitUserSelect = "none";
    // }
});

document.addEventListener('touchmove', function(event) {
    if (event.targetTouches.length > 0) {
        const touch = event.targetTouches[0];
        let [x, y] = [Math.round(touch.pageX / length) * length, Math.round(touch.pageY / length) * length];
        if (mousedownFlag) {
            if (previousX != null && previousY != null && (x !== previousX || y !== previousY)) {
                drawLine(previousX, previousY, x, y);
            }
            previousX = x;
            previousY = y;
        }
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

// mousedownFlag = true;
//
// document.addEventListener('touchend', function() {
//     document.body.style.userSelect = "auto";
//     document.body.style.webkitUserSelect = "auto";
//     // if (localStorage.getItem("drew") == "True") {
//     //     localStorage.setItem("drew", "False");
//     // }
//     mousedownFlag = false;
//     previousX = null;
//     previousY = null;
//     undoFlag = false;
//     l = i + 1;
//     for (; l <= j; l++) {
//         console.log(l);
//         document.getElementById("layer" + l).remove();
//     }
//     i++;
//     j = i;
//     const svg_xml = (new XMLSerializer).serializeToString($svg);
//     const raterizedImage = document.createElement("img");
//     raterizedImage.setAttribute("src", "data:image/svg+xml;base64," + btoa(svg_xml));
//     raterizedImage.setAttribute("id", "layer" + i);
//     raterizedImage.setAttribute("class", "layer");
//     // raterizedImage.style.width = document.body.clientWidth + "px";
//     // raterizedImage.style.height = document.body.scrollHeight + "px";
//     obj_title.appendChild(raterizedImage);
//     /**
//      * @return {undefined}
//      */
//     raterizedImage.onload = function() {
//         for (; $svg.firstChild;) {
//             $svg.removeChild($svg.firstChild);
//         }
//     };
//     console.log(i);
// });
//
// document.addEventListener("mouseup", () => {
//     document.body.style.userSelect = "auto";
//     document.body.style.webkitUserSelect = "auto";
//     // if (localStorage.getItem("drew") == "True") {
//     //     localStorage.setItem("drew", "False");
//     // }
//     // mousedownFlag = false;
//     previousX = null;
//     previousY = null;
//     undoFlag = false;
//     l = i + 1;
//     for (; l <= j; l++) {
//         console.log(l);
//         document.getElementById("layer" + l).remove();
//     }
//     i++;
//     j = i;
//     const svg_xml = (new XMLSerializer).serializeToString($svg);
//     const raterizedImage = document.createElement("img");
//     raterizedImage.setAttribute("src", "data:image/svg+xml;base64," + btoa(svg_xml));
//     raterizedImage.setAttribute("id", "layer" + i);
//     raterizedImage.setAttribute("class", "layer");
//     // raterizedImage.style.width = document.body.clientWidth + "px";
//     // raterizedImage.style.height = document.body.scrollHeight + "px";
//     obj_title.appendChild(raterizedImage);
//     /**
//      * @return {undefined}
//      */
//     raterizedImage.onload = function() {
//         for (; $svg.firstChild;) {
//             $svg.removeChild($svg.firstChild);
//         }
//     };
//     console.log(i);
// }, false);

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