const $langsBtn = document.getElementById('langs-btn');
const $langsPopupWrapper = document.getElementById('langs-popup-wrapper');
const $langsPopup = document.getElementById('langs-popup');
const $darkBckgr = document.getElementById('dark-bckgr');
// const $dwnldCancelBtn = document.getElementById('langs-cancel');

const $gifLink = document.getElementById('gif-link'),
    $jpgLink = document.getElementById('jpg-link'),
    $pngLink = document.getElementById('png-link'),
    $svgLink = document.getElementById('svg-link');

$langsBtn.addEventListener('click', () => {
    $darkBckgr.classList.add('visible');
    $langsPopupWrapper.classList.add('visible');
});

$langsPopupWrapper.addEventListener('click', () => {
    $langsPopupWrapper.classList.remove('visible');
    $darkBckgr.classList.remove('visible');
});

$langsPopup.addEventListener('click', (e) => {
    e.stopPropagation();
});

// $dwnldCancelBtn.addEventListener('click', () => {
//     $dwnldPopup.classList.remove('visible');
//     $darkBckgr.classList.remove('visible');
// });

$langsBtn.style.display = 'flex';
