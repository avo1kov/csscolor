

// Logical model describing
const palette = {
  selectedThone: 'red',
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
      r: 100,
      g: 100,
      b: 100
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
      rgbPercentage.r = parseInt(rgbPercentage.r);
      rgbPercentage.g = parseInt(rgbPercentage.g);
      rgbPercentage.b = parseInt(rgbPercentage.b);
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

      if (rgbPercentage.r > 100) {
        rgbPercentage.r = 100;
      }
      if (rgbPercentage.g > 100) {
        rgbPercentage.g = 100;
      }
      if (rgbPercentage.b > 100) {
        rgbPercentage.b = 100;
      }

      return rgbPercentage;
    }
    return false;
  },

  validateHex: function (hex) {
    hex = hex.replace(/[^0-9a-fA-F]/g, '').substr(0, 6);
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
  },

  convertHexToRgb: function (hex) {
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16)
      };
    } else if (hex.length === 6) {
      return {
        r: parseInt(hex[0] + hex[1], 16),
        g: parseInt(hex[2] + hex[3], 16),
        b: parseInt(hex[4] + hex[5], 16)
      };
    }
  },

  convertRgbToRgbPercentage: function (rgb) {
    return {
      r: rgb.r * 100 / 255,
      g: rgb.g * 100 / 255,
      b: rgb.b * 100 / 255
    };
  },

  convertRgbPercentageToRgb: function (rgbPercentage) {
    return {
      r: rgbPercentage.r * 255 / 100,
      g: rgbPercentage.g * 255 / 100,
      b: rgbPercentage.b * 255 / 100
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

let touchIntent = false;
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
    downloadButton = document.getElementById('donate-btn'),
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

const ui = {
  selectedInput: hexInput,
  deviceIsSmartPhoneOrTablet: !(navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)),
  exampleText: '<?php echo $labels[\'text-example\']; ?>',//'Пример текста для <b>демонстрации</b> цвета',
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

function updateUI(from) {
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
    palette.selectedThone = 'red';
  }
  if ((h > 4) && (h <= 40)) {
    palette.selectedThone = 'brown';
  }
  if ((h > 4) && (h <= 40)) {
    palette.selectedThone = 'brown';
  }
  if ((h > 40) && (h <= 65)) {
    palette.selectedThone = 'yellow';
  }
  if ((h > 65) && (h <= 170)) {
    palette.selectedThone = 'green';
  }
  if ((h > 170) && (h <= 256)) {
    palette.selectedThone = 'blue';
  }
  if ((h > 256) && (h <= 340)) {
    palette.selectedThone = 'purple';
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
  downloadButton.style.backgroundColor = `rgb(${darkerThoneRgb.r}, ${darkerThoneRgb.g}, ${darkerThoneRgb.b})`;
  linkToMe.style.color = `rgb(${darkerThoneRgb.r}, ${darkerThoneRgb.g}, ${darkerThoneRgb.b})`;
  gifLink.style.backgroundColor = `rgb(${darkerThoneRgb.r}, ${darkerThoneRgb.g}, ${darkerThoneRgb.b})`;
  jpgLink.style.backgroundColor = `rgb(${darkerThoneRgb.r}, ${darkerThoneRgb.g}, ${darkerThoneRgb.b})`;
  pngLink.style.backgroundColor = `rgb(${darkerThoneRgb.r}, ${darkerThoneRgb.g}, ${darkerThoneRgb.b})`;
  svgLink.style.backgroundColor = `rgb(${darkerThoneRgb.r}, ${darkerThoneRgb.g}, ${darkerThoneRgb.b})`;

  if (ui.darkMode) {
    downloadButton.style.color = ui.isBlackReadableOverTone() ? 'black' : 'white';
    downloadButton.style.color = 'black';
  } else {
    downloadButton.style.color = 'white';
  }

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

      rgbPercentageInputString = Math.round(palette.currentColor.rgbPercentage.r) / 100 + ', '
          + Math.round(palette.currentColor.rgbPercentage.g) / 100 + ', '
          + Math.round(palette.currentColor.rgbPercentage.b) / 100,

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

  exampleText.innerHTML = ui.exampleText;
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
    // console.log(palette.currentColor.percent.toneCursor.x);
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
  if (event.targetTouches.length > 0) {
    const touch = event.targetTouches[0];
    colorChoosingActionStart(touch.pageX, touch.pageY);
  }
});

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
  actionsHandler({
    x: event.pageX,
    y: event.pageY
  });
});

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
  if (palette.currentColor.alpha !== 1) {
    alphaUrlString = '&alpha=' + (Math.round(palette.currentColor.alpha * 100) / 100);
  }
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

hexInput.addEventListener('input', function () {
  const hexInputString = hexInput.value.replace(/[^0-9a-fA-F]/g, '').substr(0, 6);
  // hexInput.value = hexInputString;
  palette.setColorFromHex(hexInputString);
  updateUI(hexInput);

  changeUrl()
});

rgbInput.addEventListener('input', function () {
  let rgbInputString = rgbInput.value.replace(',', ' ').replace(/[^0-9. ]/g, '').replace(/ +/g, ' ').trim();
  console.log(rgbInputString);
  // rgbInput.value = rgbInputString;

  const rgb = {
    r: palette.currentColor.rgb.r,
    g: palette.currentColor.rgb.g,
    b: palette.currentColor.rgb.b
  };

  const splitString = rgbInputString.split(' ');
  if (splitString.length >= 3) {
    rgb.r = splitString[0] * 1;
    rgb.g = splitString[1] * 1;
    rgb.b = splitString[2] * 1;
    if (splitString.length > 3) {
      palette.setAlpha(splitString[3] * 100);
    } else {
      palette.setAlpha(100);
    }
    palette.setColorFromRgb(rgb);
  }

  updateUI(rgbInput);
  changeUrl()
});

rgbPercentageInput.addEventListener('input', function () {
  let rgbPercentageInputString = rgbPercentageInput.value.replace(',', ' ').replace(/[^0-9. ]/g, '').replace(/ +/g, ' ').trim();
  // rgbPercentageInput.value = rgbPercentageInputString;

  const rgbPercentage = {
    r: palette.currentColor.rgbPercentage.r,
    g: palette.currentColor.rgbPercentage.g,
    b: palette.currentColor.rgbPercentage.b
  };

  const splitString = rgbPercentageInputString.split(' ');
  if (splitString.length >= 3) {
    rgbPercentage.r = splitString[0] * 100;
    rgbPercentage.g = splitString[1] * 100;
    rgbPercentage.b = splitString[2] * 100;
    if (splitString.length > 3) {
      palette.setAlpha(splitString[3] * 100);
    } else {
      palette.setAlpha(100);
    }
    palette.setColorFromRgbPercentage(rgbPercentage);
  }

  updateUI(rgbPercentageInput);
  changeUrl()
});

hsvInput.addEventListener('input', function () {
  const hsvInputString = hsvInput.value.replace(',', ' ').replace(/[^0-9. ]/g, '').replace(/ +/g, ' ').trim();
  // console.log(hsvInputString);
  // hsvInput.value = hsvInputString;

  const hsv = {
    h: palette.currentColor.hsv.h,
    s: palette.currentColor.hsv.s,
    v: palette.currentColor.hsv.v
  };

  const splitString = hsvInputString.split(' ');
  if (splitString.length >= 3) {
    hsv.h = splitString[0] * 1;
    hsv.s = splitString[1] * 1;
    hsv.v = splitString[2] * 1;
    if (splitString.length > 3) {
      palette.setAlpha(splitString[3] * 100);
    } else {
      palette.setAlpha(100);
    }
    palette.setColorFromHsv(hsv);
  }

  updateUI(hsvInput);
  changeUrl()
});

cmykInput.addEventListener('input', function () {
  const cmykInputString = cmykInput.value.replace(',', ' ').replace(/[^0-9. ]/g, '').replace(/ +/g, ' ').trim();
  console.log(cmykInputString);
  // cmykInput.value = cmykInputString;

  const cmyk = {
    c: palette.currentColor.hsv.c,
    m: palette.currentColor.hsv.m,
    y: palette.currentColor.hsv.y,
    k: palette.currentColor.hsv.k
  };

  const splitString = cmykInputString.split(' ');
  if (splitString.length >= 4) {
    cmyk.c = splitString[0] * 1;
    cmyk.m = splitString[1] * 1;
    cmyk.y = splitString[2] * 1;
    cmyk.k = splitString[3] * 1;
    if (splitString.length > 4) {
      palette.setAlpha(splitString[4] * 100);
    } else {
      palette.setAlpha(100);
    }
    palette.setColorFromCmyk(cmyk);
  }

  updateUI(cmykInput);
  changeUrl()
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

turnNightMode = () => {
  document.body.style.transitionDuration = "0s";
  nightModeSwitcher.classList.add('night');
  document.body.classList.add('night');
  document.body.style.transitionDuration = "0.1s";
  ui.darkMode = true;
  updateUI();
};

turnLightMode = () => {
  document.body.style.transitionDuration = "0s";
  nightModeSwitcher.classList.remove('night');
  document.body.classList.remove('night');
  document.body.style.transitionDuration = "0.1s";
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
  }
};

autoThemeApply();
window.onfocus = autoThemeApply;

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