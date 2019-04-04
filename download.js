const $dwnldBtn = document.getElementById('dwnld-btn');
const $dwnldPopup = document.getElementById('dwnld-popup');
const $darkBckgr = document.getElementById('dark-bckgr');
const $dwnldCancelBtn = document.getElementById('dwnld-cancel');
const rect = document.getElementById('rect');

$dwnldBtn.addEventListener('click', () => {
    rect.style.background = '#' + palette.currentColor.hex;
    $dwnldPopup.classList.add('visible');
});

$darkBckgr.addEventListener('click', () => {
    $dwnldPopup.classList.remove('visible');
});

$dwnldCancelBtn.addEventListener('click', () => {
    $dwnldPopup.classList.remove('visible');
});