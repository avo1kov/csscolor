<?php 

// error_reporting(0);

$format = filter_input(INPUT_GET, 'format', FILTER_SANITIZE_STRING);
$alpha = filter_input(INPUT_GET, 'alpha', FILTER_SANITIZE_STRING);
$size = filter_input(INPUT_GET, 'size', FILTER_SANITIZE_STRING);
$w = filter_input(INPUT_GET, 'w', FILTER_SANITIZE_NUMBER_INT);
$h = filter_input(INPUT_GET, 'h', FILTER_SANITIZE_NUMBER_INT);
$color = filter_input(INPUT_GET, 'color', FILTER_SANITIZE_STRING);
$hex = filter_input(INPUT_GET, 'hex', FILTER_SANITIZE_STRING);

// echo $hex,' ';
if (strlen($hex) == 3) {
    $hex = $hex[0].$hex[0].$hex[1].$hex[1].$hex[2].$hex[2];
}
// echo $hex;

$r = hexdec($hex[0].$hex[1]);
$g = hexdec($hex[2].$hex[3]);
$b = hexdec($hex[4].$hex[5]);

$wh = explode('x', $size);
$w = $wh[0];
$h = $wh[1];

// echo $format;
// echo $w;
// echo $h;
// echo $hex;

$name = $hex;

if (($w < 1) || ($w >= 20000) || ($h < 1) || ($h >= 20000)) {
	$name = 'nice_try';
} 

if ($format == "svg") {
	header("Content-type:  text/xml"); 
	header('Content-Disposition: attachment; filename='.$name.'.svg');
	echo '<svg id="square.svg" xmlns="http://www.w3.org/2000/svg" width="'.$w.'" height="'.$h.'" viewBox="0 0 '.$w.' '.$h.'">
  <defs>
    <style>
      .cls-1 {
        fill: ';
        if ($alpha == '') {
        	echo '#'.$hex;
        } else {
        	echo 'rgba('.$r.', '.$g.', '.$b.', '.$alpha.');';
        }
        echo '
      }
    </style>
  </defs>
  <rect id="square1" data-name="tolik" class="cls-1" width="'.$w.'" height="'.$h.'"/>
</svg>';
} else {
	$image = imageCreate($w, $h); 
// 	$rgb = explode(',', $color);
//     hexdec($hex[0].$hex[1]);
	
	$a = 0;
// 	echo $alpha, 'dsf';
	if ($alpha != '') {
		$a = 127 - $alpha*127;
// 		echo $a, $alpha;
	}

	$colorBackgr = imageColorAllocateAlpha($image, $r, $g, $b, $a); 
	imageFilledRectangle($image, 0, 0, $w, $h, $colorBackgr);  
	if ($format == "gif") {
		header("Content-type:  image/gif"); 
		header('Content-Disposition: attachment; filename='.$name.'.gif');
		imageGIF($image);  
	}
	if ($format == "png") {
		header("Content-type:  image/png");
		header('Content-Disposition: attachment; filename='.$name.'.png');
		imagePNG($image);  
	}
	if ($format == "jpg") {
		header("Content-type:  image/jpeg");
		header('Content-Disposition: attachment; filename='.$name.'.jpg');
		imageJPEG($image);  
	}
}