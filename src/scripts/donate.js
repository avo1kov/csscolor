const $donateBtn = document.getElementById('donate-btn');
const $donateLink = document.getElementById('donate-link');
const $donatePopup = document.getElementById('donate-popup');
const $darkBckgr = document.getElementById('dark-bckgr');

const showDonatePopup = () => {
    $darkBckgr.classList.add('visible');
    dataLayer.push({'event':'donate-button-click','selected-tone': palette.selectedThone});
    $donatePopup.classList.add('visible');
};

const hideDonatePopup = () => {
    $donatePopup.classList.remove('visible');
};

$donateBtn.addEventListener('click', showDonatePopup);
$donateLink.addEventListener('click', showDonatePopup);
$darkBckgr.addEventListener('click', hideDonatePopup);