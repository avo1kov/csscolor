<?
	$url = '';
	$lang = $_GET['lang'];
	if ($lang == '') {
		$lang = 'ru';
	}
	$model = $_GET['model'];
	$color = $_GET['color'];
	$hex = $_GET['hex'];
	$alpha = $_GET['alpha'];

	$preview_image = 'https://csscolor.ru/logo.png';
	if (($model == 'rgb') || ($lang == 'rgb')) {
		$preview_image = 'https://csscolor.ru/preview-maker.php?format=png&model=rgb&w=144&h=144&color='.substr($color, 1);
	}
	if (($model == 'hex') || ($lang == 'hex')) {
		$preview_image = 'https://csscolor.ru/preview-maker.php?format=png&model=hex&w=144&h=144&color='.substr($color, 1);
	}
	if (($model == 'hsv') || ($lang == 'hsv')) {
		$preview_image = 'https://csscolor.ru/preview-maker.php?format=png&model=hsv&w=144&h=144&color='.substr($color, 1);
	}
	$twitter_title = "HTML CSS Палитра цветов";
	// $twitter_description = "";
	$preview_image = 'https://csscolor.ru/logo.png';
	$secure_preview_image = 'https://csscolor.ru/logo.png';
	$url = 'https://csscolor'.$_SERVER['REQUEST_URI'];
	if ($hex != '') {
	    if ($alpha == '') {
	        $alpha = 1;
		}
		if (strlen($hex) == 4) {
			$hex = $hex[0].$hex[0].$hex[1].$hex[1].$hex[2].$hex[2].$hex[3].$hex[3];
		} else if (strlen($hex) == 3) {
	        $hex = $hex[0].$hex[0].$hex[1].$hex[1].$hex[2].$hex[2];
		}
		if ($alpha < 1) {
			$preview_image = 'https://csscolor.ru/preview.php?hex='.$hex.sprintf('%02d', dechex($alpha*255));
			$secure_preview_image = 'https://csscolor.ru/preview.php?hex='.$hex.sprintf('%02d', dechex($alpha*255));
			$twitter_title = "#".$hex.sprintf('%02d', dechex($alpha*255));
			// $preview_image = 'https://bigpicker.org/png/?hex='.$hex.'&alpha='.$alpha;
		} else {
			$preview_image = 'https://csscolor.ru/preview.php?hex='.$hex;
			$secure_preview_image = 'https://csscolor.ru/preview.php?hex='.$hex;
			$twitter_title = "#".$hex;
		}
	}
	

	$langList = array(
		'' => 'Русский',
		'en' => 'English',
		'de' => 'German',
		'es' => 'Español',
		'hi' => 'हिंदी',
		'fr' => 'Français',
		'eo' => 'Esperanto',
		'sw' => 'Kiswahili'
	);
	
	$helloTextArray = array(
		'Лень <b>делает</b> всякое дело трудным.',
		'Звание <b>свободного</b> человека дороже всего.',
		'Характер подобен дереву, а репутация — его тени. Мы заботимся о тени, но на самом деле надо думать о <b>дереве</b>.',
		'Одно <b>сегодня</b> стоит двух завтра.',
		'Каждое поколение считает себя более умным, чем предыдущее, и более мудрым, чем <b>последующее</b>.',
		'Ты должен держать <b>свое слово</b>. Это все что у тебя есть.',
		'Большим горшком <b>воду</b> не носят.',
		'<b>Лампа</b> себя не освещает.',
		'Искушение сдаться будет особенно <b>сильным</b> незадолго до победы.',
		'Рассудительный стремится к отсутствию <b>страданий</b>, а не к наслаждению.',
		'Серьёзное разрушается <b>смехом</b>, смех — серьёзностью.',
		'Жизнь — это <b>путешествие</b>, а не пункт назначения.'
	);
	if (date('dm') == '3112') {
		$helloTextArray = array('С наступающим <b>Новым годом</b>!');
	}
	if (date('dm') == '0101') {
		$helloTextArray = array('С Новым <b>'.date('Y').'</b> годом!');
	}
	$helloText = $helloTextArray[rand(0, count($helloTextArray)-1)];
	// include ('main190920.html');
	// include ('index.html');
	// include ('out.html');
	// include ('template.html');
	include('templates/'.$lang.'.html');
