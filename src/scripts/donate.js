const $donateBtn = document.getElementById('donate-btn');
const $donateLink = document.getElementById('donate-link');
const $donatePopup = document.getElementById('donate-popup');
const $darkBckgr = document.getElementById('dark-bckgr');

const showDonatePopup = () => {
    $darkBckgr.classList.add('visible');
    $donatePopup.classList.add('visible');
    dataLayer.push({'event':'donate-button-click','selected-tone': palette.selectedThone});
};

const hideDonatePopup = () => {
    $darkBckgr.classList.remove('visible');
    $donatePopup.classList.remove('visible');
};

$darkBckgr.addEventListener('click', hideDonatePopup);
$donateBtn.addEventListener('click', showDonatePopup);
if ($donateLink) {
    $donateLink.addEventListener('click', showDonatePopup);
}