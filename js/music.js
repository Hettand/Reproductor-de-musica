// géneros
let generos = [{
        id: 1,
        name: "Rock y Ska Punk",
        img: "img/music/ska_rock/ska_rock.jpg"
    },
    {
        id: 2,
        name: "Bachata",
        img: "img/music/bachata/bachata.png"

    }
]

// canciones
let mySongs = [{
        id: 1,
        idGenero: 2,
        name: "Cupido Esta Solo - LIVE VERSION",
        artist: "Grupo Extra Touch",
        path: "music/bachata/LIVE VERSION - Cupido Esta Solo [Grupo Extra Touch].mp3",
        image: "img/music/bachata/Grupo_extra.jpg"
    },
    {
        id: 2,
        idGenero: 2,
        name: "Deja vu",
        artist: "Shakira feat Prince Royce",
        path: "music/bachata/Deja_vu.mp3",
        image: "img/music/bachata/Shakira_Prince.jpg"
    }, {
        id: 3,
        idGenero: 2,
        name: "Carmin",
        artist: "Juan Luis Guerra feat Romeo Santos",
        path: "music/bachata/Carmin.mp3",
        image: "img/music/bachata/Carmin.jpg"
    }, {
        id: 4,
        idGenero: 2,
        name: "Centavito",
        artist: "Romeo Santos",
        path: "music/bachata/Centavito.mp3",
        image: "img/music/bachata/Centavito.jpg"
    },
    {
        id: 5,
        idGenero: 2,
        name: "Necio",
        artist: "Romeo Santos",
        path: "music/bachata/Necio.mp3",
        image: "img/music/bachata/necio.jpg"
    },
    {
        id: 6,
        idGenero: 1,
        name: "Arrancacorazones",
        artist: "Attaque 77",
        path: "music/ska_rock/Attaque 77 - Arrancacorazones.mp3",
        image: "img/music/ska_rock/arrancacorazones.jpg"
    },
    {
        id: 7,
        idGenero: 1,
        name: "Qué puedo decir",
        artist: "Ska-p",
        path: "music/ska_rock/Que_Puedo_Decir.mp3",
        image: "img/music/ska_rock/skap.jpg"
    },
    {
        id: 8,
        idGenero: 1,
        name: "Zafar",
        artist: "La vela puerca",
        path: "music/ska_rock/La Vela Puerca  - Zafar.mp3",
        image: "img/music/ska_rock/la_vela.jpg"
    },
    {
        id: 9,
        idGenero: 1,
        name: "Ya no sé que hacer conmigo",
        artist: "Cuarteto de nos",
        path: "music/ska_rock/Ya no sé qué hacer conmigo.mp3",
        image: "img/music/ska_rock/no_se.jpg"
    },
    {
        id: 10,
        idGenero: 1,
        name: "Persiana americana",
        artist: "Soda Stereo",
        path: "music/ska_rock/Persiana Americana Letra.mp3",
        image: "img/music/ska_rock/persiana.jpg"
    }

]

// objeto con una lista vacía
let songsGenero = {
    songs: []
};


// mezcla el array pasado por parámetro y lo retorna
function mezclar(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    // Mientras queden elementos a mezclar...
    while (0 !== currentIndex) {

        // Seleccionar un elemento sin mezclar...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // E intercambiarlo con el elemento actual
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// compila la data con el template que tiene el id idTemp y lo muestra en el elemento que tiene el id idPlace
function compilarHandlebars(data, idTemp, idPlace) {
    // html del template
    let temp = $(idTemp).html();
    // utilizamos compilar con Handlebars para indicar el template dónde queremos poner la data
    let compilar = Handlebars.compile(temp);
    // compilamos la data dentro del template
    let compilada = compilar(data);
    // mostramos el html del template ya compilado
    $(idPlace).html(compilada);
}


// ponemos en el select la lista de géneros
function getListGeneros() {
    let obj = { generos: generos }
    compilarHandlebars(obj, "#temp_generos", "#select-genero")
}

// al cambiar el género en el select nos tremos las canciones correspondientes
$("#select-genero").change(function() {
    getSongs();
});

// tag audio
let audio = document.getElementById('player');

// obtenemos el listado de las canciones para mostrarlas
function getSongs() {
    audio.pause();
    $("#player").attr("src", "");
    $("#title-song").text("");
    $("#title-song").attr("uk-tooltip", "title: Selecciona una canción");

    getSongsByGenero();
    compilarHandlebars(songsGenero, "#temp_songs", "#playlist")

    // evento click sobre cada item de la canción
    $("#playlist li").click(function() {
        // guardamos el id  del li de la canción seleccionada  en esta variable
        let selected = parseInt($(this).attr("id"));
        let index = songsGenero.songs.findIndex(song => song.id === selected);
        playSong(index);
    });
}

// obtenemos las canciones clasificadas por género
function getSongsByGenero() {
    songsGenero = {
        songs: []
    };

    let idGenero = parseInt($("#select-genero").val());
    mySongs.forEach(function(data, index) {
        if (data.idGenero === idGenero) {
            songsGenero.songs.push(data);
        }
    });

    generos.forEach(function(data, index) {
        if (data.id === idGenero) {
            $("#img-song").attr("src", data.img);
        }
    });
}

// programar la siguiente canción
function scheduleSong(id) {
    // cuando termina pasamos a la siguiente
    audio.onended = function() {
        playSong(id + 1);
    };
}

// play song
function playSong(index) {
    // longitud de las canciones actuales por género
    let long = songsGenero.songs;
    // si no tenemos más canciones para reproducir
    if (index >= long.length) {
        console.log("Se terminó la lista");
        audio.pause();
    } else {
        // colocamos la imágen correspondiente al tema
        $("#img-song").attr("src", songsGenero.songs[index].image);
        // nos tremos el path para reproducir en el tag de audio
        $("#player").attr("src", songsGenero.songs[index].path);
        // cambiamos el rítulo del tema debajo de la imagen
        $("#title-song").text(songsGenero.songs[index].name + " - " + songsGenero.songs[index].artist);
        // le agregamos el tootltip al título
        $("#title-song").attr("uk-tooltip", "title: " + songsGenero.songs[index].name + " - " + songsGenero.songs[index].artist);
        // le ponemos delante del título el icono de la música
        $("#title-song").prepend('<i class="fa fa-music text-white pl-1 pr-2"></i>');
        // mostramos el ecualizador en la cacnión corrspondiente
        showEcualizador("ecualizador_" + songsGenero.songs[index].id);
        // guardamos el id del ecualizador que se está mostrando
        $("#ecualizador-id").val("ecualizador_" + songsGenero.songs[index].id);
        // le damos play
        audio.play();
        // programamos la siguiente canción que llama a esta misma función al terminar
        scheduleSong(index);
    }
}


// mostrar el ecualizador por el id que pasamos por parámetro
function showEcualizador(id) {
    $("#playlist .ecualizador").each(function(i) {
        if ($(this).attr("id") !== id) {
            $(this).css("display", "none");
        } else {
            $(this).css("display", "block");
        }

    });



}
// escondemos los ecualizadores
function hideEcualizador() {
    $(".ecualizador").css("display", "none");
}

// botón reproducción aleatoria
$("#shuffle").click(function() {
    let mezcladas = mezclar(songsGenero.songs);
    hideEcualizador();
    getSongsMezcladas(mezcladas);
    playSong(0);
});


// obtener las canciones mezcladas
function getSongsMezcladas(array) {
    let obj = { songs: array };
    compilarHandlebars(obj, "#temp_songs", "#playlist")

    $("#playlist li").click(function() {
        let selected = parseInt($(this).attr("id"));
        let index = array.findIndex(song => song.id === selected);

        playSong(index);
    });
}



// al pausar
audio.onpause = function() {
    hideEcualizador();
};

// al ejecutarse play
audio.onplay = function() {
    if ($("#ecualizador-id").val() !== "") {
        showEcualizador($("#ecualizador-id").val());
    }
};