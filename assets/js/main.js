const nombreProjecto = "Simples-frases-random";
let quotesData;

//aqui habra un array con todos los colores
var colors = [
    "#f94144",
    "#f3722c",
    "#f8961e",
    "#f9844a",
    "#f9c74f",
    "#90be6d",
    "#43aa8b",
    "#4d908e",
    "#577590",
    "#277da1",
    "#006d77",
    "#023047",
];

var fraseActual = "",
    autorActual = "";

//Funcion que obtendra las frases para mostrarlas en pantalla

//obtiene las frases de un .json
function getQuotes() {
    return $.ajax({
        headers: {
            Accept: "application/json",
        },
        url: "https://gist.githubusercontent.com/DanielOjeda25/a3d52c313d54829278027f1235c27f8f/raw/7a1b361b282e4e26cf366dea493391f1689f22cd/frases.json",
        success: function(jsonQuotes) {
            if (typeof jsonQuotes === "string") {
                quotesData = JSON.parse(jsonQuotes);
                console.log("quotesData");
                console.log(quotesData);
            }
        },
    });
}

//funcion que hara las frases random
//para luego mostrarse en pantalla

function getRandomQuote() {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
    ];
}

//funcion que mostrara las frases y dara funcionalidad a los botones

function getQuote() {
    let randomQuote = getRandomQuote();

    //guardamos las variables
    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;

    //damos la funcion al boton de twitter
    $("#tweet-quote").attr(
        "href",
        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );
    //damos la funcion al boton de tumbler
    $("#tumblr-quote").attr(
        "href",
        "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
        encodeURIComponent(currentAuthor) +
        "&content=" +
        encodeURIComponent(currentQuote) +
        "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
    );

    //damos una animacion al cambio de texto
    $(".quote-text").animate({ opacity: 0 }, 500, function() {
        $(this).animate({ opacity: 1 }, 500);
        $("#text").text(randomQuote.quote);
    });

    //damos una animacion al cambio de author
    $(".quote-author").animate({ opacity: 0 }, 500, function() {
        $(this).animate({ opacity: 1 }, 500);
        $("#author").html(randomQuote.author);
    });

    //cambia el fondo por colores aleatorios
    var color = Math.floor(Math.random() * colors.length);
    $("html body").animate({
            backgroundColor: colors[color],
            color: colors[color],
        },
        1000
    );
    //damos la misma funcion al boton y cambiar el calor
    $(".button").animate({
            backgroundColor: colors[color],
        },
        1000
    );
}

//llamamos las funciones al DOM
$(document).ready(function() {
    getQuotes().then(() => {
        getQuote();
    });

    $("#new-quote").on("click", getQuote);
});