// 'use strict';
/** @type {string} */
var uri = "https://" + document.location.hostname + "/";
/** @type {!Array<string>} */
var uriSplit = document.location.pathname.split("/");
/** @type {number} */
i = 1;
for (; i < uriSplit.length; i++) {
  if (uriSplit[i] == "hex" || uriSplit[i] == "hexa" || uriSplit[i] == "rgb" || uriSplit[i] == "rgba" || uriSplit[i] == "hsv" || uriSplit[i] == "hsva") {
    break;
  } else {
    /** @type {string} */
    uri = uri + (uriSplit[i] + "/");
  }
}
if (uri[uri.length - 2] == "/") {
  /** @type {string} */
  uri = uri.substr(0, uri.length - 1);
}
/** @type {(Element|null)} */
var palette = document.getElementById("palette");
/** @type {boolean} */
var allowSelect = true;
controlSelection(document);
var hsv = {
  h : 0,
  s : 0,
  v : 100,
  a : 100
};
/** @type {(Element|null)} */
var hsvInput = document.getElementById("hsv-input");
/** @type {(Element|null)} */
var hexInput = document.getElementById("hex-input");
/** @type {(Element|null)} */
var rgbInput = document.getElementById("rgb-input");
/** @type {(Element|null)} */
var rgbPercentInput = document.getElementById("rgb-percent-input");
/** @type {(Element|null)} */
var colorDisp = document.getElementById("color-disp");
/** @type {(Element|null)} */
var alphaGradientStart = document.getElementById("transparent-gradient-color-start");
/** @type {(Element|null)} */
var alphaGradientEnd = document.getElementById("transparent-gradient-color-end");
/** @type {(Element|null)} */
var textExample = document.getElementById("text-example");
/** @type {(Element|null)} */
var pickerColor = document.getElementById("picker-color");
/** @type {(Element|null)} */
var pickerColorCursor = document.getElementById("picker-color-cursor");
/** @type {(Element|null)} */
var pickerColorTone = document.getElementById("picker-color-tone");
/** @type {boolean} */
var pushColor = false;
/** @type {(Element|null)} */
var pickerTone = document.getElementById("picker-tone");
/** @type {(Element|null)} */
var pickerToneCursor = document.getElementById("picker-tone-cursor");
/** @type {(Element|null)} */
var pickerToneCursorBackground = document.getElementById("picker-tone-cursor-background");
/** @type {boolean} */
var pushTone = false;
/** @type {(Element|null)} */
var pickerAlpha = document.getElementById("picker-alpha");
/** @type {(Element|null)} */
var pickerAlphaCursor = document.getElementById("picker-alpha-cursor");
/** @type {boolean} */
var pushAlpha = false;
/** @type {number} */
var coefPicker = 10;
/** @type {number} */
var coefScroll = 8;
var pickerColorPosition;
var pickerTonePosition;
var pickerAlphaPosition;
/** @type {(Element|null)} */
var labelRGBa = document.getElementById("label-rgb-a");
/** @type {(Element|null)} */
var selectInput = hexInput;

var inputsBackup = {
  hsv : hsvInput.value,
  hex : hexInput.value,
  rgb : rgbInput.value,
  rgbPercent : rgbPercentInput.value
};

/** @type {(Element|null)} */
var vk_comments = document.getElementById("vk_comments");
windowResize();
window.addEventListener("resize", windowResize);
window.addEventListener("scroll", windowResize);
/**
 * @return {undefined}
 */
function windowResize() {
  /** @type {string} */
  pickerToneCursor.style.left = pickerTone.offsetLeft + "px";
  /** @type {string} */
  pickerAlphaCursor.style.left = pickerAlpha.offsetWidth - pickerAlphaCursor.offsetWidth + "px";
  /** @type {string} */
  pickerAlphaCursor.style.top = pickerAlpha.offsetTop + "px";
  pickerColorPosition = getCoords(pickerColor);
  pickerTonePosition = pickerTone.getBoundingClientRect();
  pickerAlphaPosition = getCoords(pickerAlpha);
  setCursorOnPickers();
}
/**
 * @param {!Element} elem
 * @return {?}
 */
function getCoords(elem) {
  var offset = elem.getBoundingClientRect();
  /** @type {!HTMLBodyElement} */
  var body = document.body;
  /** @type {!Element} */
  var docElem = document.documentElement;
  /** @type {number} */
  var dropOuterHeight = window.pageYOffset || docElem.scrollTop || body.scrollTop;
  /** @type {number} */
  var calendarWidth = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
  /** @type {number} */
  var comboTop = docElem.clientTop || body.clientTop || 0;
  /** @type {number} */
  var l = docElem.clientLeft || body.clientLeft || 0;
  /** @type {number} */
  var top = offset.top + dropOuterHeight - comboTop;
  /** @type {number} */
  var xPos = offset.left + calendarWidth - l;
  return {
    top : top,
    left : xPos
  };
}
getUriParams();

/**
 * @param {number} b
 * @return {?}
 */
function validSize(b) {
  /** @type {number} */
  b = b * 1;
  if (b > 1 && b < 2E4) {
    return true;
  }
  return false;
}
hsvInput.addEventListener("focus", function() {
  selectInput = hsvInput;
  setUriParams();
});
hexInput.addEventListener("focus", function() {
  selectInput = hexInput;
  setUriParams();
});
rgbInput.addEventListener("focus", function() {
  selectInput = rgbInput;
  setUriParams();
});
rgbPercentInput.addEventListener("focus", function() {
  selectInput = rgbPercentInput;
  setUriParams();
});
hsvInput.addEventListener("keyup", function() {
  if (hsvInput.value != inputsBackup.hsv) {
    outColorFromInput("hsv");
  }
});
hexInput.addEventListener("keyup", function() {
  if (hexInput.value != inputsBackup.hex) {
    outColorFromInput("hex");
  }
});
rgbInput.addEventListener("keyup", function() {
  if (rgbInput.value != inputsBackup.rgb) {
    outColorFromInput("rgb");
  }
});
rgbPercentInput.addEventListener("keyup", function() {
  if (rgbPercentInput.value != inputsBackup.rgbPercent) {
    outColorFromInput("rgbPercent");
  }
});
/**
 * @return {undefined}
 */
function setInputBackup() {
  inputsBackup.hsv = hsvInput.value;
  inputsBackup.hex = hexInput.value;
  inputsBackup.rgb = rgbInput.value;
  inputsBackup.rgbPercent = rgbPercentInput.value;
}
/**
 * @param {string} type
 * @return {undefined}
 */
function outColorFromInput(type) {
  var rgb = HSVtoRGB(hsv);
  if (type == "rgb" || type == "rgbPercent") {
    /** @type {string} */
    var f = "";
    if (type == "rgb") {
      f = rgbInput.value.replace(/[^0-9., ]/g, "");
    } else {
      f = rgbPercentInput.value.replace(/[^0-9., ]/g, "");
    }
    rgbInput.value = f;
    f = f.split(",");
    if (f.length >= 3) {
      if (type == "rgb") {
        /** @type {number} */
        rgb.r = f[0] * 1;
        /** @type {number} */
        rgb.g = f[1] * 1;
        /** @type {number} */
        rgb.b = f[2] * 1;
      } else {
        /** @type {number} */
        rgb.r = f[0] * 255;
        /** @type {number} */
        rgb.g = f[1] * 255;
        /** @type {number} */
        rgb.b = f[2] * 255;
      }
      rgb = validRGB(rgb);
      if (f.length > 3) {
        /** @type {number} */
        hsv.a = f[3] * 100;
      } else {
        /** @type {number} */
        hsv.a = 100;
      }
      RGBtoHSV(rgb);
    }
  }
  if (type == "hsv") {
    var a = hsvInput.value.replace(/[^0-9., ]/g, "");
    hsvInput.value = a;
    a = a.split(",");
    if (a.length >= 3) {
      /** @type {number} */
      hsv.h = a[0] * 1;
      /** @type {number} */
      hsv.s = a[1] * 1;
      /** @type {number} */
      hsv.v = a[2] * 1;
    }
    hsv = validHSV(hsv);
    if (a.length > 3) {
      /** @type {number} */
      hsv.a = a[3] * 100;
    } else {
      /** @type {number} */
      hsv.a = 100;
    }
    rgb = HSVtoRGB(hsv);
  }
  if (type == "hex") {
    var hex = hexInput.value.replace(/[^0-9a-fA-F]/g, "").substr(0, 6);
    hexInput.value = hex;
    rgb = HEXtoRGB(hex);
    if (rgb != null) {
      RGBtoHSV(rgb);
    } else {
      rgb = HSVtoRGB(hsv);
    }
  }
  if (type != "hsv") {
    /** @type {string} */
    hsvInput.value = Math.round(hsv.h) + ", " + Math.round(hsv.s) + ", " + Math.round(hsv.v);
  }
  if (type != "hex") {
    hexInput.value = RGBtoHEX(rgb);
  }
  if (type != "rgb") {
    rgbInput.value = Math.round(rgb.r) + ", " + Math.round(rgb.g) + ", " + Math.round(rgb.b) + supAlpha;
  }
  if (type != "rgbPercent") {
    rgbPercentInput.value = Math.round(rgb.r / 2.55) / 100 + ", " + Math.round(rgb.g / 2.55) / 100 + ", " + Math.round(rgb.b / 2.55) / 100 + supAlpha;
  }
  setInputBackup();
  setColorOnPickers();
  setCursorOnPickers();
  setUriParams();
}
/**
 * @param {!Object} from
 * @return {?}
 */
function validRGB(from) {
  if (from.r < 0) {
    /** @type {number} */
    from.r = 0;
  }
  if (from.g < 0) {
    /** @type {number} */
    from.g = 0;
  }
  if (from.b < 0) {
    /** @type {number} */
    from.b = 0;
  }
  if (hsv.a < 0) {
    /** @type {number} */
    hsv.a = 0;
  }
  if (from.r > 255) {
    /** @type {number} */
    from.r = 255;
  }
  if (from.g > 255) {
    /** @type {number} */
    from.g = 255;
  }
  if (from.b > 255) {
    /** @type {number} */
    from.b = 255;
  }
  if (hsv.a > 1) {
    /** @type {number} */
    hsv.a = 1;
  }
  return from;
}
/**
 * @param {?} dst
 * @return {?}
 */
function validHSV(dst) {
  if (hsv.h < 0) {
    /** @type {number} */
    hsv.h = 0;
  }
  if (hsv.s < 0) {
    /** @type {number} */
    hsv.s = 0;
  }
  if (hsv.v < 0) {
    /** @type {number} */
    hsv.v = 0;
  }
  if (hsv.a < 0) {
    /** @type {number} */
    hsv.a = 0;
  }
  if (hsv.h >= 360) {
    /** @type {number} */
    hsv.h = 0;
  }
  if (hsv.s > 100) {
    /** @type {number} */
    hsv.s = 100;
  }
  if (hsv.v > 100) {
    /** @type {number} */
    hsv.v = 100;
  }
  if (hsv.a > 1) {
    /** @type {number} */
    hsv.a = 1;
  }
  return hsv;
}
/**
 * @return {undefined}
 */
function outColor() {
  var rgb = HSVtoRGB(hsv);
  setColorOnPickers();
  if (hsv.a < 100) {
    /** @type {string} */
    supAlpha = ", " + Math.round(hsv.a) / 100;
  } else {
    /** @type {string} */
    supAlpha = "";
  }
  /** @type {string} */
  hsvInput.value = Math.round(hsv.h) + ", " + Math.round(hsv.s) + ", " + Math.round(hsv.v);
  hexInput.value = RGBtoHEX(rgb);
  /** @type {string} */
  rgbInput.value = Math.round(rgb.r) + ", " + Math.round(rgb.g) + ", " + Math.round(rgb.b) + supAlpha;
  /** @type {string} */
  rgbPercentInput.value = Math.round(rgb.r / 2.55) / 100 + ", " + Math.round(rgb.g / 2.55) / 100 + ", " + Math.round(rgb.b / 2.55) / 100 + supAlpha;
  setInputBackup();
  sessionStorage.setItem("color", "rgba(" + Math.round(rgb.r) + "," + Math.round(rgb.g) + "," + Math.round(rgb.b) + "," + Math.round(hsv.a) / 100 + ")");
}
/**
 * @return {undefined}
 */
function setColorOnPickers() {
  var rgb = HSVtoRGB(hsv);
  /** @type {string} */
  var playheadSeconds = "rgb(" + Math.round(rgb.r) + ", " + Math.round(rgb.g) + ", " + Math.round(rgb.b) + ")";
  colorDisp.setAttribute("fill", "rgba(" + Math.round(rgb.r) + ", " + Math.round(rgb.g) + ", " + Math.round(rgb.b) + ", " + hsv.a / 100 + ")");
  /** @type {string} */
  textExample.style.color = "rgba(" + Math.round(rgb.r) + ", " + Math.round(rgb.g) + ", " + Math.round(rgb.b) + ", " + hsv.a / 100 + ")";
  alphaGradientStart.setAttribute("stop-color", playheadSeconds);
  alphaGradientEnd.setAttribute("stop-color", playheadSeconds);
  pickerColorTone.setAttribute("fill", "hsl(" + hsv.h + ", 100%, 50%)");
  /** @type {string} */
  pickerToneCursorBackground.style.backgroundColor = "hsl(" + hsv.h + ", 100%, 50%)";
  /** @type {string} */
  pickerColorCursor.style.backgroundColor = "rgb(" + Math.round(rgb.r) + ", " + Math.round(rgb.g) + ", " + Math.round(rgb.b) + ")";
  /** @type {string} */
  var mode = "RGB";
  if (hsv.a < 100) {
    /** @type {string} */
    mode = "RGBA";
  } else {
    /** @type {string} */
    mode = "RGB";
  }
  /** @type {string} */
  labelRGBa.innerHTML = mode;
}
/**
 * @return {undefined}
 */
function setCursorOnPickers() {
  var b;
  var r;
  var h;
  var g;
  /** @type {number} */
  h = pickerColor.offsetWidth - 1;
  /** @type {number} */
  g = pickerColor.offsetHeight - 1;
  /** @type {number} */
  b = hsv.s / 100 * h;
  /** @type {number} */
  r = (100 - hsv.v) / 100 * g;
  /** @type {string} */
  pickerColorCursor.style.left = (b - (pickerColorCursor.offsetWidth - 1) / 2) * (h - coefPicker) / h + (h - (h - coefPicker)) / 2 + "px";
  /** @type {string} */
  pickerColorCursor.style.top = (r - (pickerColorCursor.offsetHeight - 1) / 2) * (g - coefPicker) / g + (g - (g - coefPicker)) / 2 + "px";
  /** @type {number} */
  g = pickerTone.offsetHeight - 1;
  if (hsv.h == 0) {
    /** @type {number} */
    r = 0;
  } else {
    /** @type {number} */
    r = (360 - hsv.h) / 360 * g;
  }
  /** @type {string} */
  pickerToneCursor.style.top = (r - (pickerToneCursor.offsetHeight - 1) / 2) * (g - coefScroll) / g + (g - (g - coefScroll)) / 2 + "px";
  /** @type {number} */
  h = pickerAlpha.offsetWidth - 1;
  /** @type {number} */
  b = hsv.a / 100 * h;
  /** @type {string} */
  pickerAlphaCursor.style.left = (b - (pickerAlphaCursor.offsetWidth - 1) / 2) * (h - coefScroll + 1) / h + (h - (h - coefScroll + 1)) / 2 + "px";
}
/**
 * @param {!Object} item
 * @return {?}
 */
function RGBtoHEX(item) {
  var rgb = {
    r : 0,
    g : 0,
    b : 0
  };
  /** @type {number} */
  rgb.r = Math.round(item.r);
  /** @type {number} */
  rgb.g = Math.round(item.g);
  /** @type {number} */
  rgb.b = Math.round(item.b);
  if (rgb.r == 0) {
    /** @type {string} */
    rgb.r = "00";
  } else {
    /** @type {string} */
    rgb.r = rgb.r.toString(16);
  }
  if (rgb.g == 0) {
    /** @type {string} */
    rgb.g = "00";
  } else {
    /** @type {string} */
    rgb.g = rgb.g.toString(16);
  }
  if (rgb.b == 0) {
    /** @type {string} */
    rgb.b = "00";
  } else {
    /** @type {string} */
    rgb.b = rgb.b.toString(16);
  }
  if (rgb.r.length < 2) {
    /** @type {string} */
    rgb.r = "0" + rgb.r;
  }
  if (rgb.g.length < 2) {
    /** @type {string} */
    rgb.g = "0" + rgb.g;
  }
  if (rgb.b.length < 2) {
    /** @type {string} */
    rgb.b = "0" + rgb.b;
  }
  if (rgb.r[0] == rgb.r[1] && rgb.g[0] == rgb.g[1] && rgb.b[0] == rgb.b[1]) {
    rgb.r = rgb.r[0];
    rgb.g = rgb.g[0];
    rgb.b = rgb.b[0];
  }
  return rgb.r + rgb.g + rgb.b;
}
/**
 * @param {string} hex
 * @return {?}
 */
function HEXtoRGB(hex) {
  if (hex.length == 3) {
    return {
      r : parseInt(hex[0] + hex[0], 16),
      g : parseInt(hex[1] + hex[1], 16),
      b : parseInt(hex[2] + hex[2], 16)
    };
  } else {
    if (hex.length == 6) {
      return {
        r : parseInt(hex[0] + hex[1], 16),
        g : parseInt(hex[2] + hex[3], 16),
        b : parseInt(hex[4] + hex[5], 16)
      };
    }
  }
  return null;
}
/**
 * @param {!Object} rgb
 * @return {?}
 */
function RGBtoHSV(rgb) {
  /** @type {number} */
  r = rgb.r / 255;
  /** @type {number} */
  g = rgb.g / 255;
  /** @type {number} */
  b = rgb.b / 255;
  /** @type {number} */
  var maxColor = Math.max(r, g, b);
  /** @type {number} */
  var minColor = Math.min(r, g, b);
  if (maxColor == minColor) {
    /** @type {number} */
    hsv.h = 0;
  } else {
    if (maxColor == r && g >= b) {
      /** @type {number} */
      hsv.h = 60 * ((g - b) / (maxColor - minColor));
    } else {
      if (maxColor == r && g < b) {
        /** @type {number} */
        hsv.h = 60 * ((g - b) / (maxColor - minColor)) + 360;
      } else {
        if (maxColor == g) {
          /** @type {number} */
          hsv.h = 60 * ((b - r) / (maxColor - minColor)) + 120;
        } else {
          if (maxColor == b) {
            /** @type {number} */
            hsv.h = 60 * ((r - g) / (maxColor - minColor)) + 240;
          }
        }
      }
    }
  }
  if (maxColor == 0) {
    /** @type {number} */
    hsv.s = 0;
  } else {
    /** @type {number} */
    hsv.s = (1 - minColor / maxColor) * 100;
  }
  /** @type {number} */
  hsv.v = maxColor * 100;
  return hsv;
}
/**
 * @param {!Object} hsv
 * @return {?}
 */
function HSVtoRGB(hsv) {
  var colour = {
    r : 0,
    g : 0,
    b : 0
  };
  /** @type {number} */
  var candidatesWidth = Math.round(hsv.h);
  /** @type {number} */
  var m1 = Math.round(hsv.s);
  /** @type {number} */
  var h = Math.round(hsv.v);
  /** @type {number} */
  var k = Math.floor(candidatesWidth / 60) % 6;
  /** @type {number} */
  var a = (100 - m1) * h / 100;
  /** @type {number} */
  var c = (h - a) * (candidatesWidth % 60 / 60);
  /** @type {number} */
  var value = a + c;
  /** @type {number} */
  var t = h - c;
  switch(k) {
    case 0:
      colour = {
        r : h,
        g : value,
        b : a
      };
      break;
    case 1:
      colour = {
        r : t,
        g : h,
        b : a
      };
      break;
    case 2:
      colour = {
        r : a,
        g : h,
        b : value
      };
      break;
    case 3:
      colour = {
        r : a,
        g : t,
        b : h
      };
      break;
    case 4:
      colour = {
        r : value,
        g : a,
        b : h
      };
      break;
    case 5:
      colour = {
        r : h,
        g : a,
        b : t
      };
      break;
  }
  colour.r *= 2.55;
  colour.g *= 2.55;
  colour.b *= 2.55;
  return colour;
}
/**
 * @return {undefined}
 */
function setAllowSelect() {
  if (!allowSelect) {
    /** @type {boolean} */
    allowSelect = true;
    selectInput.select();
    setUriParams();
  }
  cursorHide(false);
}
pickerColor.addEventListener("mousedown", function(advform) {
  pickerColorDown(advform);
});
pickerColorCursor.addEventListener("mousedown", function(advform) {
  pickerColorDown(advform);
});
/**
 * @param {!Event} advform
 * @return {undefined}
 */
function pickerColorDown(advform) {
  /** @type {boolean} */
  pushColor = true;
  /** @type {boolean} */
  allowSelect = false;
  chooseColor(advform);
}
document.addEventListener("mousemove", function(advform) {
  if (pushColor) {
    chooseColor(advform);
  }
});
document.addEventListener("mouseup", function() {
  /** @type {boolean} */
  pushColor = false;
  setAllowSelect();
});
/**
 * @param {!Event} f
 * @return {undefined}
 */
function chooseColor(f) {
  /** @type {boolean} */
  var e = false;
  /** @type {number} */
  var r = f.pageX - pickerColorPosition.left;
  /** @type {number} */
  var t = f.pageY - pickerColorPosition.top;
  /** @type {number} */
  var b = pickerColor.offsetWidth - 1;
  /** @type {number} */
  var d = pickerColor.offsetHeight - 1;
  if (r < 0) {
    /** @type {number} */
    r = 0;
    /** @type {boolean} */
    e = true;
  }
  if (t < 0) {
    /** @type {number} */
    t = 0;
    /** @type {boolean} */
    e = true;
  }
  if (r > b) {
    /** @type {number} */
    r = b;
    /** @type {boolean} */
    e = true;
  }
  if (t > d) {
    /** @type {number} */
    t = d;
    /** @type {boolean} */
    e = true;
  }
  cursorHide(!e);
  /** @type {number} */
  hsv.s = r / b * 100;
  /** @type {number} */
  hsv.v = 100 - t / d * 100;
  if (hsv.v == 0) {
    /** @type {number} */
    hsv.s = 0;
  }
  /** @type {string} */
  pickerColorCursor.style.left = (r - (pickerColorCursor.offsetWidth - 1) / 2) * (b - coefPicker) / b + (b - (b - coefPicker)) / 2 + "px";
  /** @type {string} */
  pickerColorCursor.style.top = (t - (pickerColorCursor.offsetHeight - 1) / 2) * (d - coefPicker) / d + (d - (d - coefPicker)) / 2 + "px";
  outColor();
}
pickerTone.addEventListener("mousedown", function(advform) {
  pickerToneDown(advform);
});
pickerToneCursor.addEventListener("mousedown", function(advform) {
  pickerToneDown(advform);
});
/**
 * @param {!Event} f
 * @return {undefined}
 */
function pickerToneDown(f) {
  /** @type {boolean} */
  pushTone = true;
  /** @type {boolean} */
  allowSelect = false;
  chooseTone(f);
}
document.addEventListener("mousemove", function(webcal) {
  if (pushTone) {
    chooseTone(webcal);
  }
});
document.addEventListener("mouseup", function() {
  /** @type {boolean} */
  pushTone = false;
  setAllowSelect();
});
/**
 * @param {!Event} event
 * @return {undefined}
 */
function chooseTone(event) {
  /** @type {boolean} */
  var e = false;
  /** @type {number} */
  var lastAvarage = event.clientX - pickerTonePosition.left;
  /** @type {number} */
  var r = event.clientY - pickerTonePosition.top;
  /** @type {number} */
  var avarage = pickerTone.offsetWidth - 1;
  /** @type {number} */
  var b = pickerTone.offsetHeight - 1;
  if (lastAvarage < 0) {
    /** @type {number} */
    lastAvarage = 0;
    /** @type {boolean} */
    e = true;
  }
  if (r < 0) {
    /** @type {number} */
    r = 0;
    /** @type {boolean} */
    e = true;
  }
  if (lastAvarage > avarage) {
    /** @type {number} */
    lastAvarage = avarage;
    /** @type {boolean} */
    e = true;
  }
  if (r > b) {
    /** @type {number} */
    r = b;
    /** @type {boolean} */
    e = true;
  }
  cursorHide(!e);
  /** @type {number} */
  hsv.h = 360 - r / b * 360;
  if (hsv.h == 360) {
    /** @type {number} */
    hsv.h = 0;
  }
  /** @type {string} */
  pickerToneCursor.style.top = (r - (pickerToneCursor.offsetHeight - 1) / 2) * (b - coefScroll) / b + (b - (b - coefScroll)) / 2 + "px";
  outColor();
}
pickerAlpha.addEventListener("mousedown", function(advform) {
  pickerAlphaDown(advform);
});
pickerAlphaCursor.addEventListener("mousedown", function(advform) {
  pickerAlphaDown(advform);
});
/**
 * @param {!Event} f
 * @return {undefined}
 */
function pickerAlphaDown(f) {
  /** @type {boolean} */
  pushAlpha = true;
  /** @type {boolean} */
  allowSelect = false;
  chooseAlpha(f);
}
document.addEventListener("mousemove", function(webcal) {
  if (pushAlpha) {
    chooseAlpha(webcal);
  }
});
document.addEventListener("mouseup", function() {
  /** @type {boolean} */
  pushAlpha = false;
  setAllowSelect();
});
/**
 * @param {!Event} event
 * @return {undefined}
 */
function chooseAlpha(event) {
  /** @type {boolean} */
  var e = false;
  /** @type {number} */
  var frame = event.clientX - pickerAlphaPosition.left;
  /** @type {number} */
  var lastAvarage = event.clientY - pickerAlphaPosition.top;
  /** @type {number} */
  var max = pickerAlpha.offsetWidth - 1;
  /** @type {number} */
  var avarage = pickerAlpha.offsetHeight - 1;
  if (frame < 0) {
    /** @type {number} */
    frame = 0;
    /** @type {boolean} */
    e = true;
  }
  if (lastAvarage < 0) {
    /** @type {number} */
    lastAvarage = 0;
    /** @type {boolean} */
    e = true;
  }
  if (frame > max) {
    /** @type {number} */
    frame = max;
    /** @type {boolean} */
    e = true;
  }
  if (lastAvarage > avarage) {
    /** @type {number} */
    lastAvarage = avarage;
    /** @type {boolean} */
    e = true;
  }
  cursorHide(!e);
  /** @type {number} */
  hsv.a = frame / max * 100;
  /** @type {string} */
  pickerAlphaCursor.style.left = (frame - (pickerAlphaCursor.offsetWidth - 1) / 2) * (max - coefScroll + 1) / max + (max - (max - coefScroll + 1)) / 2 + "px";
  outColor();
}
/**
 * @param {!Object} elem
 * @return {undefined}
 */
function controlSelection(elem) {
  /**
   * @param {!Object} elem
   * @param {string} type
   * @param {!Function} fn
   * @return {undefined}
   */
  function addEvent(elem, type, fn) {
    if (elem.attachEvent) {
      elem.attachEvent("on" + type, fn);
    } else {
      if (elem.addEventListener) {
        elem.addEventListener(type, fn, false);
      }
    }
  }
  /**
   * @return {undefined}
   */
  function clearBrowserSelection() {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else {
      if (document.selection && document.selection.clear) {
        document.selection.clear();
      }
    }
  }
  /** @type {boolean} */
  var d = false;
  addEvent(elem, "mousemove", function() {
    if (d && !allowSelect) {
      clearBrowserSelection();
    }
  });
  addEvent(elem, "mousedown", function(event) {
    event = event || window.event;
    var _targetObj = event.target || event.srcElement;
    /** @type {boolean} */
    d = !_targetObj.tagName.match(/INPUT|TEXTAREA/i);
  });
}
/**
 * @return {undefined}
 */
function getUriParams() {
  /** @type {!Array<string>} */
  var b = document.location.pathname.split("/");
  /** @type {string} */
  var type = b[b.length - 2];
  /** @type {string} */
  var e = b[b.length - 1];
  if (type == "hsv" || type == "hsva") {
    /** @type {!Array<string>} */
    e = e.replace(/[^0-9.,]/g, "").split(",");
    if (e.length >= 3) {
      hsv = {
        h : e[0] * 1,
        s : e[1] * 1,
        v : e[2] * 1,
        a : 100
      };
      if (e.length > 3) {
        /** @type {number} */
        var a = e[3] * 1;
        if (a > 1) {
          if (a > 100) {
            /** @type {number} */
            a = 100;
          }
          /** @type {number} */
          hsv.a = a;
        } else {
          if (a < 0) {
            /** @type {number} */
            a = 0;
          }
          /** @type {number} */
          hsv.a = a * 100;
        }
      }
    }
    selectInput = hsvInput;
  }
  if (type == "rgb" || type == "rgba") {
    /** @type {!Array<string>} */
    e = e.replace(/[^0-9.,]/g, "").split(",");
    if (e.length >= 3) {
      var baseColor = {
        r : e[0] * 1,
        g : e[1] * 1,
        b : e[2] * 1
      };
      if (e.length > 3) {
        /** @type {number} */
        a = e[3] * 1;
        if (a > 1) {
          if (a > 100) {
            /** @type {number} */
            a = 100;
          }
          /** @type {number} */
          hsv.a = a;
        } else {
          if (a < 0) {
            /** @type {number} */
            a = 0;
          }
          /** @type {number} */
          hsv.a = a * 100;
        }
      }
      RGBtoHSV(baseColor);
    }
    selectInput = rgbInput;
  }
  if (type == "hex" || type == "hexa") {
    if (e.length >= 3) {
      /** @type {!Array<string>} */
      e = e.replace(/[^0-9,.a-fA-F]/g, "").split(",");
      /** @type {string} */
      var UseBlood = e[0].substr(0, 6);
      if (e.length > 1) {
        /** @type {number} */
        a = e[1] * 1;
        if (a > 1) {
          if (a > 100) {
            /** @type {number} */
            a = 100;
          }
          /** @type {number} */
          hsv.a = a;
        } else {
          if (a < 0) {
            /** @type {number} */
            a = 0;
          }
          /** @type {number} */
          hsv.a = a * 100;
        }
      }
      baseColor = HEXtoRGB(UseBlood);
      RGBtoHSV(baseColor);
      selectInput = hexInput;
    }
  }
  setCursorOnPickers();
  outColor();
}
/**
 * @return {undefined}
 */
function setUriParams() {
  var rgb = HSVtoRGB(hsv);
  var c = RGBtoHEX(rgb);
  /** @type {string} */
  var url = "";
  if (selectInput == hexInput) {
    /** @type {string} */
    url = "hex/" + c;
    if (hsv.a < 100) {
      /** @type {string} */
      c = c + ("," + Math.round(hsv.a));
      /** @type {string} */
      url = "hexa/" + c;
    }
  }
  if (selectInput == rgbInput || selectInput == rgbPercentInput) {
    rgb = HSVtoRGB(hsv);
    /** @type {string} */
    var c = Math.round(rgb.r) + "," + Math.round(rgb.g) + "," + Math.round(rgb.b);
    /** @type {string} */
    url = "rgb/" + c;
    if (hsv.a < 100) {
      /** @type {string} */
      c = c + ("," + Math.round(hsv.a));
      /** @type {string} */
      url = "rgba/" + c;
    }
  }
  if (selectInput == hsvInput) {
    /** @type {string} */
    var urlExtra = Math.round(hsv.h) + "," + Math.round(hsv.s) + "," + Math.round(hsv.v);
    /** @type {string} */
    url = "hsv/" + urlExtra;
    if (hsv.a < 100) {
      /** @type {string} */
      urlExtra = urlExtra + ("," + Math.round(hsv.a));
      /** @type {string} */
      url = "hsva/" + urlExtra;
    }
  }
  history.pushState(null, null, uri + url);
}
/**
 * @param {boolean} addedRenderer
 * @return {undefined}
 */
function cursorHide(addedRenderer) {
  if (addedRenderer) {
    if (!palette.classList.contains("hide-cursor")) {
      palette.classList.add("hide-cursor");
    }
  } else {
    palette.classList.remove("hide-cursor");
  }
}
;
