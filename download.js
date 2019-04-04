const $dwnldBtn = document.getElementById('dwnld-btn');
const $dwnldPopup = document.getElementById('dwnld-popup');
const $darkBckgr = document.getElementById('dark-bckgr');
const $dwnldCancelBtn = document.getElementById('dwnld-cancel');
const $rect = document.getElementById('rect');
const $imgWidth = document.getElementById('img-width');
const $imgHeight = document.getElementById('img-height');

const $gifLink = document.getElementById('gif-link'),
    $jpgLink = document.getElementById('jpg-link'),
    $pngLink = document.getElementById('png-link'),
    $svgLink = document.getElementById('svg-link');

refreshLinks = () => {
    const link = `https://csscolor.ru/download/${palette.currentColor.hex}`;
    const size = '?size=' + ($imgWidth.value === '' ? 256 : $imgWidth.value) + 'x' + ($imgHeight.value === '' ? 256 : $imgHeight.value);
    let alpha = '';
    if (palette.currentColor.alpha !== 1) {
        alpha = `&alpha=${Math.round(palette.currentColor.alpha*100)/100}`
    }
    $gifLink.setAttribute('href', link + '.gif' + size + alpha);
    $jpgLink.setAttribute('href', link + '.jpg' + size + alpha);
    $pngLink.setAttribute('href', link + '.png' + size + alpha);
    $svgLink.setAttribute('href', link + '.svg' + size + alpha);
};

$dwnldBtn.addEventListener('click', () => {
    $rect.style.background = '#' + palette.currentColor.hex;
    $rect.style.color = palette.getReadableColorOverColor();
    if (palette.getReadableColorOverTone() !== '#fff') {
        $imgWidth.classList.add('dark');
        $imgHeight.classList.add('dark');
    } else {
        $imgWidth.classList.remove('dark');
        $imgHeight.classList.remove('dark');
    }
    refreshLinks();

    $dwnldPopup.classList.add('visible');
});

$imgHeight.addEventListener('change', refreshLinks);
$imgWidth.addEventListener('change', refreshLinks);

$darkBckgr.addEventListener('click', () => {
    $dwnldPopup.classList.remove('visible');
});

$dwnldCancelBtn.addEventListener('click', () => {
    $dwnldPopup.classList.remove('visible');
});