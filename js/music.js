$(document).ready(function() {
        getListGeneros();
        $("#select-genero").val(1);
        getSongs();
        initPayer();
    }

);

let audio = document.getElementById('player');

function getTemp(id_temp) {
    let temp = $(id_temp).html();
    let compilar = Handlebars.compile(temp);
    let compilada = compilar();
    $("#show-temp").html(compilada);
}

function show() {
    $(".showHeader").toggle(1000);
    $(".showBtn").toggle(1500);
    $("#show-temp").toggle(2000);
}

let generos = {
    generos: [{
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
};

let mjson = {
    songs: [{
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
};

let songsGenero = {
    songs: []
};

function getListGeneros() {
    let temp = $("#temp_generos").html();
    let compilar = Handlebars.compile(temp);
    let compilado = compilar(generos);
    $("#select-genero").html(compilado);
}

$("#select-genero").change(function() {
    getSongs();
});

audio.onpause = function() {
    hideEcualizador();
};

audio.onabort = function() {
    hideEcualizador();
};
audio.onplay = function() {
    if ($("#ecualizador-id").val() !== "") {
        showEcualizador($("#ecualizador-id").val());
    }
};

function getSongs() {
    audio.pause();
    $("#player").attr("src", "");
    $("#title-song").text("");
    $("#title-song").attr("uk-tooltip", "title: Selecciona una canción");

    let temp = $("#temp_songs").html();
    let compilar = Handlebars.compile(temp);

    let idGenero = parseInt($("#select-genero").val());
    let array = getSongsByGenero(idGenero);
    let compilado = compilar(array);
    $("#playlist").html(compilado);

    $("#playlist li").click(function() {
        let selected = parseInt($(this).attr("id"));
        let index = songsGenero.songs.findIndex(song => song.id === selected);

        playSong(index);
    });
}

function getSongsByGenero(idGenero) {
    songsGenero = {
        songs: []
    };

    mjson.songs.forEach(function(data, index) {
        if (data.idGenero === idGenero) {
            songsGenero.songs.push(data);
        }
    });

    generos.generos.forEach(function(data, index) {
        if (data.id === idGenero) {
            $("#img-song").attr("src", data.img);
        }

    });
    return songsGenero;
}

function scheduleSong(id) {
    audio.onended = function() {
        console.log("terminó la canción");
        playSong(id + 1);
    };
}


function playSong(index) {
    let long = songsGenero.songs;
    if (index >= long.length) {
        console.log("Se terminó la lista");
        audio.pause();
    } else {
        $("#img-song").attr("src", songsGenero.songs[index].image);
        $("#player").attr("src", songsGenero.songs[index].path);
        $("#title-song").text(songsGenero.songs[index].name + " - " + songsGenero.songs[index].artist);
        $("#title-song").attr("uk-tooltip", "title: " + songsGenero.songs[index].name + " - " + songsGenero.songs[index].artist);
        $("#title-song").prepend('<i class="fa fa-music text-white pl-1 pr-2"></i>');
        showEcualizador("ecualizador_" + songsGenero.songs[index].id);
        $("#ecualizador-id").val("ecualizador_" + songsGenero.songs[index].id);
        audio.play();
        scheduleSong(index);
    }
}

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

function showEcualizador(id) {
    $("#playlist .ecualizador").each(function(i) {
        if ($(this).attr("id") !== id) {
            $(this).css("display", "none");
        } else {

            $(this).css("display", "block");

        }

    });



}

function hideEcualizador() {
    $("#playlist .ecualizador").each(function(i) {
        $(this).css("display", "none");
    });

}


function initPayer() {
    $("#shuffle").click(function() {
        let mezcladas = mezclar(songsGenero.songs);
        hideEcualizador();
        getSongsMezcladas(mezcladas);
        playSong(0);
    });
}


function getSongsMezcladas(array) {
    let temp = $("#temp_songs").html();
    let compilar = Handlebars.compile(temp);

    let newArray = { songs: array };
    let compilado = compilar(newArray);
    $("#playlist").html(compilado);

    $("#playlist li").click(function() {
        let selected = parseInt($(this).attr("id"));
        let index = array.findIndex(song => song.id === selected);

        playSong(index);
    });
}