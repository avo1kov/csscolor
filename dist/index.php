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
	if ($hex != '') {
	    if (strlen($hex) == 3) {
	        $hex = $hex[0].$hex[0].$hex[1].$hex[1].$hex[2].$hex[2];
		}
		if (strlen($hex) == 4) {
	        $hex = $hex[0].$hex[0].$hex[1].$hex[1].$hex[2].$hex[2].$hex[3].$hex[3];
		}
		if ($alpha != '') {
			$preview_image = 'https://csscolor.ru/preview.php?hex='.$hex.dechex($alpha*255);
		} else {
			$preview_image = 'https://csscolor.ru/preview.php?hex='.$hex;
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

	$media = array(
	    'tg' => '<script async src="https://comments.app/js/widget.js?2" data-comments-app-website="X4A89j26" data-limit="5" data-page-id="1" data-dislikes="1"></script>',
		'vk' => '<script type="text/javascript" src="//vk.com/js/api/openapi.js?121"></script>
					<script type="text/javascript">
					  VK.init({apiId: 4772788, onlyWidgets: true});
					</script>
					<div id="vk_comments"></div>
					<script type="text/javascript">
					VK.Widgets.Comments("vk_comments", {limit: 10, attach: "*", autoPublish: 0,  pageUrl: "http://csscolor.ru/"});
					</script>',
		'fb' => '<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_EN/sdk.js#xfbml=1&version=v2.7";
  fjs.parentNode.insertBefore(js, fjs);
}(document, \'script\', \'facebook-jssdk\'));</script><div class="fb-comments" data-href="http://csscolor.ru/en/" data-numposts="5" width=100% data-order-by="reverse_time"></div>
'
	);

	$author = '<a href="https://www.instagram.com/avo1kov/" class="content" target="_new" class="content me" id="linkToMe" onclick="dataLayer.push({\'event\':\'footer-link-click\'});">Alexander Volkov</a>';

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
	$labels = array(
			'lang' => 'ru',
			'seo-description' => 'HTML CSS Палитра цветов в HEX, RGB, HSV и CMYK',
			'seo-keywords' => 'палитра css, цвета css, палитра html, css html цвета, html цвета палитра, палитра цветов',
			'title' => 'HTML CSS Палитра цветов',
			'download-color-button-for-layout' => 'Скачать цвет',
			'width' => 'Ширина',
			'height' => 'Высота',
			'donate' => 'Поддержать',
			'cancel' => 'Отмена',
			'goal' => 'Поддержите нас. Это важно',
			'download-color-button-ok' => 'Ок',
			'text-example' => $helloText,
			'description' => '<p>
						<b>HTML CSS Палитра цветов</b> помогает подобрать <b>цвет</b> в виде <b>HEX, RGB, RGBA, HSV и CMYK</b> записи цветовой модели. Нажимайте на поля выбора цвета, а для более точного выбора, перемещайте курсор с зажатой левой кнопкой мыши. Изменяйте параметры цвета через поля ввода.
					</p>
					<p>
						А ещё можно скачать выбранный цвет. Нажмите на кнопку <b>"Скачать цвет"</b>, появится поле параметров. Вы можете выбрать формат (SVG, PNG, JPEG или GIF) и размер картинки. Обращаю ваше внимание, что полупрозрачные цвета можно скачать только в форматах SVG и PNG.
					</p>
					<p>
						В качестве экперимента разместили небольшую статью про flexbox: <a href="https://csscolor.ru/flexbox" class="content">https://csscolor.ru/flexbox</a>
					</p>
',
			'media' => $media['tg'],
			'ads' => 'yandex',
			'author' => '<a href="https://www.instagram.com/avo1kov/" class="content" target="_new" class="content me" id="linkToMe" onclick="dataLayer.push({\'event\':\'footer-link-click\'});">Александр Волков</a>'
	);

	if ($lang == 'en') {
		$labels['lang'] = 'en';
		$labels['seo-description'] = 'Color picker for you! Works with HSV, RGB, HEX, CMYK and transparent. You can download selected color as SVG, PNG, JPEG and GIF picture. This is a nice picker!';
		$labels['seo-keywords'] = 'color picker, colour picker, palette css, colors css, colours css, palette html, css html colors, css html colours, html color palette, html colour palette, color palette, colour palette';
		$labels['title'] = 'Color picker';
		$labels['download-color-button-for-layout'] = 'Download color';
		$labels['width'] = 'Width';
		$labels['height'] = 'Height';
		$labels['donate'] = 'Donate';
        $labels['cancel'] = 'Cancel';
        $labels['goal'] = 'Please feel free to make a donation';
		$labels['download-color-button-ok'] = 'Okay';
		$labels['text-example'] = '<b>Example</b> text is painted in the chosen color.';
		$labels['description'] = '<p>
							<b>Color picker</b> helps you pick a <b>color</b> in HEX, RGB, RGBA, CMYK and HSV color model record. Click on the field of color selection, and for a more precise selection, move the cursor while holding the left mouse button. Change the color settings via input fields.
						<p>
							Also, you can <b>download the color</b> selected. Click on the button "Download color", that will appear at the settings box. You can choose the format (SVG, PNG, JPEG or GIF), and image size. Please note that the semi-permanent color can only be downloaded in SVG and PNG format.
						</p>
						<p>
							Your comment would be nice :)
						</p>
';
		$labels['author'] = $author;
		$labels['ads'] = 'none';
		$labels['media'] = $media['tg'];
	} else if ($lang == 'eo') {
		$labels['lang'] = 'eo';
		$labels['seo-description'] = 'Koloro picker por vi!';
		$labels['seo-keywords'] = 'koloro picker, koloro picker, paletro, css, koloroj, css koloroj css, paletro, html, css, html koloroj, css, html koloroj, html paletro, html paletro, koloro paletro, koloro paletro';
		$labels['title'] = 'Koloro picker';
		$labels['download-color-button-for-layout'] = 'Savi koloro';
		$labels['width'] = 'Larĝo';
		$labels['height'] = 'Alteco';
		$labels['donate'] = 'Doni';
        $labels['cancel'] = 'Nuligi';
        $labels['goal'] = 'Bonvolu fari donacon';
		$labels['download-color-button-ok'] = 'Bone';
		$labels['text-example'] = '<b>Ekzemplo</b> teksto estas pentrita en la elektita koloro.';
		$labels['description'] = '<p>
							<b>Koloro picker</b> helpas vin elekti <b>koloron</b> en HEX, RGB, RGBA, CMYK kaj HSV koloro modelo rekordo. Klaku sur la kampo de koloro selektado, kaj por pli preciza elekto, movu la kursoron dum tenante la maldekstra musbutono. Ŝanĝi la koloro agordojn per enigo kampoj.
						</p>
						<p>
							Ankaŭ, vi povas <b>savi la koloro</b> elektita. Klaku sur la butonon "Savi koloro", kiu aperos en la skatolo agordojn. Vi povas elekti la formato (SVG, PNG, JPEG aŭ GIF), kaj bildo-grandeco. Bonvolu noti, ke la semi-permanenta koloro povas nur esti elŝutita en SVG kaj PNG formato.
						</p>
						<p>
							Via komento estus bela :)
						</p>
';
		$labels['author'] = $author;
		$labels['ads'] = 'none';
		$labels['media'] = $media['tg'];
	} else if ($lang == 'es') {
		$labels['lang'] = 'es';
		$labels['seo-description'] = 'HTML CSS Selector de color para desarrollador. Funciona con HSV, RGB, CMYK y HEX.';
		$labels['seo-keywords'] = 'selector de color, paleta css, colores css, colores html, css html colores, paleta de colores html, paleta de color';
		$labels['title'] = 'HTML CSS Selector de colores';
		$labels['download-color-button-for-layout'] = 'Descargar el color';
		$labels['width'] = 'Anchura';
		$labels['height'] = 'Altura';
		$labels['donate'] = 'Donar';
        $labels['cancel'] = 'Cancelar';
        $labels['goal'] = 'Por favor haga una donación';
		$labels['download-color-button-ok'] = 'Bueno';
		$labels['text-example'] = '<b>Ejemplo</b> el texto está pintado en el color elegido.';
		$labels['description'] = '
						<p>
							<b>HTML CSS Selector de colores</b> le ayuda a elegir un <b>color</b> en el registro de color HEX, RGB, RGBA, CMYK y HSV. Haga clic en el campo de selección de colores y, para una selección más precisa, mueva el cursor mientras mantiene pulsado el botón izquierdo del ratón. Cambie la configuración del color a través de los campos de entrada.
						</p>
						<p>
							Además, puede <b>descargar el color</b> seleccionado. Haga clic en el botón "Descargar color", que aparecerá en el cuadro de configuración. Puede elegir el formato (SVG, PNG, JPEG o GIF) y el tamaño de la imagen. Tenga en cuenta que el color semipermanente sólo se puede descargar en formato SVG y PNG.
						</p>
						<p>
							Su comentario sería bueno :)
						</p>
';
		$labels['author'] = $author;
		$labels['ads'] = 'none';
		$labels['media'] = $media['tg'];
	} else if ($lang == 'uk') {
		$label['lang'] = 'uk';
		$labels['seo-description'] = 'HTML CSS Палітра кольорів в HEX, RGB, CMYK і HSV';
		$labels['seo-keywords'] = 'палітра css, кольору css, палітра html, css html кольору, html кольору палітра, палітра кольорів';
		$labels['title'] = 'HTML CSS Палітра кольорів';
		$labels['download-color-button-for-layout'] = 'Скачати колір';
		$labels['width'] = 'Ширина';
		$labels['height'] = 'Висота';
		$labels['donate'] = 'Пожертвуйте';
        $labels['cancel'] = 'Скасувати';
        $labels['goal'] = 'Пожертвувати на чашку кави';
		$labels['download-color-button-ok'] = 'Ок';
		$labels['text-example'] = '<b>Здорово!</b> Ви обрали дуже гарний колір! :)';
		$labels['description'] = '<p>
							<b>HTML CSS Палітра кольорів</b> допомагає підібрати <b>колір</b> у вигляді HEX, RGB, RGBA, CMYK i HSV записи колірної моделі. Натискайте на поля вибору кольору, а для більш точного вибору, переміщайте курсор миші з затиснутою лівою кнопкою миші. Змінюйте параметри кольору через поля вводу.
						</p>
						<br />
						<p>
							А ще можна завантажити вибраний колір. Натисніть на кнопку <b>"Скачати колір"</b>, з\'явиться вікно параметрів. Ви можете вибрати формат (SVG, PNG, JPEG або GIF) і розмір картинки. Звертаю вашу увагу, що напівпрозорі кольору можна завантажити тільки у форматі SVG і PNG.
						</p>
';
		$labels['media'] = $media['tg'];
	}

	if ($lang == 'fr') {
		$labels['lang'] = 'fr';
		$labels['seo-description'] = 'HTML CSS Sélecteur de couleurs pour le développeur. Fonctionne avec HSV, RGB, CMYK et HEX.';
		$labels['seo-keywords'] = 'couleur css, couleur css, couleurs css, couleurs css, palette html, css couleurs html, css couleurs html, html palette de couleurs, html palette de couleurs, palette de couleurs, palette de couleurs';
		$labels['title'] = 'HTML CSS Sélecteur de couleurs';
		$labels['download-color-button-for-layout'] = 'Télécharger la couleur';
		$labels['width'] = 'Largeur';
		$labels['height'] = 'La taille';
		$labels['donate'] = 'Faire un don';
        $labels['cancel'] = 'Annuler';
        $labels['goal'] = 'Merci de faire un don';
		$labels['download-color-button-ok'] = 'D\'accord';
		$labels['text-example'] = '<b>L\'exemple</b> de texte est peint dans la couleur choisie.';
		$labels['description'] = '<p>
							<b>Sélecteur de couleurs HTML CSS</b> vous aide à choisir une <b>couleur</b> dans l\'enregistrement de modèle de couleur HEX, RGB, RGBA, HSV et CMYK. Cliquez sur le champ de sélection des couleurs, et pour une sélection plus précise, déplacez le curseur tout en maintenant le bouton gauche de la souris enfoncé. Modifiez les paramètres de couleur via les champs de saisie.
						</p>
						<p>
							Vous pouvez également <b>télécharger la couleur</b> sélectionnée. Cliquez sur le bouton "Télécharger la couleur", qui apparaîtra à la boîte de paramètres. Vous pouvez choisir le format (SVG, PNG, JPEG ou GIF) et la taille de l\'image. Veuillez noter que la couleur semi-permanente ne peut être téléchargée qu\'en format SVG et PNG.
						</p>
						<p>
							Votre commentaire serait bien :)
						</p>
';
		$labels['author'] = $author;
		$labels['ads'] = 'none';
		$labels['media'] = $media['tg'];
	} else if ($lang == 'hi') {
		$labels['lang'] = 'hi';
		$labels['seo-description'] = 'आप के लिए रंग बीनने! एचएसवी, आरजीबी, एचईएक्स और पारदर्शी के साथ काम करता है। आप चयनित रंग को SVG, PNG, JPG और GIF चित्र के रूप में डाउनलोड कर सकते हैं। यह अच्छा पिकर है!';
		$labels['seo-keywords'] = 'रंग बीनने, रंग बीनने, पैलेट सीएसएस, रंग सीएसएस, रंग सीएसएस, पैलेट html, सीएसएस html रंग, सीएसएस html रंग, HTML रंग पैलेट, HTML रंग पैलेट, रंग पैलेट, रंग पैलेट';
		$labels['title'] = 'रंग चयनकर्ता';
		$labels['download-color-button-for-layout'] = 'रंग डाउनलोड करें';
		$labels['width'] = 'चौड़ाई';
		$labels['height'] = 'ऊंचाई';
		$labels['donate'] = 'दान करना';
        $labels['cancel'] = 'रद्द करना';
        $labels['goal'] = 'कृपया एक दान करें';
		$labels['download-color-button-ok'] = 'ठीक है';
		$labels['text-example'] = '<b>उदाहरण के लिए</b> पाठ रंग में चित्रित.';
		$labels['description'] = '<p>
							<b>कलर</b> पिकर आपको HEX, RGB, RGBA, CMYK और HSV कलर मॉडल रिकॉर्ड में रंग चुनने में मदद करता है। रंग चयन के क्षेत्र पर क्लिक करें, और अधिक सटीक चयन के लिए, बाईं माउस बटन को पकड़े हुए कर्सर को घुमाएं। इनपुट फ़ील्ड के माध्यम से रंग सेटिंग्स बदलें।
						</p>
						<p>
							इसके अलावा, आप <b>रंग डाउनलोड कर सकते हैं</b> चयनित। "रंग डाउनलोड करें" बटन पर क्लिक करें, जो सेटिंग बॉक्स में दिखाई देगा। आप प्रारूप (SVG, PNG, JPEG या GIF), और छवि का आकार चुन सकते हैं। कृपया ध्यान दें कि अर्ध-स्थायी रंग केवल एसवीजी और पीएनजी प्रारूप में डाउनलोड किया जा सकता है।
						</p>
						<p>
							आपकी टिप्पणी अच्छी होगी :)
						</p>
';
		$labels['author'] = $author;
		$labels['ads'] = 'none';
		$labels['media'] = $media['tg'];
	} else if ($lang == 'de') {
		$labels['lang'] = 'de';
		$labels['seo-description'] = 'Farbauswahl für Sie! Funktioniert mit HSV, RGB, HEX, CMYK und transparent. Sie können die ausgewählte Farbe als SVG-, PNG-, JPEG- und GIF-Bild herunterladen. Das ist eine schöne Auswahl!';
		$labels['seo-keywords'] = 'Farbauswahl, Farbauswahl, Palette CSS, Farben CSS, Farben HTML, CSS HTML-Farben, CSS HTML-Farben, HTML-Farbpalette, HTML-Farbpalette, Farbpalette, Farbpalette';
		$labels['title'] = 'Farbwähler';
		$labels['download-color-button-for-layout'] = 'Farbe herunterladen';
		$labels['width'] = 'Breite';
		$labels['height'] = 'Höhe';
		$labels['donate'] = 'Spenden';
        $labels['cancel'] = 'Stornieren';
        $labels['goal'] = 'Bitte Spenden';
		$labels['download-color-button-ok'] = 'Okay';
		$labels['text-example'] = '<b>Beispieltext</b> wird in der ausgewählten Farbe gezeichnet.';
		$labels['description'] = '<p>
							<b>Mit der Farbauswahl</b> können Sie eine <b>Farbe</b> in der HEX-, RGB-, RGBA-, HSV- und CMYK-Farbmodellaufzeichnung auswählen. Klicken Sie auf das Feld für die Farbauswahl. Um eine genauere Auswahl zu treffen, bewegen Sie den Cursor bei gedrückter linker Maustaste. Ändern Sie die Farbeinstellungen über Eingabefelder.
						</p>
						<p>
							Sie können auch <b>die ausgewählte Farbe herunterladen</b>. Klicken Sie auf die Schaltfläche "Farbe herunterladen", die im Einstellungsfeld angezeigt wird. Sie können das Format (SVG, PNG, JPEG oder GIF) und die Bildgröße auswählen. Bitte beachten Sie, dass die semi-permanente Farbe nur im SVG- und PNG-Format heruntergeladen werden kann.
						</p>
						<p>
							Dein Kommentar wäre nett :)
						</p>
';
		$labels['author'] = $author;
		$labels['ads'] = 'none';
		$labels['media'] = $media['tg'];
	} else if ($lang == 'sw') {
		$labels['lang'] = 'sw';
		$labels['seo-description'] = 'Mchoraji wa rangi kwako! Inafanya kazi na HSV, RGB, HEX, CMYK na uwazi. Unaweza kupakua rangi iliyochaguliwa kama SVG, PNG, JPEG na picha ya GIF. Huyu ni kachumbari mzuri!';
		$labels['seo-keywords'] = 'rangi ya kuchagua, rangi ya kuchagua, pausi css, rangi ya CSS, rangi ya CSS, rangi ya html, rangi ya css html, rangi ya css html, rangi ya html rangi, rangi ya html';
		$labels['title'] = 'Chombo cha rangi ya wavuti';
		$labels['download-color-button-for-layout'] = 'Pakua rangi';
		$labels['width'] = 'Upana';
		$labels['height'] = 'Urefu';
		$labels['donate'] = 'Toa';
        $labels['cancel'] = 'Ghairi';
        $labels['goal'] = 'Tafadhali jisikie huru kutoa mchango';
		$labels['download-color-button-ok'] = 'Sawa';
		$labels['text-example'] = 'Maandishi ya <b>mfano</b> yamepigwa rangi iliyochaguliwa.';
		$labels['description'] = '<p>
							Chombo cha rangi husaidia kuchagua rangi katika HEX, RGB, RGBA, HSV, CMYK na rekodi ya mfano wa rangi. Bonyeza kwenye uwanja wa chaguo la rangi, na kwa uteuzi sahihi zaidi, uhamishe mshale wakati unashikilia kitufe cha kushoto cha panya. Badilisha mipangilio ya rangi kupitia sehemu za pembejeo.
						</p>
						<p>
							Pia, unaweza <b> kupakua rangi </b> iliyochaguliwa. Bonyeza kifungo "Pakua rangi", ambayo itaonekana kwenye sanduku la mipangilio. Unaweza kuchagua fomati (SVG, PNG, JPEG au GIF), na saizi ya picha. Tafadhali kumbuka kuwa rangi isiyo na kipimo inaweza kupakuliwa tu katika muundo wa SVG na PNG.
						</p>
						<p>
							Maoni yako itakuwa nzuri :)
						</p>
';
		$labels['author'] = $author;
		$labels['ads'] = 'none';
		$labels['media'] = $media['tg'];
	}

	$useragent=$_SERVER['HTTP_USER_AGENT'];

	$labels['donate_box'] = '
        <iframe src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0%20%D0%BF%D0%B0%D0%BB%D0%B8%D1%82%D1%80%D1%8B&targets-hint=&default-sum=100&button-text=13&hint=&successURL=&quickpay=shop&account=410013246801384" width="423" height="222" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
        <div style="text-align: right">
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="HRPUL3XJYGQ98" />
                <input type="image" src="https://www.paypalobjects.com/ru_RU/RU/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Кнопка «Пожертвовать через PayPal»" />
                <img alt="" border="0" src="https://www.paypal.com/ru_RU/i/scr/pixel.gif" width="1" height="1" />
            </form>
        </div>
	';

    if (preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4))) {
        $labels['media'] = '';
        $labels['donate_box'] = '';
    }

	// $red_colors = array(
	// 	// Red
	// 	array('source_name' => 'IndianRed', 'russian_name' => '', 'hex' => '#CD5C5C', 'rgb' => '205, 92, 92'),
	// 	array('source_name' => 'LightCoral', 'russian_name' => '', 'hex' => '#F08080', 'rgb' => '240, 128, 128'),
	// 	array('source_name' => 'Salmon', 'russian_name' => '', 'hex' => '#FA8072', 'rgb' => '250, 128, 114'),
	// 	array('source_name' => 'DarkSalmon', 'russian_name' => '', 'hex' => '#E9967A', 'rgb' => '233, 150, 122'),
	// 	array('source_name' => 'LightSalmon', 'russian_name' => '', 'hex' => '#FFA07A', 'rgb' => '255, 160, 122'),
	// 	array('source_name' => 'Crimson', 'russian_name' => '', 'hex' => '#DC143C', 'rgb' => '220, 20, 60'),
	// 	array('source_name' => 'Red', 'russian_name' => '', 'hex' => '#FF0000', 'rgb' => '255, 0, 0'),
	// 	array('source_name' => 'FireBrick', 'russian_name' => '', 'hex' => '#B22222', 'rgb' => '178, 34, 34'),
	// 	array('source_name' => 'DarkRed', 'russian_name' => '', 'hex' => '#8B0000', 'rgb' => '139, 0, 0')
	// );

	// $pink_colors = array(
	// 	// Pink
	// 	array('source_name' => 'Pink', 'russian_name' => '', 'hex' => '#FFC0CB', 'rgb' => '255, 192, 203'),
	// 	array('source_name' => 'LightPink', 'russian_name' => '', 'hex' => '#FFB6C1', 'rgb' => '255, 182, 193'),
	// 	array('source_name' => 'HotPink', 'russian_name' => '', 'hex' => '#FF69B4', 'rgb' => '255, 105, 180'),
	// 	array('source_name' => 'DeepPink', 'russian_name' => '', 'hex' => '#FF1493', 'rgb' => '255, 20, 147'),
	// 	array('source_name' => 'MediumVioletRed', 'russian_name' => '', 'hex' => '#C71585', 'rgb' => '199, 21, 133'),
	// 	array('source_name' => 'PaleVioletRed', 'russian_name' => '', 'hex' => '#DB7093', 'rgb' => '219, 112, 147')
	// );

	// $orange_colors = array(
	// 	// Orange
	// 	array('source_name' => 'LightSalmon', 'russian_name' => '', 'hex' => '#FFA07A', 'rgb' => '255, 160, 122'),
	// 	array('source_name' => 'Coral', 'russian_name' => '', 'hex' => '#FF7F50', 'rgb' => '255, 127, 80'),
	// 	array('source_name' => 'Tomato', 'russian_name' => '', 'hex' => '#FF6347', 'rgb' => '255, 99, 71'),
	// 	array('source_name' => 'OrangeRed', 'russian_name' => '', 'hex' => '#FF4500', 'rgb' => '255, 69, 0'),
	// 	array('source_name' => 'DarkOrange', 'russian_name' => '', 'hex' => '#FF8C00', 'rgb' => '255, 140, 0'),
	// 	array('source_name' => 'Orange', 'russian_name' => '', 'hex' => '#FFA500', 'rgb' => '255, 165, 0')
	// );

	// $yellow_colors = array(
	// 	// Yellow
	// 	array('source_name' => 'Gold', 'russian_name' => '', 'hex' => '#FFD700', 'rgb' => '255, 215, 0'),
	// 	array('source_name' => 'Yellow', 'russian_name' => '', 'hex' => '#FFFF00', 'rgb' => '255, 255, 0'),
	// 	array('source_name' => 'LightYellow', 'russian_name' => '', 'hex' => '#FFFFE0', 'rgb' => '255, 255, 224'),
	// 	array('source_name' => 'LemonChiffon', 'russian_name' => '', 'hex' => '#FFFACD', 'rgb' => '255, 250, 205'),
	// 	array('source_name' => 'LightGoldenrodYellow', 'russian_name' => '', 'hex' => '#FAFAD2', 'rgb' => '250, 250, 210'),
	// 	array('source_name' => 'PapayaWhip', 'russian_name' => '', 'hex' => '#FFEFD5', 'rgb' => '255, 239, 213'),
	// 	array('source_name' => 'Moccasin', 'russian_name' => '', 'hex' => '#FFE4B5', 'rgb' => '255, 228, 181'),
	// 	array('source_name' => 'PeachPuff', 'russian_name' => '', 'hex' => '#FFDAB9', 'rgb' => '255, 218, 185'),
	// 	array('source_name' => 'PaleGoldenrod', 'russian_name' => '', 'hex' => '#EEE8AA', 'rgb' => '238, 232, 170'),
	// 	array('source_name' => 'Khaki', 'russian_name' => '', 'hex' => '#F0E68C', 'rgb' => '240, 230, 140'),
	// 	array('source_name' => 'DarkKhaki', 'russian_name' => '', 'hex' => '#BDB76B', 'rgb' => '189, 183, 107')
	// );

	// $purple_colors = array(
	// 	// Purple
	// 	array('source_name' => 'Lavender', 'russian_name' => '', 'hex' => '#E6E6FA', 'rgb' => '230, 230, 250'),
	// 	array('source_name' => 'Thistle', 'russian_name' => '', 'hex' => '#D8BFD8', 'rgb' => '216, 191, 216'),
	// 	array('source_name' => 'Plum', 'russian_name' => '', 'hex' => '#DDA0DD', 'rgb' => '221, 160, 221'),
	// 	array('source_name' => 'Violet', 'russian_name' => '', 'hex' => '#EE82EE', 'rgb' => '238, 130, 238'),
	// 	array('source_name' => 'Orchid', 'russian_name' => '', 'hex' => '#DA70D6', 'rgb' => '218, 112, 214'),
	// 	array('source_name' => 'Fuchsia', 'russian_name' => '', 'hex' => '#FF00FF', 'rgb' => '255, 0, 255'),
	// 	array('source_name' => 'Magenta', 'russian_name' => '', 'hex' => '#FF00FF', 'rgb' => '255, 0, 255'),
	// 	array('source_name' => 'MediumOrchid', 'russian_name' => '', 'hex' => '#BA55D3', 'rgb' => '186, 85, 211'),
	// 	array('source_name' => 'MediumPurple', 'russian_name' => '', 'hex' => '#9370DB', 'rgb' => '147, 112, 219'),
	// 	array('source_name' => 'BlueViolet', 'russian_name' => '', 'hex' => '#8A2BE2', 'rgb' => '138, 43, 226'),
	// 	array('source_name' => 'DarkViolet', 'russian_name' => '', 'hex' => '#9400D3', 'rgb' => '148, 0, 211'),
	// 	array('source_name' => 'DarkOrchid', 'russian_name' => '', 'hex' => '#9932CC', 'rgb' => '153, 50, 204'),
	// 	array('source_name' => 'DarkMagenta', 'russian_name' => '', 'hex' => '#8B008B', 'rgb' => '139, 0, 139'),
	// 	array('source_name' => 'Purple', 'russian_name' => '', 'hex' => '#800080', 'rgb' => '128, 0, 128'),
	// 	array('source_name' => 'Indigo', 'russian_name' => '', 'hex' => '#4B0082', 'rgb' => '75, 0, 130'),
	// 	array('source_name' => 'SlateBlue', 'russian_name' => '', 'hex' => '#6A5ACD', 'rgb' => '106, 90, 205'),
	// 	array('source_name' => 'DarkSlateBlue', 'russian_name' => '', 'hex' => '#483D8B', 'rgb' => '72, 61, 139')
	// );

	// $brown_colors = array(
	// 	// Brown
	// 	array('source_name' => 'Cornsilk', 'russian_name' => '', 'hex' => '#FFF8DC', 'rgb' => '255, 248, 220'),
	// 	array('source_name' => 'BlanchedAlmond', 'russian_name' => '', 'hex' => '#FFEBCD', 'rgb' => '255, 235, 205'),
	// 	array('source_name' => 'Bisque', 'russian_name' => '', 'hex' => '#FFE4C4', 'rgb' => '255, 228, 196'),
	// 	array('source_name' => 'NavajoWhite', 'russian_name' => '', 'hex' => '#FFDEAD', 'rgb' => '255, 222, 173'),
	// 	array('source_name' => 'Wheat', 'russian_name' => '', 'hex' => '#F5DEB3', 'rgb' => '245, 222, 179'),
	// 	array('source_name' => 'BurlyWood', 'russian_name' => '', 'hex' => '#DEB887', 'rgb' => '222, 184, 135'),
	// 	array('source_name' => 'Tan', 'russian_name' => '', 'hex' => '#D2B48C', 'rgb' => '210, 180, 140'),
	// 	array('source_name' => 'RosyBrown', 'russian_name' => '', 'hex' => '#BC8F8F', 'rgb' => '188, 143, 143'),
	// 	array('source_name' => 'SandyBrown', 'russian_name' => '', 'hex' => '#F4A460', 'rgb' => '244, 164, 96'),
	// 	array('source_name' => 'Goldenrod', 'russian_name' => '', 'hex' => '#DAA520', 'rgb' => '218, 165, 32'),
	// 	array('source_name' => 'DarkGoldenRod', 'russian_name' => '', 'hex' => '#B8860B', 'rgb' => '184, 134, 11'),
	// 	array('source_name' => 'Peru', 'russian_name' => '', 'hex' => '#CD853F', 'rgb' => '205, 133, 63'),
	// 	array('source_name' => 'Chocolate', 'russian_name' => '', 'hex' => '#D2691E', 'rgb' => '210, 105, 30'),
	// 	array('source_name' => 'SaddleBrown', 'russian_name' => '', 'hex' => '#8B4513', 'rgb' => '139, 69, 19'),
	// 	array('source_name' => 'Sienna', 'russian_name' => '', 'hex' => '#A0522D', 'rgb' => '160, 82, 45'),
	// 	array('source_name' => 'Brown', 'russian_name' => '', 'hex' => '#A52A2A', 'rgb' => '165, 42, 42'),
	// 	array('source_name' => 'Maroon', 'russian_name' => '', 'hex' => '#800000', 'rgb' => '128, 0, 0')
	// );

	// $main_colors = array(
	// 	// Black & White
	// 	array('source_name' => 'Black', 'russian_name' => '', 'hex' => '#000000', 'rgb' => '0, 0, 0'),
	// 	array('source_name' => 'Gray', 'russian_name' => '', 'hex' => '#808080', 'rgb' => '128, 128, 128'),
	// 	array('source_name' => 'Silver', 'russian_name' => '', 'hex' => '#C0C0C0', 'rgb' => '192, 192, 192'),
	// 	array('source_name' => 'White', 'russian_name' => '', 'hex' => '#FFFFFF', 'rgb' => '255, 255, 255'),
	// 	array('source_name' => 'Fuchsia', 'russian_name' => '', 'hex' => '#FF00FF', 'rgb' => '255, 0, 255'),
	// 	array('source_name' => 'Purple', 'russian_name' => '', 'hex' => '#800080', 'rgb' => '128, 0, 128'),
	// 	array('source_name' => 'Red', 'russian_name' => '', 'hex' => '#FF0000', 'rgb' => '255, 0, 0'),
	// 	array('source_name' => 'Maroon', 'russian_name' => '', 'hex' => '#800000', 'rgb' => '128, 0, 0'),
	// 	array('source_name' => 'Yellow', 'russian_name' => '', 'hex' => '#FFFF00', 'rgb' => '255, 255, 0'),
	// 	array('source_name' => 'Olive', 'russian_name' => '', 'hex' => '#808000', 'rgb' => '128, 128, 0'),
	// 	array('source_name' => 'Lime', 'russian_name' => '', 'hex' => '#00FF00', 'rgb' => '0, 255, 0'),
	// 	array('source_name' => 'Green', 'russian_name' => '', 'hex' => '#008000', 'rgb' => '0, 128, 0'),
	// 	array('source_name' => 'Aqua', 'russian_name' => '', 'hex' => '#00FFFF', 'rgb' => '0, 255, 255'),
	// 	array('source_name' => 'Teal', 'russian_name' => '', 'hex' => '#008080', 'rgb' => '0, 128, 128'),
	// 	array('source_name' => 'Blue', 'russian_name' => '', 'hex' => '#0000FF', 'rgb' => '0, 0, 255'),
	// 	array('source_name' => 'Navy', 'russian_name' => '', 'hex' => '#000080', 'rgb' => '0, 0, 128')
	// );

	// $green_colors = array(
	// 	// Greens
	// 	array('source_name' => 'GreenYellow', 'russian_name' => '', 'hex' => '#ADFF2F', 'rgb' => '173, 255, 47'),
	// 	array('source_name' => 'Chartreuse', 'russian_name' => '', 'hex' => '#7FFF00', 'rgb' => '127, 255, 0'),
	// 	array('source_name' => 'LawnGreen', 'russian_name' => '', 'hex' => '#7CFC00', 'rgb' => '124, 252, 0'),
	// 	array('source_name' => 'Lime', 'russian_name' => '', 'hex' => '#00FF00', 'rgb' => '0, 255, 0'),
	// 	array('source_name' => 'LimeGreen', 'russian_name' => '', 'hex' => '#32CD32', 'rgb' => '50, 205, 50'),
	// 	array('source_name' => 'PaleGreen', 'russian_name' => '', 'hex' => '#98FB98', 'rgb' => '152, 251, 152'),
	// 	array('source_name' => 'LightGreen', 'russian_name' => '', 'hex' => '#90EE90', 'rgb' => '144, 238, 144'),
	// 	array('source_name' => 'MediumSpringGreen', 'russian_name' => '', 'hex' => '#00FA9A', 'rgb' => '0, 250, 154'),
	// 	array('source_name' => 'SpringGreen', 'russian_name' => '', 'hex' => '#00FF7F', 'rgb' => '0, 255, 127'),
	// 	array('source_name' => 'MediumSeaGreen', 'russian_name' => '', 'hex' => '#3CB371', 'rgb' => '60, 179, 113'),
	// 	array('source_name' => 'SeaGreen', 'russian_name' => '', 'hex' => '#2E8B57', 'rgb' => '46, 139, 87'),
	// 	array('source_name' => 'ForestGreen', 'russian_name' => '', 'hex' => '#228B22', 'rgb' => '34, 139, 34'),
	// 	array('source_name' => 'Green', 'russian_name' => '', 'hex' => '#008000', 'rgb' => '0, 128, 0'),
	// 	array('source_name' => 'DarkGreen', 'russian_name' => '', 'hex' => '#006400', 'rgb' => '0, 100, 0'),
	// 	array('source_name' => 'YellowGreen', 'russian_name' => '', 'hex' => '#9ACD32', 'rgb' => '154, 205, 50'),
	// 	array('source_name' => 'OliveDrab', 'russian_name' => '', 'hex' => '#6B8E23', 'rgb' => '107, 142, 35'),
	// 	array('source_name' => 'Olive', 'russian_name' => '', 'hex' => '#808000', 'rgb' => '128, 128, 0'),
	// 	array('source_name' => 'DarkOliveGreen', 'russian_name' => '', 'hex' => '#556B2F', 'rgb' => '85, 107, 47'),
	// 	array('source_name' => 'MediumAquamarine', 'russian_name' => '', 'hex' => '#66CDAA', 'rgb' => '102, 205, 170'),
	// 	array('source_name' => 'DarkSeaGreen', 'russian_name' => '', 'hex' => '#8FBC8F', 'rgb' => '143, 188, 143'),
	// 	array('source_name' => 'LightSeaGreen', 'russian_name' => '', 'hex' => '#20B2AA', 'rgb' => '32, 178, 170'),
	// 	array('source_name' => 'DarkCyan', 'russian_name' => '', 'hex' => '#008B8B', 'rgb' => '0, 139, 139'),
	// 	array('source_name' => 'Teal', 'russian_name' => '', 'hex' => '#008080', 'rgb' => '0, 128, 128')
	// );

	// $blue_colors = array(
	// 	// Blues
	// 	array('source_name' => 'Aqua', 'russian_name' => '', 'hex' => '#00FFFF', 'rgb' => '0, 255, 255'),
	// 	array('source_name' => 'Cyan', 'russian_name' => '', 'hex' => '#00FFFF', 'rgb' => '0, 255, 255'),
	// 	array('source_name' => 'LightCyan', 'russian_name' => '', 'hex' => '#E0FFFF', 'rgb' => '224, 255, 255'),
	// 	array('source_name' => 'PaleTurquoise', 'russian_name' => '', 'hex' => '#AFEEEE', 'rgb' => '175, 238, 238'),
	// 	array('source_name' => 'Aquamarine', 'russian_name' => '', 'hex' => '#7FFFD4', 'rgb' => '127, 255, 212'),
	// 	array('source_name' => 'Turquoise', 'russian_name' => '', 'hex' => '#40E0D0', 'rgb' => '64, 224, 208'),
	// 	array('source_name' => 'MediumTurquoise', 'russian_name' => '', 'hex' => '#48D1CC', 'rgb' => '72, 209, 204'),
	// 	array('source_name' => 'DarkTurquoise', 'russian_name' => '', 'hex' => '#00CED1', 'rgb' => '0, 206, 209'),
	// 	array('source_name' => 'CadetBlue', 'russian_name' => '', 'hex' => '#5F9EA0', 'rgb' => '95, 158, 160'),
	// 	array('source_name' => 'SteelBlue', 'russian_name' => '', 'hex' => '#4682B4', 'rgb' => '70, 130, 180'),
	// 	array('source_name' => 'LightSteelBlue', 'russian_name' => '', 'hex' => '#B0C4DE', 'rgb' => '176, 196, 222'),
	// 	array('source_name' => 'PowderBlue', 'russian_name' => '', 'hex' => '#B0E0E6', 'rgb' => '176, 224, 230'),
	// 	array('source_name' => 'LightBlue', 'russian_name' => '', 'hex' => '#ADD8E6', 'rgb' => '173, 216, 230'),
	// 	array('source_name' => 'SkyBlue', 'russian_name' => '', 'hex' => '#87CEEB', 'rgb' => '135, 206, 235'),
	// 	array('source_name' => 'LightSkyBlue', 'russian_name' => '', 'hex' => '#87CEFA', 'rgb' => '135, 206, 250'),
	// 	array('source_name' => 'DeepSkyBlue', 'russian_name' => '', 'hex' => '#00BFFF', 'rgb' => '0, 191, 255'),
	// 	array('source_name' => 'DodgerBlue', 'russian_name' => '', 'hex' => '#1E90FF', 'rgb' => '30, 144, 255'),
	// 	array('source_name' => 'CornflowerBlue', 'russian_name' => '', 'hex' => '#6495ED', 'rgb' => '100, 149, 237'),
	// 	array('source_name' => 'MediumSlateBlue', 'russian_name' => '', 'hex' => '#7B68EE', 'rgb' => '123, 104, 238'),
	// 	array('source_name' => 'RoyalBlue', 'russian_name' => '', 'hex' => '#4169E1', 'rgb' => '65, 105, 225'),
	// 	array('source_name' => 'Blue', 'russian_name' => '', 'hex' => '#0000FF', 'rgb' => '0, 0, 255'),
	// 	array('source_name' => 'MediumBlue', 'russian_name' => '', 'hex' => '#0000CD', 'rgb' => '0, 0, 205'),
	// 	array('source_name' => 'DarkBlue', 'russian_name' => '', 'hex' => '#00008B', 'rgb' => '0, 0, 139'),
	// 	array('source_name' => 'Navy', 'russian_name' => '', 'hex' => '#000080', 'rgb' => '0, 0, 128'),
	// 	array('source_name' => 'MidnightBlue', 'russian_name' => '', 'hex' => '#191970', 'rgb' => '25, 25, 112')
	// );

	// $white_colors = array(
	// 	// Whites
	// 	array('source_name' => 'White', 'russian_name' => '', 'hex' => '#FFFFFF', 'rgb' => '255, 255, 255'),
	// 	array('source_name' => 'Snow', 'russian_name' => '', 'hex' => '#FFFAFA', 'rgb' => '255, 250, 250'),
	// 	array('source_name' => 'Honeydew', 'russian_name' => '', 'hex' => '#F0FFF0', 'rgb' => '240, 255, 240'),
	// 	array('source_name' => 'MintCream', 'russian_name' => '', 'hex' => '#F5FFFA', 'rgb' => '245, 255, 250'),
	// 	array('source_name' => 'Azure', 'russian_name' => '', 'hex' => '#F0FFFF', 'rgb' => '240, 255, 255'),
	// 	array('source_name' => 'AliceBlue', 'russian_name' => '', 'hex' => '#F0F8FF', 'rgb' => '240, 248, 255'),
	// 	array('source_name' => 'GhostWhite', 'russian_name' => '', 'hex' => '#F8F8FF', 'rgb' => '248, 248, 255'),
	// 	array('source_name' => 'WhiteSmoke', 'russian_name' => '', 'hex' => '#F5F5F5', 'rgb' => '245, 245, 245'),
	// 	array('source_name' => 'Seashell', 'russian_name' => '', 'hex' => '#FFF5EE', 'rgb' => '255, 245, 238'),
	// 	array('source_name' => 'Beige', 'russian_name' => '', 'hex' => '#F5F5DC', 'rgb' => '245, 245, 220'),
	// 	array('source_name' => 'OldLace', 'russian_name' => '', 'hex' => '#FDF5E6', 'rgb' => '253, 245, 230'),
	// 	array('source_name' => 'FloralWhite', 'russian_name' => '', 'hex' => '#FFFAF0', 'rgb' => '255, 250, 240'),
	// 	array('source_name' => 'Ivory', 'russian_name' => '', 'hex' => '#FFFFF0', 'rgb' => '255, 255, 240'),
	// 	array('source_name' => 'AntiqueWhite', 'russian_name' => '', 'hex' => '#FAEBD7', 'rgb' => '250, 235, 215'),
	// 	array('source_name' => 'Linen', 'russian_name' => '', 'hex' => '#FAF0E6', 'rgb' => '250, 240, 230'),
	// 	array('source_name' => 'LavenderBlush', 'russian_name' => '', 'hex' => '#FFF0F5', 'rgb' => '255, 240, 245'),
	// 	array('source_name' => 'MistyRose', 'russian_name' => '', 'hex' => '#FFE4E1', 'rgb' => '255, 228, 225'),
	// );

	// $gray_colors = array(
	// 	// Grays
	// 	array('source_name' => 'Gainsboro', 'russian_name' => '', 'hex' => '#DCDCDC', 'rgb' => '220, 220, 220'),
	// 	array('source_name' => 'LightGrey', 'russian_name' => '', 'hex' => '#D3D3D3', 'rgb' => '211, 211, 211'),
	// 	array('source_name' => 'Silver', 'russian_name' => '', 'hex' => '#C0C0C0', 'rgb' => '192, 192, 192'),
	// 	array('source_name' => 'DarkGray', 'russian_name' => '', 'hex' => '#A9A9A9', 'rgb' => '169, 169, 169'),
	// 	array('source_name' => 'Gray', 'russian_name' => '', 'hex' => '#808080', 'rgb' => '128, 128, 128'),
	// 	array('source_name' => 'DimGray', 'russian_name' => '', 'hex' => '#696969', 'rgb' => '105, 105, 105'),
	// 	array('source_name' => 'LightSlateGray', 'russian_name' => '', 'hex' => '#778899', 'rgb' => '119, 136, 153'),
	// 	array('source_name' => 'SlateGray', 'russian_name' => '', 'hex' => '#708090', 'rgb' => '112, 128, 144'),
	// 	array('source_name' => 'DarkSlateGray', 'russian_name' => '', 'hex' => '#2F4F4F', 'rgb' => '47, 79, 79'),
	// 	array('source_name' => 'Black', 'russian_name' => '', 'hex' => '#000000', 'rgb' => '0, 0, 0')
	// );

	// $colors = array(
	// 	$main_colors, $red_colors, $pink_colors, $orange_colors, $yellow_colors, $purple_colors, $brown_colors, $green_colors, $blue_colors, $white_colors, $gray_colors
	// );

	// include ('main190920.html');
	// include ('index.html');
	include ('out.html');