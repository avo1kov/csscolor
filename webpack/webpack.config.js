var HtmlWebpackPlugin = require('html-webpack-plugin');
const XMLWebpackPlugin = require('xml-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
var path = require('path');

let languagesHTML = '';
const langList = [
    {
        code: '',
        label: 'Русский'
    },
    {
        code: 'en',
        label: 'English'
    },
    {
        code: 'de',
        label: 'German'
    },
    {
        code: 'es',
        label: 'Español'
    },
    {
        code: 'hi',
        label: 'हिंदी'
    },
    {
        code: 'fr',
        label: 'Français'
    },
    {
        code: 'eo',
        label: 'Esperanto'
    },
    {
        code: 'sw',
        label: 'Kiswahili'
    }
];
langList.forEach(lang => {
    languagesHTML += `<a href="https://csscolor.ru/${lang.code}" class="content">${lang.label}</a>`
});

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

const phpDataSet = {
    lang: `<?php echo $labels['lang']; ?>`,
    title: `<?php echo $labels['title']; ?>`,
    applicationName: `<?php echo $labels['title']; ?>`,
    seoDescription: `<?php echo $labels['seo-description']; ?>`,
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
    donate: `<?php echo $labels['donate']; ?>`,
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
    description: `<?php echo $labels['description']; ?>`,
    media: `<?php echo $labels['media']; ?>`,
    year: `<?php echo date('Y'); ?>`,
    authorName: `<?php echo $labels['author_name']; ?>`,
    cancel: `<?php echo $labels['cancel']; ?>`,
    goal: `<?php echo $labels['goal']; ?>`,
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
    <!-- /Yandex.Metrika counter -->`,
}

const testDataSet = {
    lang: 'ru',
    title: 'HTML CSS Палитра цветов',
    applicationName: `app name`,
    seoDescription: 'HTML CSS Палитра цветов в HEX, RGB, HSV и CMYK',
    seoKeywords: 'палитра css, цвета css, палитра html, css html цвета, html цвета палитра, палитра цветов',
    previewImage: '',
    googleAnalytics: '',
    googleTagManager: '',
    donate: 'Поддержать',
    exampleText,
    languagesHTML,
    yandexAd: `<div style="width: 100%; height: 90px; background: #9191912c"></div>`,
    description: `<p>
                <b>HTML CSS Палитра цветов</b> помогает подобрать <b>цвет</b> в виде <b>HEX, RGB, RGBA, HSV и CMYK</b> записи цветовой модели. Нажимайте на поля выбора цвета, а для более точного выбора, перемещайте курсор с зажатой левой кнопкой мыши. Изменяйте параметры цвета через поля ввода.
            </p>
            <p>
                А ещё можно скачать выбранный цвет. Нажмите на кнопку <b>"Скачать цвет"</b>, появится поле параметров. Вы можете выбрать формат (SVG, PNG, JPEG или GIF) и размер картинки. Обращаю ваше внимание, что полупрозрачные цвета можно скачать только в форматах SVG и PNG.
            </p>
            <p>
                В качестве экперимента разместили небольшую статью про flexbox: <a href="https://csscolor.ru/flexbox" class="content">https://csscolor.ru/flexbox</a>
            </p>`,
    media: '',
    year: (new Date()).getFullYear(),
    authorName: 'Александр Волков',
    cancel: 'Отмена',
    goal: 'Поддержите нас. Это важно',
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
}

module.exports = {
    // mode: 'development',
    mode: 'production',
    // watch: true,
    entry: './src/index.js', //path relative to this file
    output: {
        filename: './app.bundle.js' //path relative to this file
    },
    module: {
        rules: [
            {
                test: /\.(s*)[ca]ss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insert: 'head'
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.ejs',
            filename: './test.html',
            hash: true,
            ...testDataSet,
        }),
        new HtmlWebpackPlugin({
            template: './src/template.ejs',
            filename: './template.html',
            hash: true,
            ...phpDataSet,
        }),
        new MinifyPlugin(),
        new CopyPlugin([
            {
                from: './src/sitemap.xml',
                to: 'sitemap.xml',
                transform(content) {
                    return content
                        .toString()
                        .replace('<%= datetime %>', new Date().toISOString());
                }
            },
        ]),
    ]
}