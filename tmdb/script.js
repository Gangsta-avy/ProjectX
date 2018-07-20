const base_url="https://api.themoviedb.org/3/";
const APIKEY = "f6642a9e75698dbd0dfd566716c561f2";
const image_url="https://image.tmdb.org/t/p/w500";
const test = "https://api.themoviedb.org/3/movie/550?api_key=f6642a9e75698dbd0dfd566716c561f2&callback=test";

$('button').click(() => {
    const x = $('#search').val();

    console.log(x);
    $.ajax({url:base_url + "search/multi?api_key=" + APIKEY+ "&query=" + x , success: function(result){



            console.log(result);
            console.log(result.results);
                if($('#profile').prop('checked')){
                    $('#image').attr("src" , image_url+result.results[0].profile_path);

                }
                else if ($('#poster').prop('checked')){
                    $('#image').attr("src" , image_url+result.results[0].poster_path);

                }
        }
    });

});

