const base_url="https://api.themoviedb.org/3/";
const APIKEY = "f6642a9e75698dbd0dfd566716c561f2";
const image_url="https://image.tmdb.org/t/p/w500";
const test = "https://api.themoviedb.org/3/movie/550?api_key=f6642a9e75698dbd0dfd566716c561f2&callback=test";
$(function () {
    $('btn').click{
        const x = $('#inp').val();
        console.log(x + "Value by script");
        $.ajax({url:base_url + "search/movie?api_key=" + APIKEY+ "&query=" + x , success: function(result){

                console.log(result);
                console.log(result.results);
                const item =  result.results;
                let i;
                for (i=0;i<item.length;i++){
                    $('#image').attr("src" , image_url+item[i].poster_path);
                }



            }
        });

    });

   /* $("button").click(function(){
        $.ajax({url: base_url + "configuration?api_key=" + APIKEY, success: function(result){
                console.log(result)
            }});
    });*/

});
