// Logical model describing
window.palette = {
  selectedTone: 'red',
  currentColor: {
    percent: {
      colorCursor: {
        x: 0,
        y: 0
      },
      toneCursor: {
        x: 0
      },
      alphaCursor: {
        x: 100
      }
    },
    hsv: {
      h: 0,
      s: 0,
      v: 100
    },
    rgb: {
      r: 255,
      g: 255,
      b: 255
    },
    rgbPercentage: {
      r: 1,
      g: 1,
      b: 1
    },
    hex: 'fff',
    cmyk: {
      c: 0,
      m: 0,
      y: 0,
      k: 0
    },
    alpha: 1
  },

  setColorFromPercent: function (percent) {
    percent = this.validatePercent(percent);
    if (percent) {

      if (percent.hasOwnProperty('colorCursor')) {
        this.currentColor.percent.colorCursor = percent.colorCursor;
      }
      if (percent.hasOwnProperty('toneCursor')) {
        this.currentColor.percent.toneCursor = percent.toneCursor;
      }

      this.currentColor.hsv = this.convertPercentToHsv(percent);
      this.currentColor.rgb = this.convertHsvToRgb(this.currentColor.hsv);
      this.currentColor.rgbPercentage = this.convertRgbToRgbPercentage(this.currentColor.rgb);
      this.currentColor.hex = this.convertRgbToHex(this.currentColor.rgb);
      this.currentColor.cmyk = this.convertRgbToCmyk(this.currentColor.rgb);
    }
  },

  setColorFromHsv: function (hsv) {
    hsv = this.validateHsv(hsv);
    if (hsv) {
      this.currentColor.hsv = hsv;
      this.currentColor.percent = this.convertHsvToPercent(hsv);
      this.currentColor.rgb = this.convertHsvToRgb(this.currentColor.hsv);
      this.currentColor.rgbPercentage = this.convertRgbToRgbPercentage(this.currentColor.rgb);
      this.currentColor.hex = this.convertRgbToHex(this.currentColor.rgb);
      this.currentColor.cmyk = this.convertRgbToCmyk(this.currentColor.rgb);
    }
  },

  setColorFromRgb: function (rgb) {
    rgb = this.validateRgb(rgb);

    if (rgb) {
      this.currentColor.hsv = this.convertRgbToHsv(rgb);
      this.currentColor.percent = this.convertHsvToPercent(this.currentColor.hsv);
      this.currentColor.rgb = rgb;
      this.currentColor.rgbPercentage = this.convertRgbToRgbPercentage(this.currentColor.rgb);
      this.currentColor.hex = this.convertRgbToHex(this.currentColor.rgb);
      this.currentColor.cmyk = this.convertRgbToCmyk(this.currentColor.rgb);
    }
  },

  setColorFromRgbPercentage: function (rgbPercentage) {
    rgbPercentage = this.validateRgbPercentage(rgbPercentage);

    if (rgbPercentage) {
      this.currentColor.rgbPercentage = rgbPercentage;
      this.currentColor.rgb = this.convertRgbPercentageToRgb(rgbPercentage);
      this.currentColor.hex = this.convertRgbToHex(this.currentColor.rgb);
      this.currentColor.hsv = this.convertRgbToHsv(this.currentColor.rgb);
      this.currentColor.percent = this.convertHsvToPercent(this.currentColor.hsv);
      this.currentColor.cmyk = this.convertRgbToCmyk(this.currentColor.rgb);
    }
  },

  setColorFromHex: function (hex) {
    if (this.validateHex(hex)) {
      this.currentColor.hex = hex;
      this.currentColor.rgb = this.convertHexToRgb(hex);
      this.currentColor.alpha = this.getAlphaFromHex(hex);
      this.currentColor.rgbPercentage = this.convertRgbToRgbPercentage(this.currentColor.rgb);
      this.currentColor.hsv = this.convertRgbToHsv(this.currentColor.rgb);
      this.currentColor.percent = this.convertHsvToPercent(this.currentColor.hsv);
      this.currentColor.cmyk = this.convertRgbToCmyk(this.currentColor.rgb);
    }
  },

  setColorFromCmyk: function (cmyk) {
    cmyk = this.validateCmyk(cmyk);
    if (cmyk) {
      this.currentColor.cmyk = cmyk;
      this.currentColor.rgb = this.convertCmykToRgb(cmyk);
      this.currentColor.rgbPercentage = this.convertRgbToRgbPercentage(this.currentColor.rgb);
      this.currentColor.hex = this.convertRgbToHex(this.currentColor.rgb);
      this.currentColor.hsv = this.convertRgbToHsv(this.currentColor.rgb);
      this.currentColor.percent = this.convertHsvToPercent(this.currentColor.hsv);
    }
  },

  setAlpha: function (alpha) {
    alpha = this.validateAlpha(alpha);
    if (alpha !== false) {
      this.currentColor.alpha = alpha / 100;
      this.currentColor.percent.alphaCursor.x = alpha;
      this.currentColor.hex = this.convertRgbToHex(this.currentColor.rgb);
    }
  },

  // Validation functions below
  validatePercent: function (percent) {
    if (percent.hasOwnProperty('colorCursor')) {
      if (percent.colorCursor.hasOwnProperty('x') && percent.colorCursor.hasOwnProperty('y')) {
        if ((!this.isInt(percent.colorCursor.x) && !this.isFloat(percent.colorCursor.x)) ||
            (!this.isInt(percent.colorCursor.y) && !this.isFloat(percent.colorCursor.y))) {
          return false;
        }

        if (percent.colorCursor.x < 0) {
          percent.colorCursor.x = 0;
        }
        if (percent.colorCursor.y < 0) {
          percent.colorCursor.y = 0;
        }


        if (percent.colorCursor.x > 100) {
          percent.colorCursor.x = 100;
        }
        if (percent.colorCursor.y > 100) {
          percent.colorCursor.y = 100;
        }
      }
    } else {
      if (!percent.hasOwnProperty('toneCursor')) {
        return false;
      }
    }

    if (percent.hasOwnProperty('toneCursor')) {
      if (percent.toneCursor.hasOwnProperty('x')) {
        if (!this.isInt(percent.toneCursor.x) && !this.isFloat(percent.toneCursor.x)) {
          return false;
        }

        percent.toneCursor.x = parseInt(percent.toneCursor.x);
        if (isNaN(percent.toneCursor.x)) {
          return false;
        }

        if (percent.toneCursor.x < 0) {
          percent.toneCursor.x = 0;
        }
        if (percent.toneCursor.x > 100) {
          percent.toneCursor.x = 100;
        }
      }
    }

    return percent;
  },

  validateHsv: function (hsv) {
    if (hsv.hasOwnProperty('h') && hsv.hasOwnProperty('s') && hsv.hasOwnProperty('v')) {
      hsv.h = parseInt(hsv.h);
      hsv.s = parseInt(hsv.s);
      hsv.v = parseInt(hsv.v);
      if ((isNaN(hsv.h)) || (isNaN(hsv.s)) || (isNaN(hsv.v))) {
        return false;
      }

      if (hsv.h < 0) {
        hsv.h = 0;
      }
      if (hsv.s < 0) {
        hsv.s = 0;
      }
      if (hsv.v <= 0) {
        hsv.v = 0;
        hsv.s = 0;
      }

      if (hsv.h >= 360) {
        hsv.h = 0;
      }
      if (hsv.s > 100) {
        hsv.g = 100;
      }
      if (hsv.v > 100) {
        hsv.v = 100;
      }

      return hsv;
    }
    return false;
  },

  validateRgb: function (rgb) {
    if (rgb.hasOwnProperty('r') && rgb.hasOwnProperty('g') && rgb.hasOwnProperty('b')) {
      rgb.r = parseInt(rgb.r);
      rgb.g = parseInt(rgb.g);
      rgb.b = parseInt(rgb.b);
      if ((isNaN(rgb.r)) || (isNaN(rgb.g)) || (isNaN(rgb.b))) {
        return false;
      }

      if (rgb.r < 0) {
        rgb.r = 0;
      }
      if (rgb.g < 0) {
        rgb.g = 0;
      }
      if (rgb.b < 0) {
        rgb.b = 0;
      }

      if (rgb.r > 255) {
        rgb.r = 255;
      }
      if (rgb.g > 255) {
        rgb.g = 255;
      }
      if (rgb.b > 255) {
        rgb.b = 255;
      }

      return rgb;
    }
    return false;
  },

  validateRgbPercentage: function (rgbPercentage) {
    if (rgbPercentage.hasOwnProperty('r') && rgbPercentage.hasOwnProperty('g')
        && rgbPercentage.hasOwnProperty('b')) {
      rgbPercentage.r = parseFloat(rgbPercentage.r);
      rgbPercentage.g = parseFloat(rgbPercentage.g);
      rgbPercentage.b = parseFloat(rgbPercentage.b);
      if ((isNaN(rgbPercentage.r)) || (isNaN(rgbPercentage.g)) || (isNaN(rgbPercentage.b))) {
        return false;
      }

      if (rgbPercentage.r < 0) {
        rgbPercentage.r = 0;
      }
      if (rgbPercentage.g < 0) {
        rgbPercentage.g = 0;
      }
      if (rgbPercentage.b < 0) {
        rgbPercentage.b = 0;
      }

      if (rgbPercentage.r > 1) {
        rgbPercentage.r = 1;
      }
      if (rgbPercentage.g > 1) {
        rgbPercentage.g = 1;
      }
      if (rgbPercentage.b > 1) {
        rgbPercentage.b = 1;
      }

      return rgbPercentage;
    }
    return false;
  },

  validateHex: function (hex) {
    hex = hex.replace(/[^0-9a-fA-F]/g, '').substr(0, 8);
    if (hex.length < 3) {
      return false;
    }
    return hex;
  },

  validateCmyk: function (cmyk) {
    if (cmyk.hasOwnProperty('c') && cmyk.hasOwnProperty('m')
        && cmyk.hasOwnProperty('y') && cmyk.hasOwnProperty('k')) {
      if ((!this.isInt(cmyk.c) && !this.isFloat(cmyk.c))
          || (!this.isInt(cmyk.m) && !this.isFloat(cmyk.m))
          || (!this.isInt(cmyk.y) && !this.isFloat(cmyk.y))
          || (!this.isInt(cmyk.k) && !this.isFloat(cmyk.k))) {
        return false;
      }

      if (cmyk.c < 0) {
        cmyk.c = 0;
      }
      if (cmyk.m < 0) {
        cmyk.m = 0;
      }
      if (cmyk.y < 0) {
        cmyk.y = 0;
      }
      if (cmyk.k < 0) {
        cmyk.k = 0;
      }

      if (cmyk.c > 100) {
        cmyk.c = 100;
      }
      if (cmyk.m > 100) {
        cmyk.m = 100;
      }
      if (cmyk.y > 100) {
        cmyk.y = 100;
      }
      if (cmyk.k > 100) {
        cmyk.k = 100;
      }

      return cmyk;
    }
    return false;
  },

  validateAlpha: function (alpha) {
    if ((this.isInt(alpha) && this.isFloat(alpha))) {
      return false;
    }
    if (alpha < 0) {
      alpha = 0;
    }
    if (alpha > 100) {
      alpha = 100;
    }
    return alpha;
  },

  // Conversion functions below
  convertPercentToHsv: function (percent) {
    if (!percent.hasOwnProperty('toneCursor')) {
      percent.toneCursor = this.currentColor.percent.toneCursor;
    }
    if (!percent.hasOwnProperty('colorCursor')) {
      percent.colorCursor = this.currentColor.percent.colorCursor;
    }
    const hsv = {
      h: (360 - percent.toneCursor.x * 3.60),
      s: percent.colorCursor.x,
      v: (100 - percent.colorCursor.y)
    };

    if (hsv.h === 360) hsv.h = 0;
    if (hsv.v === 0) hsv.s = 0;

    return hsv;
  },

  convertHsvToPercent: function (hsv) {
    let toneCursorX = (360 - hsv.h) / 3.60;
    if (toneCursorX === 100) {
      toneCursorX = 0;
    }

    return {
      toneCursor: {
        x: toneCursorX
      },
      colorCursor: {
        x: hsv.s,
        y: 100 - hsv.v
      },
      alphaCursor: this.currentColor.percent.alphaCursor
    }
  },

  convertRgbToHex: function (rgb) {
    const hex = {
      r: Math.round(rgb.r).toString(16),
      g: Math.round(rgb.g).toString(16),
      b: Math.round(rgb.b).toString(16),
      a: Math.round(this.currentColor.alpha * 255).toString(16)
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
    if (hex.a.length < 2) {
      hex.a = '0' + hex.a;
    }

    if (this.currentColor.alpha == 1) {
      if ((hex.r[0] === hex.r[1]) && (hex.g[0] === hex.g[1]) && (hex.b[0] === hex.b[1])) {
        hex.r = hex.r[0];
        hex.g = hex.g[0];
        hex.b = hex.b[0];
      }
      return hex.r + hex.g + hex.b;
    } else {
      if ((hex.r[0] === hex.r[1]) && (hex.g[0] === hex.g[1]) && (hex.b[0] === hex.b[1]) && (hex.a[0] === hex.a[1])) {
        hex.r = hex.r[0];
        hex.g = hex.g[0];
        hex.b = hex.b[0];
        hex.a = hex.a[0];
      }
      return hex.r + hex.g + hex.b + hex.a;
    }
  },

  convertHexToRgb: function (hex) {
    if (hex.length === 3 || hex.length === 4) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16)
      };
    } else if (hex.length === 6 || hex.length === 8) {
      return {
        r: parseInt(hex[0] + hex[1], 16),
        g: parseInt(hex[2] + hex[3], 16),
        b: parseInt(hex[4] + hex[5], 16)
      };
    }
  },

  getAlphaFromHex: (hex) => {
    if (hex.length === 4) {
      return parseInt(hex[3] + hex[3], 16) / 255;
    }
    if (hex.length === 8) {
      return parseInt(hex[6] + hex[7], 16) / 255;
    }
    return 1;
  },

  convertRgbToRgbPercentage: function (rgb) {
    return {
      r: rgb.r / 255,
      g: rgb.g / 255,
      b: rgb.b / 255
    };
  },

  convertRgbPercentageToRgb: function (rgbPercentage) {
    return {
      r: rgbPercentage.r * 255,
      g: rgbPercentage.g * 255,
      b: rgbPercentage.b * 255
    };
  },

  convertRgbToHsv: function (rgb) {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        hsv = this.currentColor.hsv;

    if (!((r === g) && (g === b))) {
      if (max === min) {
        hsv.h = 0;
      } else if ((max === r) && (g >= b)) {
        hsv.h = 60 * ((g - b) / (max - min));
      } else if ((max === r) && (g < b)) {
        hsv.h = 60 * ((g - b) / (max - min)) + 360;
      } else if (max === g) {
        hsv.h = 60 * ((b - r) / (max - min)) + 120;
      } else if (max === b) {
        hsv.h = 60 * ((r - g) / (max - min)) + 240;
      }
    }

    if (max === 0) {
      hsv.s = 0;
    } else {
      hsv.s = (1 - min / max) * 100;
    }
    hsv.v = max * 100;
    return hsv;
  },

  convertHsvToRgb: function (hsv) {
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
  },

  convertRgbToCmyk: function (rgb) {
    // Removing spaces from input RGB values and convert to int
    let r = parseInt(('' + rgb.r).replace(/\s/g, ''), 10),
        g = parseInt(('' + rgb.g).replace(/\s/g, ''), 10),
        b = parseInt(('' + rgb.b).replace(/\s/g, ''), 10);

    // Black
    if (r === 0 && g === 0 && b === 0) {
      return {c: 0, m: 0, y: 0, k: 100};
    }

    let computedC = 1 - (r / 255),
        computedM = 1 - (g / 255),
        computedY = 1 - (b / 255),
        computedK;

    const minCMY = Math.min(computedC, Math.min(computedM, computedY));

    computedC = (computedC - minCMY) / (1 - minCMY);
    computedM = (computedM - minCMY) / (1 - minCMY);
    computedY = (computedY - minCMY) / (1 - minCMY);
    computedK = minCMY;

    const cmyk = {c: 0, m: 0, y: 0, k: 0};
    cmyk.c = Math.round(computedC * 100);
    cmyk.m = Math.round(computedM * 100);
    cmyk.y = Math.round(computedY * 100);
    cmyk.k = Math.round(computedK * 100);

    return cmyk;
  },

  convertCmykToRgb: function (cmyk) {
    let c = cmyk.c / 100,
        m = cmyk.m / 100,
        y = cmyk.y / 100,
        k = cmyk.k / 100;

    c *= 1 - k;
    m *= 1 - k;
    y *= 1 - k;

    return {
      r: Math.round((1 - c - k) * 255),
      g: Math.round((1 - m - k) * 255),
      b: Math.round((1 - y - k) * 255)
    }
  },

  // Helpful functions
  isInt: function (n) {
    return Number(n) === n && n % 1 === 0;
  },

  isFloat: function (n) {
    return Number(n) === n && n % 1 !== 0;
  }
};


// UI describing

window.touchIntent = false;
const
    wrapper = document.getElementById('wrapper'),

    colorPicker = document.getElementById('colorPicker'),
    tonePicker = document.getElementById('tonePicker'),
    alphaPicker = document.getElementById('alphaPicker'),

    toneColor = document.getElementById('color-picker-tone'),
    transparentGradientColorStart = document.getElementById('transparentGradientColorStart'),
    transparentGradientColorEnd = document.getElementById('transparentGradientColorEnd'),
    rectColor = document.getElementById('rectColor'),

    hexInput = document.getElementById('hexInput'),
    rgbInput = document.getElementById('rgbInput'),
    rgbPercentageInput = document.getElementById('rgbPercentageInput'),
    hsvInput = document.getElementById('hsvInput'),
    cmykInput = document.getElementById('cmykInput'),

    exampleText = document.getElementById('exampleText'),
    linkToMe = document.getElementById('linkToMe'),
    gifLink = document.getElementById('gif-link'),
    jpgLink = document.getElementById('jpg-link'),
    pngLink = document.getElementById('png-link'),
    svgLink = document.getElementById('svg-link'),
    
    colorPickerCursor = document.getElementById('colorPickerCursor');
    tonePickerCursor = document.getElementById('tonePickerCursor'),
    tonePickerCursorVertical = document.getElementById('tonePickerCursorVertical'),
    tonePickerCursorHorizontal = document.getElementById('tonePickerCursorHorizontal'),
    alphaPickerCursor = document.getElementById('alphaPickerCursor'),

    cursors = document.getElementsByClassName('cursor'),
    mobileColorModelSelect = document.getElementById('mobileColorModelSelect'),
    mobileColorModelSelectSubstitute = document.getElementById('mobileColorModelSelectSubstitude'),
    mobileBackground = document.getElementById('mobileBackground');

window.ui = {
  isColorChanged: false,
  selectedInput: hexInput,
  deviceIsSmartPhoneOrTablet: !(navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)),
  exampleText: exampleText.innerHTML,
  url: window.location.pathname,
  portraitOrientation: window.matchMedia('(orientation: portrait)').matches,
  isMobileDevice: window.matchMedia('only screen and (max-device-width: 1125px)').matches,
  darkMode: false,
  getReadableColorOverColor: () => {
    if (((palette.currentColor.hsv.s < 35) && (palette.currentColor.hsv.v > 65))
        || ((palette.currentColor.hsv.v > 80) && (palette.currentColor.hsv.h > 43) && (palette.currentColor.hsv.h < 190))) {
      return '#404040';
    }
    return '#fff';
  },
  getReadableColorOverTone: () => {
    if ((palette.currentColor.hsv.h > 43) && (palette.currentColor.hsv.h < 190)) {
      return '#404040';
    }
    return '#fff';
  },
  isBlackReadableOverTone: () => {
    return (palette.currentColor.hsv.h > 43) && (palette.currentColor.hsv.h < 190);

  },
  getReadableColorOverAlpha: () => {
    if (((palette.currentColor.hsv.s < 50) && (palette.currentColor.hsv.v > 50))
        || (palette.currentColor.percent.alphaCursor.x < 50)
        || ((palette.currentColor.hsv.v > 80) && (palette.currentColor.hsv.h > 43) && (palette.currentColor.hsv.h < 190))) {
      if (ui.darkMode && palette.currentColor.alpha < 0.75) {
        return '#fff';
      }
      return '#404040';
    } else {
      return '#fff';
    }
  },
};

const metaThemeColor = document.querySelector("meta[name=theme-color]");
const transparentPattern = document.getElementById("transparent-shifted-pattern");

transparentPattern.setAttribute('x',  '0');
transparentPattern.setAttribute('y', '0');

window.addEventListener('load', () => {
  updateTransparentPattern();
});

window.addEventListener('resize', () => {
  updateTransparentPattern();
});

function updateTransparentPattern() {
  if (!window.ui.isMobileDevice) {
    return;
  }

  const xOffset = -alphaPicker.offsetLeft % 20;
  const yOffset = -alphaPicker.offsetTop % 20;

  transparentPattern.setAttribute('x', xOffset + 'px');
  transparentPattern.setAttribute('y', yOffset + 'px');
}

function updateUI(from) {
  if (palette.currentColor.hex !== 'fff') {
    palette.isColorChanged = true;
  }

  rectColor.setAttribute('fill', 'rgba(' + Math.round(palette.currentColor.rgb.r) + ', '
      + Math.round(palette.currentColor.rgb.g) + ', '
      + Math.round(palette.currentColor.rgb.b) + ', '
      + palette.currentColor.alpha + ')');

  const toneRgb = palette.convertHsvToRgb({
    h: palette.currentColor.hsv.h,
    s: 100,
    v: 100
  });

  const h = palette.currentColor.hsv.h;
  if (((h > 0) && (h <= 4)) || (h > 340)) {
    palette.selectedTone = 'red';
  }
  if ((h > 4) && (h <= 40)) {
    palette.selectedTone = 'brown';
  }
  if ((h > 4) && (h <= 40)) {
    palette.selectedTone = 'brown';
  }
  if ((h > 40) && (h <= 65)) {
    palette.selectedTone = 'yellow';
  }
  if ((h > 65) && (h <= 170)) {
    palette.selectedTone = 'green';
  }
  if ((h > 170) && (h <= 256)) {
    palette.selectedTone = 'blue';
  }
  if ((h > 256) && (h <= 340)) {
    palette.selectedTone = 'purple';
  }

  let darkerThoneRgb = palette.convertHsvToRgb({
    h: palette.currentColor.hsv.h,
    s: 78,
    v: 80
  });
  if (ui.darkMode) {
      darkerThoneRgb = palette.convertHsvToRgb({
        h: palette.currentColor.hsv.h,
        s: 78,
        v: 60
      });
  }
  linkToMe.style.color = `rgb(${darkerThoneRgb.r}, ${darkerThoneRgb.g}, ${darkerThoneRgb.b})`;
  gifLink.style.backgroundColor = `rgb(${darkerThoneRgb.r}, ${darkerThoneRgb.g}, ${darkerThoneRgb.b})`;
  jpgLink.style.backgroundColor = `rgb(${darkerThoneRgb.r}, ${darkerThoneRgb.g}, ${darkerThoneRgb.b})`;
  pngLink.style.backgroundColor = `rgb(${darkerThoneRgb.r}, ${darkerThoneRgb.g}, ${darkerThoneRgb.b})`;
  svgLink.style.backgroundColor = `rgb(${darkerThoneRgb.r}, ${darkerThoneRgb.g}, ${darkerThoneRgb.b})`;

  toneColor.setAttribute('fill', 'rgb('
      + Math.round(toneRgb.r) + ', '
      + Math.round(toneRgb.g) + ', '
      + Math.round(toneRgb.b) + ')');

  transparentGradientColorStart.setAttribute('stop-color', 'rgb('
      + Math.round(palette.currentColor.rgb.r) + ', '
      + Math.round(palette.currentColor.rgb.g) + ', '
      + Math.round(palette.currentColor.rgb.b) + ')');

  transparentGradientColorEnd.setAttribute('stop-color', 'rgb('
      + Math.round(palette.currentColor.rgb.r) + ', '
      + Math.round(palette.currentColor.rgb.g) + ', '
      + Math.round(palette.currentColor.rgb.b) + ')');

  let rgbInputString = Math.round(palette.currentColor.rgb.r) + ', '
      + Math.round(palette.currentColor.rgb.g) + ', '
      + Math.round(palette.currentColor.rgb.b),

      rgbPercentageInputString = roundNumber(palette.currentColor.rgbPercentage.r, 2) + ', '
          + roundNumber(palette.currentColor.rgbPercentage.g, 2) + ', '
          + roundNumber(palette.currentColor.rgbPercentage.b, 2),

      hsvInputString = Math.round(palette.currentColor.hsv.h) + ', '
          + Math.round(palette.currentColor.hsv.s) + ', '
          + Math.round(palette.currentColor.hsv.v),

      cmykInputString = Math.round(palette.currentColor.cmyk.c) + ', '
          + Math.round(palette.currentColor.cmyk.m) + ', '
          + Math.round(palette.currentColor.cmyk.y) + ', '
          + Math.round(palette.currentColor.cmyk.k);

  if (palette.currentColor.alpha !== 1) {
    const alpha = Math.round(palette.currentColor.alpha * 100) / 100;
    rgbInputString += ', ' + alpha;
    rgbPercentageInputString += ', ' + alpha;
    hsvInputString += ', ' + alpha;
    cmykInputString += ', ' + alpha;
  }

  if (hexInput !== from) { hexInput.value = palette.currentColor.hex; }
  if (rgbInput !== from) { rgbInput.value = rgbInputString; }
  if (rgbPercentageInput !== from) { rgbPercentageInput.value = rgbPercentageInputString; }
  if (hsvInput !== from) { hsvInput.value = hsvInputString; }
  if (cmykInput !== from) { cmykInput.value = cmykInputString; }

  exampleText.style.color = 'rgba(' + Math.round(palette.currentColor.rgb.r) + ', '
      + Math.round(palette.currentColor.rgb.g) + ', '
      + Math.round(palette.currentColor.rgb.b) + ', '
      + palette.currentColor.alpha + ')';

  colorPickerCursor.setAttribute('transform', 'translate('
      + (palette.currentColor.percent.colorCursor.x * colorPicker.clientWidth / 100) + ', '
      + (palette.currentColor.percent.colorCursor.y * colorPicker.clientHeight / 100) + ')');

  colorPickerCursor.setAttribute('stroke', ui.getReadableColorOverColor());
  tonePickerCursorVertical.setAttribute('stroke', ui.getReadableColorOverTone());
  tonePickerCursorHorizontal.setAttribute('stroke', ui.getReadableColorOverTone());
  alphaPickerCursor.setAttribute('stroke', ui.getReadableColorOverAlpha());

  if (ui.isMobileDevice) {
    tonePickerCursor.setAttribute('transform', 'translate('
        + (palette.currentColor.percent.toneCursor.x * tonePicker.clientWidth / 100) + ', 0)');
  } else {
    tonePickerCursor.setAttribute('transform', 'translate(0, '
        + (palette.currentColor.percent.toneCursor.x * tonePicker.clientHeight / 100) + ')');
  }

  alphaPickerCursor.setAttribute('transform', 'translate('
      + (palette.currentColor.percent.alphaCursor.x * alphaPicker.clientWidth / 100 - 4) + ', 0)');

  mobileBackground.style.fill = '#' + palette.currentColor.hex;
  mobileBackground.style.opacity = palette.currentColor.alpha;
}


// Changing color via pickers

function colorChoosingActionStart(x, y) {
  wrapper.classList.add('non-select');
  colorPickerCursor.classList.add('scale-out-anim');
  palette.setColorFromPercent({
    colorCursor: {
      x: (x - colorPicker.offsetLeft) * 100 / colorPicker.clientWidth,
      y: (y - colorPicker.offsetTop) * 100 / colorPicker.clientHeight
    }
  });
  touchIntent = 'color';
  updateUI();
}

colorPicker.addEventListener('mousedown', function(event) {
  colorChoosingActionStart(event.pageX, event.pageY);
});

colorPicker.addEventListener('touchstart', function(event) {
  event.preventDefault();
  if (event.targetTouches.length > 0) {
    const touch = event.targetTouches[0];
    colorChoosingActionStart(touch.pageX, touch.pageY);
  }
}, {passive: false});

function toneChoosingActionStart(coordinate) {
  wrapper.classList.add('non-select');
  tonePickerCursor.classList.add('scale-out-anim');
  let tonePercent = (coordinate.y - tonePicker.offsetTop) * 100 / tonePicker.clientHeight;
  if (ui.isMobileDevice) {
    tonePercent = (coordinate.x - tonePicker.offsetLeft) * 100 / tonePicker.clientWidth;
  }
  palette.setColorFromPercent({
    toneCursor: {
      x: tonePercent
    }
  });
  touchIntent = 'tone';
  updateUI();
}

tonePicker.addEventListener('mousedown', function(event) {
  toneChoosingActionStart({
    x: event.pageX,
    y: event.pageY
  });
});

tonePicker.addEventListener('touchstart', function(event) {
  event.preventDefault();
  if (event.targetTouches.length > 0) {
    const touch = event.targetTouches[0];
    toneChoosingActionStart({
      x: touch.pageX,
      y: touch.pageY
    });
  }
});

function alphaChoosingActionStart(x) {
  wrapper.classList.add('non-select');
  alphaPickerCursor.classList.add('scale-out-anim');
  palette.setAlpha((x - alphaPicker.offsetLeft) * 100 / alphaPicker.clientWidth);
  touchIntent = 'alpha';
  updateUI();
}

alphaPicker.addEventListener('mousedown', function(event) {
  alphaChoosingActionStart(event.pageX);
});

alphaPicker.addEventListener('touchstart', function(event) {
  event.preventDefault();
  if (event.targetTouches.length > 0) {
    const touch = event.targetTouches[0];
    alphaChoosingActionStart(touch.pageX);
  }
});

document.addEventListener('touchmove', function(event) {
  if (event.targetTouches.length > 0) {
    const touch = event.targetTouches[0];

    actionsHandler({
      x: touch.pageX,
      y: touch.pageY
    });
  }
});

document.addEventListener('mousemove', function(event) {
  if (touchIntent) {
    event.preventDefault();
  }

  actionsHandler({
    x: event.pageX,
    y: event.pageY
  });
}, {passive: false});

function actionsHandler(coordinate) {
  switch (touchIntent) {
    case 'color':
      palette.setColorFromPercent({
        colorCursor: {
          x: (coordinate.x - colorPicker.offsetLeft) * 100 / colorPicker.clientWidth,
          y: (coordinate.y - colorPicker.offsetTop) * 100 / colorPicker.clientHeight
        }
      });
      updateUI();
      break;

    case 'tone':
      let tonePercent = (coordinate.y - tonePicker.offsetTop) * 100 / tonePicker.clientHeight;
      if (ui.isMobileDevice) {
        tonePercent = (coordinate.x - tonePicker.offsetLeft) * 100 / tonePicker.clientWidth;
      }

      palette.setColorFromPercent({
        toneCursor: {
          x: tonePercent
        }
      });
      updateUI();
      break;

    case 'alpha':
      palette.setAlpha((coordinate.x - alphaPicker.offsetLeft) * 100 / alphaPicker.clientWidth);
      updateUI();
      break;
  }
}

document.addEventListener('mouseup', function() {
  actionsEnd();
});

document.addEventListener('touchend', function() {
  actionsEnd();
});

function changeUrl() {
  // Changing url
  let alphaUrlString = '';
  // if (palette.currentColor.alpha !== 1) {
  //   alphaUrlString = '&alpha=' + (Math.round(palette.currentColor.alpha * 100) / 100);
  // }
  window.history.pushState(null, '#' + palette.currentColor.hex, ui.url + '?hex=' + palette.currentColor.hex + alphaUrlString);
  localStorage.setItem('currentHue', palette.currentColor.hsv.h);
  localStorage.setItem('currentHex', palette.currentColor.hex);
  localStorage.setItem('currentPercent', JSON.stringify(palette.currentColor.percent));
}

function actionsEnd() {
  if ((touchIntent === 'color') || (touchIntent === 'tone') || (touchIntent === 'alpha')) {
    if (!ui.isMobileDevice) {
      ui.selectedInput.select();
    }
    tonePickerCursor.classList.remove('scale-out-anim');
    colorPickerCursor.classList.remove('scale-out-anim');
    alphaPickerCursor.classList.remove('scale-out-anim');

    // Changing url
    changeUrl();
  }
  touchIntent = false;
  wrapper.classList.remove('non-select');
}


// Changing color via inputs

function splitParamsString(originString) {
  const replacedString = originString.replaceAll(',', ' ').replace(/[^0-9. ]/g, '').replace(/ +/g, ' ').trim();
  const splittedString = replacedString.split(' ').map((param) => param * 1);

  return splittedString;
}

function setColorFromParams(params, input, defaultColor) {
  const [,,,a] = params;

  if (a) {
    palette.setAlpha(a * 100);
  } else {
    palette.setAlpha(100);
  }

  let r, g, b, h, s, v, c, m, y, k;

  switch(input) {
    case rgbInput:
      [r, g, b] = params;
      palette.setColorFromRgb({r, g, b});
      break;
    case rgbPercentageInput:
      [r, g, b] = params;
      palette.setColorFromRgbPercentage({r, g, b});
      break;
    case hsvInput:
      [h, s, v] = params;
      palette.setColorFromHsv({h, s, v});
      break;
    case cmykInput:
      [c, m, y, k] = params;
      palette.setColorFromCmyk({c, m, y, k});
      break;
  }
  

  updateUI(input);
  changeUrl()
}

hexInput.addEventListener('input', function () {
  const hexInputString = hexInput.value.replace(/[^0-9a-fA-F]/g, '').substr(0, 8);
  
  palette.setColorFromHex(hexInputString);
  updateUI(hexInput);

  changeUrl()
});

rgbInput.addEventListener('input', function () {
  const params = splitParamsString(rgbInput.value);

  setColorFromParams(params, rgbInput, palette.currentColor.rgb);
});

rgbPercentageInput.addEventListener('input', function () {
  const params = splitParamsString(rgbPercentageInput.value);

  setColorFromParams(params, rgbPercentageInput, palette.currentColor.rgbPercentage);
});

hsvInput.addEventListener('input', function () {
  const params = splitParamsString(hsvInput.value);

  setColorFromParams(params, hsvInput, palette.currentColor.hsv);
});

cmykInput.addEventListener('input', function () {
  const params = splitParamsString(cmykInput.value);

  setColorFromParams(params, cmykInput, palette.currentColor.cmyk);
});

// Changing selected input
const $rgbWrapper = document.getElementById('rgb-wrapper'),
      $hexWrapper = document.getElementById('hex-wrapper');
rgbInput.addEventListener('blur', () => {
  $rgbWrapper.classList.remove('focus');
});
rgbInput.addEventListener('focus', () => {
  $rgbWrapper.classList.add('focus');
});

rgbPercentageInput.addEventListener('blur', () => {
  $rgbWrapper.classList.remove('focus');
});
rgbPercentageInput.addEventListener('focus', () => {
  $rgbWrapper.classList.add('focus');
});

function toSelectInput(input) {
  ui.selectedInput.classList.remove('selected');
  ui.selectedInput = input;
  input.classList.add('selected');

  localStorage.setItem('selectedInputId', input.id);

  $hexWrapper.classList.remove('selected');
  $rgbWrapper.classList.remove('selected');
  mobileColorModelSelect.classList.remove('percentage');
  switch (input) {
    case hexInput:
      mobileColorModelSelect.value = 'HEX';
      mobileColorModelSelectSubstitute.innerText = 'HEX';
      $hexWrapper.classList.add('selected');
      break;

    case rgbInput:
      mobileColorModelSelect.value = 'RGB';
      mobileColorModelSelectSubstitute.innerText = 'RGB';
      $rgbWrapper.classList.add('selected');

      break;

    case rgbPercentageInput:
      mobileColorModelSelect.value = 'RGB %';
      mobileColorModelSelectSubstitute.innerText = 'RGB %';
      mobileColorModelSelect.classList.add('percentage');
      $rgbWrapper.classList.add('selected');
      break;

    case hsvInput:
      mobileColorModelSelect.value = 'HSV';
      mobileColorModelSelectSubstitute.innerText = 'HSV';
      break;

    case cmykInput:
      mobileColorModelSelect.value = 'CMYK';
      mobileColorModelSelectSubstitute.innerText = 'CMYK';
      break;

    default:
      mobileColorModelSelect.value = ':)';
      mobileColorModelSelectSubstitute.innerText = ':)';
  }
}

if (localStorage.getItem('selectedInputId') !== null) {
  const input = document.getElementById(localStorage.getItem('selectedInputId'));
  if (input !== null) {
    toSelectInput(input);
  }
}

hsvInput.addEventListener('focus', function () { toSelectInput(this); });
hexInput.addEventListener('focus', function () { toSelectInput(this); });
rgbInput.addEventListener('focus', function () { toSelectInput(this); });
rgbPercentageInput.addEventListener('focus', function () { toSelectInput(this); });
cmykInput.addEventListener('focus', function () { toSelectInput(this); });


// Getting color from URL

function recoveryColorFromUrl() {
  const getParams = getJsonFromUrl();
  if (getParams.hasOwnProperty('hex')) {
    palette.setColorFromHex(getParams.hex);

    if (palette.currentColor.hsv.s === 0) {
      palette.currentColor.hsv.h = localStorage.getItem('currentHue');
      palette.setColorFromHsv(palette.currentColor.hsv);
    }

    if (getParams.hex === localStorage.getItem('currentHex')) {
      palette.currentColor.percent = JSON.parse(localStorage.getItem('currentPercent'));
    }
  }

  if (getParams.hasOwnProperty('alpha')) {
    palette.setAlpha(getParams.alpha * 100);
  }

  updateUI();

  return true;
}

if (recoveryColorFromUrl()) {
  Array.prototype.filter.call(cursors, function(cursor){
    cursor.style.opacity = '1';
    cursor.style.transition = 'all 0.1s linear 0s';
  });
}

function getJsonFromUrl() {
  const query = location.search.substr(1);
  let result = [];

  query.split('&').forEach(function(part) {
    const item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });

  return result;
}


// Window resize handler
window.addEventListener('resize', function() {
  ui.portraitOrientation = window.matchMedia('(orientation: portrait)').matches;
  ui.isMobileDevice = window.matchMedia('only screen and (max-device-width: 1125px)').matches;
  updateUI();
});


// Mobile color mobile select handler
mobileColorModelSelect.addEventListener('input', function() {
  switch (this.value) {
    case 'HEX':
      toSelectInput(hexInput);
      break;

    case 'RGB':
      toSelectInput(rgbInput);
      break;

    case 'RGB %':
      toSelectInput(rgbPercentageInput);
      break;

    case 'HSV':
      toSelectInput(hsvInput);
      break;

    case 'CMYK':
      toSelectInput(cmykInput);
      break;

    default:
      toSelectInput(hexInput);
  }
});

const commentsWidget = document.getElementById('comments-widget');

function getCommentsWidget(theme = 'light') {
  commentsWidget.innerHTML = '';
  const s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('async', 'true');
  s.src = 'https://telegram.org/js/telegram-widget.js?21';
  s.setAttribute('data-telegram-discussion', 'csscolor/5');
  s.setAttribute('data-comments-limit', '10');
  s.setAttribute('data-colorful', '1')

  if (theme === 'light') {
    s.setAttribute('data-color', '00b3ff');
  } else {
    s.setAttribute('data-color', '454545');
    s.setAttribute('data-dark', '1');
  }

  commentsWidget.appendChild(s);
}

turnNightMode = () => {
  document.body.style.transitionDuration = "0s";
  nightModeSwitcher.classList.add('night');
  document.body.classList.add('night');
  document.body.style.transitionDuration = "0.1s";
  getCommentsWidget('night');
  ui.darkMode = true;
  updateUI();
};

turnLightMode = () => {
  document.body.style.transitionDuration = "0s";
  nightModeSwitcher.classList.remove('night');
  document.body.classList.remove('night');
  document.body.style.transitionDuration = "0.1s";
  getCommentsWidget();
  ui.darkMode = false;
  updateUI();
};

const nightModeSwitcher = document.getElementById('themeSwitcher');
function nightModeSwitch() {
  if (nightModeSwitcher.classList.contains('night')) {
    turnLightMode();
    localStorage.setItem('night-mode', 'off');
  } else {
    turnNightMode();
    localStorage.setItem('night-mode', 'on');
  }
}
nightModeSwitcher.addEventListener('click', nightModeSwitch);

getDefaultTheme = () => {
  const userTheme = localStorage.getItem('journalbook_theme');

  if (userTheme !== null) {
    return userTheme;
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('Dark theme enabled.');
    return 'dark';
  }
  console.log('Bright theme enabled.');

  return '';
};

autoThemeApply = () => {
  const userDesktopTheme = getDefaultTheme();
  if (userDesktopTheme !== localStorage.getItem('user-desktop-theme')) {
    localStorage.setItem('user-desktop-theme', userDesktopTheme);

    if (userDesktopTheme === 'dark') {
      localStorage.setItem('night-mode', 'on');
      turnNightMode();
    } else {
      localStorage.setItem('night-mode', 'off');
      turnLightMode();
    }
  } else if (localStorage.getItem('night-mode') === 'on') {
    localStorage.setItem('night-mode', 'on');
    turnNightMode();
  } else {
    if (userDesktopTheme === 'dark') {
      turnNightMode();
    } else {
      turnLightMode();
    }
  }
};

autoThemeApply();
window.onfocus = autoThemeApply;
window.dataLayer = [];

// Inputs interact tracking
hexInput.addEventListener('copy', () => {
  dataLayer.push({'event':'copy-color','color-model':'hex'});
});
rgbInput.addEventListener('copy', () => {
  dataLayer.push({'event':'copy-color','color-model':'rgb'});
});
rgbPercentageInput.addEventListener('copy', () => {
  dataLayer.push({'event':'copy-color','color-model':'rgb%'});
});
hsvInput.addEventListener('copy', () => {
  dataLayer.push({'event':'copy-color','color-model':'hsv'});
});
cmykInput.addEventListener('copy', () => {
  dataLayer.push({'event':'copy-color','color-model':'cmyk'});
});

hexInput.addEventListener('paste', () => {
  dataLayer.push({'event':'paste-color','color-model':'hex'});
});
rgbInput.addEventListener('paste', () => {
  dataLayer.push({'event':'paste-color','color-model':'rgb'});
});
rgbPercentageInput.addEventListener('paste', () => {
  dataLayer.push({'event':'paste-color','color-model':'rgb%'});
});
hsvInput.addEventListener('paste', () => {
  dataLayer.push({'event':'paste-color','color-model':'hsv'});
});
cmykInput.addEventListener('paste', () => {
  dataLayer.push({'event':'paste-color','color-model':'cmyk'});
});

function roundNumber(num, scale) {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
  } else {
    const arr = ("" + num).split("e");
    let sig = "";

    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}
