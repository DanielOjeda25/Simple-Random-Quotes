const nombreProjecto = "Simples-frases-random";
let quotesData;

var colors = [];

var fraseActual = "",
    autorActual = "";

//Funcion que obtendra las frases para mostrarlas en pantalla
function obtenerFrases() {
    return $.ajax({
        headers: {
            Accept: "application/json",
        },
        url: "../frases.json",
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

function obtenerFraseRandom() {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
    ];
}

//funcion que mostrara las frases y dara funcionalidad a los botones

function obtenerFraseYMostrarla() {
    //creamos una variable para almacenar las frases
    let fraseRandom = obtenerFraseRandom();

    //obtenemos la frase y el autor del json
    //y guardamos en las variables
    fraseActual = fraseRandom.quote;
    autorActual = fraseRandom.author;

    //enlazamos los botones
    //el boton de compartir la frase
    $("share-quote").attr("href", "");
}