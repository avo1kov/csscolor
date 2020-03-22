<?php 

// error_reporting(0);

$hex = filter_input(INPUT_GET, 'hex', FILTER_SANITIZE_STRING);

$a = 1;
if (strlen($hex) == 3) {
	$hex = $hex[0].$hex[0].$hex[1].$hex[1].$hex[2].$hex[2];
}
if (strlen($hex) == 4) {
	$a = hexdec($hex[3].$hex[3]) / 255;
	$hex = $hex[0].$hex[0].$hex[1].$hex[1].$hex[2].$hex[2].$hex[3].$hex[3];
}
if (strlen($hex) == 8) {
	$a = hexdec($hex[6].$hex[7]) / 255;
}

$r = hexdec($hex[0].$hex[1]);
$g = hexdec($hex[2].$hex[3]);
$b = hexdec($hex[4].$hex[5]);
$a = 127 - $a * 127;
$imageSize = 256;
$ceilSize = 32;
$image = imagecreatetruecolor($imageSize, $imageSize); 

imageFilledRectangle($image, $x, $y, $imageSize, $imageSize, imageColorAllocate($image, 255, 255, 255));

$transparentCeilColor = imageColorAllocate($image, 219, 219, 219);
for ($y = 0; $y < $imageSize; $y += $ceilSize) {
	for ($x = $ceilSize * ($y / $ceilSize % 2); $x < $imageSize; $x += $ceilSize * 2) {
		imageFilledRectangle($image, $x, $y, $x + $ceilSize, $y + $ceilSize, $transparentCeilColor); 
	}
}

$colorBackgr = imageColorAllocateAlpha($image, $r, $g, $b, $a); 
imageFilledRectangle($image, 0, 0, $imageSize, $imageSize, $colorBackgr); 

header("Content-type:  image/png");
imagePNG($image);