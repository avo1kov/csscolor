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

const dataSet = {
    lang: 'ru',
    title: 'HTML CSS Палитра цветов',
    seoDescription: 'HTML CSS Палитра цветов в HEX, RGB, HSV и CMYK',
    seoKeywords: 'палитра css, цвета css, палитра html, css html цвета, html цвета палитра, палитра цветов',
    downloadColorButtonForLayout: 'Скачать цвет',
    width: 'Ширина',
    height: 'Высота',
    donate: 'Поддержать',
    cancel: 'Отмена',
    goal: 'Поддержите нас. Это важно',
    downloadColorButtonOk: 'Ок',
    exampleText,
    description: `<p>
                <b>HTML CSS Палитра цветов</b> помогает подобрать <b>цвет</b> в виде <b>HEX, RGB, RGBA, HSV и CMYK</b> записи цветовой модели. Нажимайте на поля выбора цвета, а для более точного выбора, перемещайте курсор с зажатой левой кнопкой мыши. Изменяйте параметры цвета через поля ввода.
            </p>
            <p>
                А ещё можно скачать выбранный цвет. Нажмите на кнопку <b>"Скачать цвет"</b>, появится поле параметров. Вы можете выбрать формат (SVG, PNG, JPEG или GIF) и размер картинки. Обращаю ваше внимание, что полупрозрачные цвета можно скачать только в форматах SVG и PNG.
            </p>
            <p>
                В качестве экперимента разместили небольшую статью про flexbox: <a href="https://csscolor.ru/flexbox" class="content">https://csscolor.ru/flexbox</a>
            </p>`,
    media: '<script async src="https://comments.app/js/widget.js?2" data-comments-app-website="X4A89j26" data-limit="5" data-page-id="1" data-dislikes="1"></script>',
    ads: 'yandex',
    author: '<a href="https://vk.com/id151352523" class="content" target="_new" class="me" id="linkToMe">Александр Волков</a>',
    year: (new Date()).getFullYear(),
    donateBox: `<iframe src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0%20%D0%BF%D0%B0%D0%BB%D0%B8%D1%82%D1%80%D1%8B&targets-hint=&default-sum=100&button-text=13&hint=&successURL=&quickpay=shop&account=410013246801384" width="423" height="222" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
    <div style="text-align: right">
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="HRPUL3XJYGQ98" />
            <input type="image" src="https://www.paypalobjects.com/ru_RU/RU/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Кнопка «Пожертвовать через PayPal»" />
            <img alt="" border="0" src="https://www.paypal.com/ru_RU/i/scr/pixel.gif" width="1" height="1" />
        </form>
    </div>`,
    languagesHTML,
}

module.exports = {
    mode: 'development',
    // mode: 'production',
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
            template: './src/index.ejs',
            filename: './index.html',
            hash: true,
            ...dataSet,
        }),
        new HtmlWebpackPlugin({
            template: './src/out.ejs',
            filename: './out.html',
            hash: true,
            inject: 'body',
            ...dataSet,
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