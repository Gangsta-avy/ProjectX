const base_url="https://api.themoviedb.org/3/";
const APIKEY = "f6642a9e75698dbd0dfd566716c561f2";
const image_url="https://image.tmdb.org/t/p/w500";
const test = "https://api.themoviedb.org/3/movie/550?api_key=f6642a9e75698dbd0dfd566716c561f2&callback=test";

    $(window).on('load',()=> {
        $.ajax({url:base_url + "movie/now_playing?api_key=" + APIKEY, success: function(result){
                console.log(result);
            }
        });
    });
