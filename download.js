const $dwnldBtn = document.getElementById('dwnld-btn');
const $dwnldPopup = document.getElementById('dwnld-popup');
const $darkBckgr = document.getElementById('dark-bckgr');
const $dwnldCancelBtn = document.getElementById('dwnld-cancel');
const rect = document.getElementById('rect');
const imgWidth = document.getElementById('img-width');
const imgHeight = document.getElementById('img-height');

$dwnldBtn.addEventListener('click', () => {
    rect.style.background = '#' + palette.currentColor.hex;
    rect.style.color = palette.getReadableColorOverColor();
    imgWidth.style.color = palette.getReadableColorOverColor();
    imgHeight.style.color = palette.getReadableColorOverColor();

    $dwnldPopup.classList.add('visible');
});

$darkBckgr.addEventListener('click', () => {
    $dwnldPopup.classList.remove('visible');
});

$dwnldCancelBtn.addEventListener('click', () => {
    $dwnldPopup.classList.remove('visible');
});