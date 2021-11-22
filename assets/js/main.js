const nombreProjecto = "Simples-frases-random";
let quotesData;

//aqui habra un array con todos los colores
var colors = [
    "f94144",
    "f3722c",
    "f8961e",
    "f9844a",
    "f9c74f",
    "90be6d",
    "43aa8b",
    "4d908e",
    "577590",
    "277da1",
    "006d77",
    "023047",
];

var fraseActual = "",
    autorActual = "";

//Funcion que obtendra las frases para mostrarlas en pantalla
function getQuotes() {
    return $.ajax({
        headers: {
            Accept: "application/json",
        },
        url: "./frases.json",
        success: function(jsonFrases) {
            if (typeof jsonFrases === "string") {
                quotesData = JSON.parse(jsonFrases);
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
    //creamos una variable para almacenar las frases
    let fraseRandom = getRandomQuote();

    //obtenemos la frase y el autor del json
    //y guardamos en las variables
    fraseActual = fraseRandom.quote;
    autorActual = fraseRandom.author;

    //enlazamos los botones
    //el boton de compartir la frase
    $("share-quote").attr(
        "href",
        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );

    $("#tumblr-quote").attr(
        "href",
        "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
        encodeURIComponent(currentAuthor) +
        "&content=" +
        encodeURIComponent(currentQuote) +
        "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
    );

    //aqui le damos funcionalidad y que presente los texto en pantalla

    $(".quote-text").animate({ opacity: 0 }, 500, function() {
        $(this).animate({ opacity: 1 }, 500);
        $("#text").text(fraseRandom.quote);
    });

    $(".quote-author").animate({ opacity: 0 }, 500, function() {
        $(this).animate({ opacity: 1 }, 500);
    });

    $("#author").html(fraseRandom.author);

    //controlamos el fondo de pantalla
    var color = Math.floor(Math.random() * colors.length);
    $("html body").animate({
            backgroundColor: colors[color],
            color: colors[color],
        },
        1000
    );

    $(".button").animate({
            backgroundColor: colors[color],
        },
        1000
    );

    $("document").ready(function() {
        getQuotes().then(() => {
            getRandomQuote();
        });
    });

    $("#new-quote").on("click", getRandomQuote);
}