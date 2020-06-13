let languagesHTML = '';
const langList = [
    {
        code: '',
        name: 'Русский'
    },
    {
        code: 'en',
        name: 'English'
    },
    {
        code: 'de',
        name: 'German'
    },
    {
        code: 'es',
        name: 'Español'
    },
    {
        code: 'hi',
        name: 'हिंदी'
    },
    {
        code: 'fr',
        name: 'Français'
    },
    {
        code: 'eo',
        name: 'Esperanto'
    },
    {
        code: 'sw',
        name: 'Kiswahili'
    }
];
const languagesMeta = langList.map(lang => `<link rel="alternate" href="https://csscolor.ru${lang.code === 'ru' ? '' : '/' + lang.code}" hreflang="${lang.code}">`).join('');
languagesHTML = langList.map(lang => `<a href="https://csscolor.ru/${lang.code}" class="content">${lang.name}</a>`).join('');

const exampleTextes = ['Лень <b>делает</b> всякое дело трудным.',
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
];
const exampleText = exampleTextes[Math.ceil(Math.random() * exampleTextes.length)];

let dataSets = {
    test: {
        lang: 'ru',
        title: 'HTML CSS Палитра цветов',
        applicationName: 'app name',
        descriptionArticle: 'HTML CSS Палитра цветов в HEX, RGB, HSV и CMYK',
        seoKeywords: 'палитра css, цвета css, палитра html, css html цвета, html цвета палитра, палитра цветов',
        previewImage: '',
        googleAnalytics: '',
        googleTagManager: '',
        donateButtonLabel: 'Поддержать',
        exampleText,
        languagesHTML,
        yandexAd: `<div style="width: 100%; height: 90px; background: #9191912c"></div>`,
        descriptionArticle: `<p>
                <b>HTML CSS Палитра цветов</b> помогает подобрать <b>цвет</b> в виде <b>HEX, RGB, RGBA, HSV и CMYK</b> записи цветовой модели. Нажимайте на поля выбора цвета, а для более точного выбора, перемещайте курсор с зажатой левой кнопкой мыши. Изменяйте параметры цвета через поля ввода.
            </p>
            <p>
                А ещё можно скачать выбранный цвет. Нажмите на кнопку <b>"Скачать цвет"</b>, появится поле параметров. Вы можете выбрать формат (SVG, PNG, JPEG или GIF) и размер картинки. Обращаю ваше внимание, что полупрозрачные цвета можно скачать только в форматах SVG и PNG.
            </p>
            <p>
                В качестве экперимента разместили небольшую статью про flexbox: <a href="https://csscolor.ru/flexbox" class="content">https://csscolor.ru/flexbox</a>
            </p>`,
        commentsWidget: '',
        year: (new Date()).getFullYear(),
        authorName: 'Александр Волков',
        cancel: 'Отмена',
        donateLabel: 'Поддержите нас. Это важно',
        donateBox: `<iframe src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0%20%D0%BF%D0%B0%D0%BB%D0%B8%D1%82%D1%80%D1%8B&targets-hint=&default-sum=100&button-text=13&hint=&successURL=&quickpay=shop&account=410013246801384" width="423" height="222" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
    <div style="text-align: right">
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="HRPUL3XJYGQ98" />
            <input type="image" src="https://www.paypalobjects.com/ru_RU/RU/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Кнопка «Пожертвовать через PayPal»" />
            <img alt="" border="0" src="https://www.paypal.com/ru_RU/i/scr/pixel.gif" width="1" height="1" />
        </form>
    </div>`,
        yandexMetrica: '',
        alphaBank: `<h1>Как поддержать CSSCOLOR.RU бесплатно?</h1>
        <p>
            Альфа-банк запустил <a href="https://alfabank.ru/lp/retail/friends/" target="_blink">рекламную компанию</a>, согласно которой можно получить <b>500 ₽</b>, если зарегистрировать бесплатную дебетовую карту по личной ссылке и совершить с неё первую покупку. Деньги получает и заказчик карты (вы), и держатель ссылки (проект).
        </p>
        <p>
            Личная ссылка автора <b>CSSCOLOR.RU</b>: <a href="https://alfabank.ru/fr/?refid=d_NYI4YQ" target="_blink">https://alfabank.ru/fr/?refid=d_NYI4YQ</a>.
        </p>
        <div class="quotation">
            <div class="text">
                <p>
                    CSSCOLOR.RU существует исключительно за счёт рекламного баннера и моих личных средств. Меня заботит функциональность и эстетика продуктов, которые я создаю, поэтому сайт до сих пор не покрыт рекламой вдоль и поперёк.
                </p>
                <p>
                    Если для вас важно сохранение и развитие проекта, то сегодня вы имеете возможность помочь проекту бесплатно, либо сделав <a href="javascript:void(0)" id="donate-link">пожертвование</a>.
                </p>
                <div class="grey-arrow">
                    <div class="white-circle"></div>
                </div>
            </div>
            <div class="avatar"></div>
        </div>
        <div class="quotation-author">
            Автор CSSCOLOR.RU, <a href="https://www.instagram.com/avo1kov/" target="_blink">Александр Волков</a>
        </div>`,
        gitlab: '<p>Исходный код <b>CSSCOLOR.RU</b> открыт. Ссылка на репозиторий: <a href="https://gitlab.com/avo1kov/csscolor" target="_blink">https://gitlab.com/avo1kov/csscolor</a></p>'
    }
}
dataSets.php = {
    lang: `<?php echo $labels['lang']; ?>`,
    title: `<?php echo $labels['title']; ?>`,
    applicationName: `<?php echo $labels['title']; ?>`,
    descriptionArticle: `<?php echo $labels['seo-description']; ?>`,
    seoKeywords: `<?php echo $labels['seo-keywords']; ?>`,
    previewImage: `<?php echo $preview_image; ?>`,
    googleAnalytics: `<!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-N7Q2VTH');</script>
    <!-- End Google Tag Manager -->
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-83097307-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-83097307-1');
    </script>`,
    googleTagManager: `<!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N7Q2VTH" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`,
    donateButtonLabel: `<?php echo $labels['donate']; ?>`,
    exampleText: `<?php echo $labels['text-example']; ?>`,
    languagesHTML,
    yandexAd: `<!-- Yandex.RTB R-A-335771-2 -->
    <div id="yandex_rtb_R-A-335771-2"></div>
    <script type="text/javascript">
        (function(w, d, n, s, t) {
            w[n] = w[n] || [];
            w[n].push(function() {
                Ya.Context.AdvManager.render({
                    blockId: "R-A-335771-2",
                    renderTo: "yandex_rtb_R-A-335771-2",
                    async: true
                });
            });
            t = d.getElementsByTagName("script")[0];
            s = d.createElement("script");
            s.type = "text/javascript";
            s.src = "//an.yandex.ru/system/context.js";
            s.async = true;
            t.parentNode.insertBefore(s, t);
        })(this, this.document, "yandexContextAsyncCallbacks");
    </script>`,
    descriptionArticle: `<?php echo $labels['description']; ?>`,
    commentsWidget: `<?php echo $labels['media']; ?>`,
    year: `<?php echo date('Y'); ?>`,
    authorName: `<?php echo $labels['author_name']; ?>`,
    cancel: `<?php echo $labels['cancel']; ?>`,
    donateLabel: `<?php echo $labels['goal']; ?>`,
    donateBox: `<?php echo $labels['donate_box']; ?>`,
    yandexMetrica: `<!-- Yandex.Metrika counter -->
    <script type="text/javascript" >
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(27027039, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
        });
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/27027039" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->`
}
dataSets.productionPresets = {
    previewImage: `<?php echo $preview_image; ?>`, // WARN,
    securePreviewImage: `<?php echo $secure_preview_image; ?>`,
    url: `<?php echo $url; ?>`,
    exampleText: `<?php echo $helloText; ?>`, // WARN
    year: `<?php echo date('Y'); ?>`,
    languagesMeta,
    languagesHTML,
    twitterTitle: '<?php echo $twitter_title ?>',
    twitterDescription: 'HTML CSS Палитра цветов',
    googleAnalytics: `<!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-N7Q2VTH');</script>
    <!-- End Google Tag Manager -->
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-83097307-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-83097307-1');
    </script>`,
    googleTagManager: `<!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N7Q2VTH" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`,
    googleAdsense: `<script data-ad-client="ca-pub-6348125197752812" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>`,
    yandexMetrica: `<!-- Yandex.Metrika counter -->
    <script type="text/javascript" >
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(27027039, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
        });
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/27027039" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->`,
    yandexAd: `<!-- Yandex.RTB R-A-335771-2 -->
    <div id="yandex_rtb_R-A-335771-2"></div>
    <script type="text/javascript">
        (function(w, d, n, s, t) {
            w[n] = w[n] || [];
            w[n].push(function() {
                Ya.Context.AdvManager.render({
                    blockId: "R-A-335771-2",
                    renderTo: "yandex_rtb_R-A-335771-2",
                    async: true
                });
            });
            t = d.getElementsByTagName("script")[0];
            s = d.createElement("script");
            s.type = "text/javascript";
            s.src = "//an.yandex.ru/system/context.js";
            s.async = true;
            t.parentNode.insertBefore(s, t);
        })(this, this.document, "yandexContextAsyncCallbacks");
    </script>`,
    commentsWidget: '<script async src="https://comments.app/js/widget.js?2" data-comments-app-website="X4A89j26" data-limit="5" data-page-id="1" data-dislikes="1"></script>',
    donateBox: `<iframe src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0%20%D0%BF%D0%B0%D0%BB%D0%B8%D1%82%D1%80%D1%8B&targets-hint=&default-sum=100&button-text=13&hint=&successURL=&quickpay=shop&account=410013246801384" width="423" height="222" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
    <div style="text-align: right">
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="HRPUL3XJYGQ98" />
            <input type="image" src="https://www.paypalobjects.com/ru_RU/RU/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Кнопка «Пожертвовать через PayPal»" />
            <img alt="" border="0" src="https://www.paypal.com/ru_RU/i/scr/pixel.gif" width="1" height="1" />
        </form>
    </div>`,
    alphaBank: `<h1>Как поддержать CSSCOLOR.RU бесплатно?</h1>
        <p>
            Альфа-банк запустил <a href="https://alfabank.ru/lp/retail/friends/" target="_blink">рекламную компанию</a>, согласно которой можно получить <b>500 ₽</b>, если зарегистрировать бесплатную дебетовую карту по личной ссылке и совершить с неё первую покупку. Деньги получает и заказчик карты (вы), и держатель ссылки (проект).
        </p>
        <p>
            Личная ссылка автора <b>CSSCOLOR.RU</b>: <a href="https://alfabank.ru/fr/?refid=d_NYI4YQ" target="_blink">https://alfabank.ru/fr/?refid=d_NYI4YQ</a>.
        </p>
        <div class="quotation">
            <div class="text">
                <p>
                    CSSCOLOR.RU существует исключительно за счёт рекламного баннера и моих личных средств. Меня заботит функциональность и эстетика продуктов, которые я создаю, поэтому сайт до сих пор не покрыт рекламой вдоль и поперёк.
                </p>
                <p>
                    Если для вас важно сохранение и развитие проекта, то сегодня вы имеете возможность помочь проекту бесплатно, либо сделав <a href="javascript:void(0)" id="donate-link">пожертвование</a>.
                </p>
                <div class="grey-arrow">
                    <div class="white-circle"></div>
                </div>
            </div>
            <div class="avatar"></div>
        </div>
        <div class="quotation-author">
            Автор CSSCOLOR.RU, <a href="https://www.instagram.com/avo1kov/" target="_blink">Александр Волков</a>
        </div>`
}
dataSets.productionWesternPresets = {
    authorName: 'Alexander Volkov',
    yandexAd: '',
    donateBox: `<iframe src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0%20%D0%BF%D0%B0%D0%BB%D0%B8%D1%82%D1%80%D1%8B&targets-hint=&default-sum=100&button-text=13&hint=&successURL=&quickpay=shop&account=410013246801384" width="423" height="222" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
    <div style="text-align: right">
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="HRPUL3XJYGQ98" />
            <input type="image" src="https://www.paypalobjects.com/ru_RU/RU/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Кнопка «Пожертвовать через PayPal»" />
            <img alt="" border="0" src="https://www.paypal.com/ru_RU/i/scr/pixel.gif" width="1" height="1" />
        </form>
    </div>`,
    alphaBank: ``
}
dataSets.langs = [
    {
        langCode: 'ru',
        ...dataSets.productionPresets,
        title: 'HTML CSS Палитра цветов',
        twitterDescription: 'HTML CSS Палитра цветов',
        applicationName: 'HTML CSS Палитра цветов',
        descriptionArticle: 'HTML CSS Палитра цветов в HEX, RGB, HSV и CMYK',
        seoKeywords: 'палитра css, цвета css, палитра html, css html цвета, html цвета палитра, палитра цветов',
        donateButtonLabel: 'Поддержать',
        descriptionArticle: `<p>
        <b>HTML CSS Палитра цветов</b> помогает подобрать <b>цвет</b> в виде <b>HEX, RGB, RGBA, HSV и CMYK</b> записи цветовой модели. Нажимайте на поля выбора цвета, а для более точного выбора, перемещайте курсор с зажатой левой кнопкой мыши. Изменяйте параметры цвета через поля ввода.
    </p>
    <p>
        А ещё можно скачать выбранный цвет. Нажмите на кнопку <b>"Скачать цвет"</b>, появится поле параметров. Вы можете выбрать формат (SVG, PNG, JPEG или GIF) и размер картинки. Обращаю ваше внимание, что полупрозрачные цвета можно скачать только в форматах SVG и PNG.
    </p>
    <p>
        В качестве экперимента разместили небольшую статью про flexbox: <a href="https://csscolor.ru/flexbox" class="content">https://csscolor.ru/flexbox</a>
    </p>`,
        authorName: 'Александр Волков',
        cancel: 'Отмена',
        donateLabel: 'Поддержите нас. Это важно',
        gitlab: '<p>Исходный код <b>CSSCOLOR.RU</b> открыт. Ссылка на репозиторий: <a href="https://gitlab.com/avo1kov/csscolor" target="_blink">https://gitlab.com/avo1kov/csscolor</a></p>'
    },
    {
        langCode: 'en',
        ...dataSets.productionPresets,
        ...dataSets.productionWesternPresets,
        title: 'HTML CSS Color picker',
        twitterDescription: 'HTML CSS Color picker',
        applicationName: 'HTML CSS Color picker',
        descriptionArticle: 'Color picker for you! Works with HSV, RGB, HEX, CMYK and transparent. You can download selected color as SVG, PNG, JPEG and GIF picture. This is a nice picker!',
        seoKeywords: 'color picker, colour picker, palette css, colors css, colours css, palette html, css html colors, css html colours, html color palette, html colour palette, color palette, colour palette',
        descriptionArticle: `<p>
        <b>Color picker</b> helps you pick a <b>color</b> in HEX, RGB, RGBA, CMYK and HSV color model record. Click on the field of color selection, and for a more precise selection, move the cursor while holding the left mouse button. Change the color settings via input fields.
    <p>
        Also, you can <b>download the color</b> selected. Click on the button "Download color", that will appear at the settings box. You can choose the format (SVG, PNG, JPEG or GIF), and image size. Please note that the semi-permanent color can only be downloaded in SVG and PNG format.
    </p>
    <p>
        Your comment would be nice :)
    </p>`,
        cancel: 'Cancel',
        donateLabel: 'Please feel free to make a donation',
        gitlab: `<p><b>CSSCOLOR.RU</b> is open-source project. Link to repository: <a href="https://gitlab.com/avo1kov/csscolor" target="_blink">https://gitlab.com/avo1kov/csscolor</a></p>`
    },
    {
        langCode: 'de',
        ...dataSets.productionPresets,
        ...dataSets.productionWesternPresets,
        title: 'Farbwähler',
        twitterDescription: 'Farbwähler',
        applicationName: 'Farbwähler',
        descriptionArticle: 'Farbauswahl für Sie! Funktioniert mit HSV, RGB, HEX, CMYK und transparent. Sie können die ausgewählte Farbe als SVG-, PNG-, JPEG- und GIF-Bild herunterladen. Das ist eine schöne Auswahl!',
        descriptionArticle: `<p>
        <b>Mit der Farbauswahl</b> können Sie eine <b>Farbe</b> in der HEX-, RGB-, RGBA-, HSV- und CMYK-Farbmodellaufzeichnung auswählen. Klicken Sie auf das Feld für die Farbauswahl. Um eine genauere Auswahl zu treffen, bewegen Sie den Cursor bei gedrückter linker Maustaste. Ändern Sie die Farbeinstellungen über Eingabefelder.
    </p>
    <p>
        Sie können auch <b>die ausgewählte Farbe herunterladen</b>. Klicken Sie auf die Schaltfläche "Farbe herunterladen", die im Einstellungsfeld angezeigt wird. Sie können das Format (SVG, PNG, JPEG oder GIF) und die Bildgröße auswählen. Bitte beachten Sie, dass die semi-permanente Farbe nur im SVG- und PNG-Format heruntergeladen werden kann.
    </p>
    <p>
        Dein Kommentar wäre nett :)
    </p>`,
        cancel: 'Stornieren',
        donateLabel: 'Bitte Spenden',
        gitlab: `<p><b>CSSCOLOR.RU</b> ist ein Open-Source-Projekt. Link zum Repository: <a href="https://gitlab.com/avo1kov/csscolor" target="_blink">https://gitlab.com/avo1kov/csscolor</a></p>`
    },
    {
        langCode: 'es',
        ...dataSets.productionPresets,
        ...dataSets.productionWesternPresets,
        title: 'HTML CSS Selector de colores',
        twitterDescription: 'HTML CSS Selector de colores',
        applicationName: 'HTML CSS Selector de colores',
        descriptionArticle: 'HTML CSS Selector de color para desarrollador. Funciona con HSV, RGB, CMYK y HEX.',
        seoKeywords: 'selector de color, paleta css, colores css, colores html, css html colores, paleta de colores html, paleta de color',
        descriptionArticle: `<p>
        <b>HTML CSS Selector de colores</b> le ayuda a elegir un <b>color</b> en el registro de color HEX, RGB, RGBA, CMYK y HSV. Haga clic en el campo de selección de colores y, para una selección más precisa, mueva el cursor mientras mantiene pulsado el botón izquierdo del ratón. Cambie la configuración del color a través de los campos de entrada.
    </p>
    <p>
        Además, puede <b>descargar el color</b> seleccionado. Haga clic en el botón "Descargar color", que aparecerá en el cuadro de configuración. Puede elegir el formato (SVG, PNG, JPEG o GIF) y el tamaño de la imagen. Tenga en cuenta que el color semipermanente sólo se puede descargar en formato SVG y PNG.
    </p>
    <p>
        Su comentario sería bueno :)
    </p>`,
        cancel: 'Cancelar',
        donateLabel: 'Por favor haga una donación',
        gitlab: `<p><b>CSSCOLOR.RU</b> es un proyecto de código abierto. Enlace al repositorio: <a href="https://gitlab.com/avo1kov/csscolor" target="_blink">https://gitlab.com/avo1kov/csscolor</a></p>`
    },
    {
        langCode: 'hi',
        ...dataSets.productionPresets,
        ...dataSets.productionWesternPresets,
        title: 'रंग चयनकर्ता',
        twitterDescription: 'रंग चयनकर्ता',
        applicationName: 'रंग चयनकर्ता',
        descriptionArticle: 'आप के लिए रंग बीनने! एचएसवी, आरजीबी, एचईएक्स और पारदर्शी के साथ काम करता है। आप चयनित रंग को SVG, PNG, JPG और GIF चित्र के रूप में डाउनलोड कर सकते हैं। यह अच्छा पिकर है!',
        seoKeywords: 'रंग बीनने, रंग बीनने, पैलेट सीएसएस, रंग सीएसएस, रंग सीएसएस, पैलेट html, सीएसएस html रंग, सीएसएस html रंग, HTML रंग पैलेट, HTML रंग पैलेट, रंग पैलेट, रंग पैलेट',
        descriptionArticle: `<p>
        <b>कलर</b> पिकर आपको HEX, RGB, RGBA, CMYK और HSV कलर मॉडल रिकॉर्ड में रंग चुनने में मदद करता है। रंग चयन के क्षेत्र पर क्लिक करें, और अधिक सटीक चयन के लिए, बाईं माउस बटन को पकड़े हुए कर्सर को घुमाएं। इनपुट फ़ील्ड के माध्यम से रंग सेटिंग्स बदलें।
    </p>
    <p>
        इसके अलावा, आप <b>रंग डाउनलोड कर सकते हैं</b> चयनित। "रंग डाउनलोड करें" बटन पर क्लिक करें, जो सेटिंग बॉक्स में दिखाई देगा। आप प्रारूप (SVG, PNG, JPEG या GIF), और छवि का आकार चुन सकते हैं। कृपया ध्यान दें कि अर्ध-स्थायी रंग केवल एसवीजी और पीएनजी प्रारूप में डाउनलोड किया जा सकता है।
    </p>
    <p>
        आपकी टिप्पणी अच्छी होगी :)
    </p>`,
        cancel: 'रद्द करना',
        donateLabel: 'कृपया एक दान करें',
        gitlab: `<p><b>CSSCOLOR.RU</b> ओपन-सोर्स प्रोजेक्ट है। रिपोजिटरी से लिंक: <a href="https://gitlab.com/avo1kov/csscolor" target="_blink">https://gitlab.com/avo1kov/csscolor</a></p>`
    },
    {
        langCode: 'fr',
        ...dataSets.productionPresets,
        ...dataSets.productionWesternPresets,
        title: 'HTML CSS Sélecteur de couleurs',
        twitterDescription: 'HTML CSS Sélecteur de couleurs',
        applicationName: 'HTML CSS Sélecteur de couleurs',
        descriptionArticle: 'HTML CSS Sélecteur de couleurs pour le développeur. Fonctionne avec HSV, RGB, CMYK et HEX.',
        seoKeywords: 'couleur css, couleur css, couleurs css, couleurs css, palette html, css couleurs html, css couleurs html, html palette de couleurs, html palette de couleurs, palette de couleurs, palette de couleurs',
        descriptionArticle: `<p>
        <b>Sélecteur de couleurs HTML CSS</b> vous aide à choisir une <b>couleur</b> dans l\'enregistrement de modèle de couleur HEX, RGB, RGBA, HSV et CMYK. Cliquez sur le champ de sélection des couleurs, et pour une sélection plus précise, déplacez le curseur tout en maintenant le bouton gauche de la souris enfoncé. Modifiez les paramètres de couleur via les champs de saisie.
    </p>
    <p>
        Vous pouvez également <b>télécharger la couleur</b> sélectionnée. Cliquez sur le bouton "Télécharger la couleur", qui apparaîtra à la boîte de paramètres. Vous pouvez choisir le format (SVG, PNG, JPEG ou GIF) et la taille de l\'image. Veuillez noter que la couleur semi-permanente ne peut être téléchargée qu\'en format SVG et PNG.
    </p>
    <p>
        Votre commentaire serait bien :)
    </p>`,
        cancel: 'Annuler',
        donateLabel: 'Merci de faire un don',
        gitlab: `<p><b>CSSCOLOR.RU</b> est un projet open-source. Lien vers le référentiel: <a href="https://gitlab.com/avo1kov/csscolor" target="_blink">https://gitlab.com/avo1kov/csscolor</a></p>`
    },
    {
        langCode: 'eo',
        ...dataSets.productionPresets,
        ...dataSets.productionWesternPresets,
        title: 'Koloro picker',
        twitterDescription: 'Koloro picker',
        applicationName: 'Koloro picker',
        descriptionArticle: 'Koloro picker por vi!',
        seoKeywords: 'koloro picker, koloro picker, paletro, css, koloroj, css koloroj css, paletro, html, css, html koloroj, css, html koloroj, html paletro, html paletro, koloro paletro, koloro paletro',
        descriptionArticle: `<p>
        <b>Koloro picker</b> helpas vin elekti <b>koloron</b> en HEX, RGB, RGBA, CMYK kaj HSV koloro modelo rekordo. Klaku sur la kampo de koloro selektado, kaj por pli preciza elekto, movu la kursoron dum tenante la maldekstra musbutono. Ŝanĝi la koloro agordojn per enigo kampoj.
    </p>
    <p>
        Ankaŭ, vi povas <b>savi la koloro</b> elektita. Klaku sur la butonon "Savi koloro", kiu aperos en la skatolo agordojn. Vi povas elekti la formato (SVG, PNG, JPEG aŭ GIF), kaj bildo-grandeco. Bonvolu noti, ke la semi-permanenta koloro povas nur esti elŝutita en SVG kaj PNG formato.
    </p>
    <p>
        Via komento estus bela :)
    </p>`,
        cancel: 'Nuligi',
        donateLabel: 'Bonvolu fari donacon',
        gitlab: `<p><b>CSSCOLOR.RU</b> estas malfermfonda projekto. Ligilo al deponejo: <a href="https://gitlab.com/avo1kov/csscolor" target="_blink">https://gitlab.com/avo1kov/csscolor</a></p>`
    },
    {
        langCode: 'sw',
        ...dataSets.productionPresets,
        ...dataSets.productionWesternPresets,
        title: 'Chombo cha rangi ya wavuti',
        twitterDescription: 'Chombo cha rangi ya wavuti',
        applicationName: 'Chombo cha rangi ya wavuti',
        descriptionArticle: 'Mchoraji wa rangi kwako! Inafanya kazi na HSV, RGB, HEX, CMYK na uwazi. Unaweza kupakua rangi iliyochaguliwa kama SVG, PNG, JPEG na picha ya GIF. Huyu ni kachumbari mzuri!',
        seoKeywords: 'rangi ya kuchagua, rangi ya kuchagua, pausi css, rangi ya CSS, rangi ya CSS, rangi ya html, rangi ya css html, rangi ya css html, rangi ya html rangi, rangi ya html',
        descriptionArticle: `<p>
        Chombo cha rangi husaidia kuchagua rangi katika HEX, RGB, RGBA, HSV, CMYK na rekodi ya mfano wa rangi. Bonyeza kwenye uwanja wa chaguo la rangi, na kwa uteuzi sahihi zaidi, uhamishe mshale wakati unashikilia kitufe cha kushoto cha panya. Badilisha mipangilio ya rangi kupitia sehemu za pembejeo.
    </p>
    <p>
        Pia, unaweza <b> kupakua rangi </b> iliyochaguliwa. Bonyeza kifungo "Pakua rangi", ambayo itaonekana kwenye sanduku la mipangilio. Unaweza kuchagua fomati (SVG, PNG, JPEG au GIF), na saizi ya picha. Tafadhali kumbuka kuwa rangi isiyo na kipimo inaweza kupakuliwa tu katika muundo wa SVG na PNG.
    </p>
    <p>
        Maoni yako itakuwa nzuri :)
    </p>`,
        cancel: 'Ghairi',
        donateLabel: 'Tafadhali jisikie huru kutoa mchango',
        gitlab: `<p><b>CSSCOLOR.RU</b> ni mradi wa chanzo-wazi. Unganisha kwa uwekaji: <a href="https://gitlab.com/avo1kov/csscolor" target="_blink">https://gitlab.com/avo1kov/csscolor</a></p>`
    },
]

module.exports = {
    langs: dataSets.langs,
    test: dataSets.test,
}