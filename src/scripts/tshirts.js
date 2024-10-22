const $tshirtsBtn = document.getElementById('tshirts_btn');

$tshirtsBtn.addEventListener('click', () => {
    window.open('https://onlytone.ru/items?ref=csscolor&color=' + palette.currentColor.hex.substring(0,6), '_blank');
});
