//Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.

//Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica.

//BONUS: Creare una select con i seguenti generi: pop, rock, metal e jazz. In base a cosa scegliamo nella select vedremo i corrispondenti cd.

//Chiamata: https://flynn.boolean.careers/exercises/api/array/music

//Layout base:https://bitbucket.org/booleancareers/ex-dischi-musicali-layout

$(document).ready(function () {

    var html_template =$('#music-template').html();
    var template = Handlebars.compile(html_template);
    var cdApi = 'https://flynn.boolean.careers/exercises/api/array/music';

    //Attivo chiamata ajax
    $.ajax({
        'url':cdApi,
        'method':'GET',
        'success': function(data){
            console.log(data);

            var song = data.response;
            for (i = 0; i < song.length; i++) {

				var content = {
					'posterImg': song[i].poster,
					'textTitle': song[i].title,
					'textName': song[i].author,
					'textDate': song[i].year,
					'classGenre': song[i].genre.toLowerCase(),
				};

				var set = template(content);
				$('.cds-container').append(set);
			};
            //salvo la select in una variabile
            var select = $('#genere');
            //applico la funzione change
            select.change(function () {

				var genre = $(this).val();

				if (genre == 'all') {
					$('.cd').show();

				} else {
					$('.cd').hide();
					$('.cd.' + genre).show();
				}
            });
        },
        error: function () {
			console.log("Errore nel caricamento della pagina");

		}
    });
});
