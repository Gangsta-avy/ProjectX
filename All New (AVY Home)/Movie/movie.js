$(document).ready(function () {

    callLatest(1);
    $('#searchInput').keyup( function (event) {
        if(event.keyCode==13){
            $('#submit').click();
        }
    })
    $('.c1').hide();
    $('#submit').on('click', function () {
        $('.c1').show();
        $('.c2').hide();
    });

    $("#reset").click(function (e) {
        location.reload();
    });

    $("#submit").click(function (e) {
        var validate = Validate();
        $("#message").html(validate);
        if (validate.length == 0) {
            CallAPI(1);
        }
    });
    $(".msg").on("click", ".result", function () {
        var resourceId = $(this).attr("resourceId");
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/" + resourceId + "?language=en-US",
            data: {
                api_key: "eb4cda00c52a1c0b7c868aec79418356"
            },
            dataType: 'json',
            success: function (result, status, xhr) {
                $("#modalTitleH4").html(result["original_title"]);

                var image = result["poster_path"] == null ? "no-image.png" : "https://image.tmdb.org/t/p/w500/" + result["poster_path"];
                var image1 = result["backdrop_path"] == null ? "no-image.png" : "https://image.tmdb.org/t/p/original/" + result["backdrop_path"];
                var overview = result["overview"] == null ? "No information available" : result["overview"];

                var resultHtml = "<span><img align='left' width='300px' src=\"" + image + "\"/></span>";

                $('.modimg').html(resultHtml);
                $('.modov').html("<span><strong>Storyline: </strong>" + overview + "</span><p></p><div><strong>Popularity: </strong>" + result["popularity"] + "</div><p></p><div><strong>Release Date: </strong>" + result["release_date"] + "</div><p></p><div><strong>Rating: </strong>" + result["vote_average"]+"</div><p></p><div><strong>Budget: $</strong>" + result["budget"]+"</div><p></p><div><strong>Grossing : $</strong>" + result["revenue"]+"</div>");

                $("#myModal").modal("show");
                $("#myModal").css("background-image" , 'url("'+image1+'")');
            },
            error: function (xhr, status, error) {
                $(".msg").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    });

    function callLatest(page){
        var ajax1 = $.ajax({
            url: "https://api.themoviedb.org/3/movie/now_playing?" +"&language=en-US"+ "&page=" + page + "&include_adult=false",
            data: { "api_key": "eb4cda00c52a1c0b7c868aec79418356" },
            dataType: "json",
            success: function (result, status, xhr) {
                var resultHtml = $("<div class=\"resultDiv\"><p>Now Playing in Theaters</p>");
                for (i = 0; i < result["results"].length; i++) {

                    var image = result["results"][i]["poster_path"] == null ? "no-image.png" : "https://image.tmdb.org/t/p/w500/" + result["results"][i]["poster_path"];

                    resultHtml.append("<div class=\"result\" resourceId=\"" + result["results"][i]["id"] + "\">" + "<img src=\"" + image + "\" />" + "<p><a>" + result["results"][i]["title"] + "</a></p></div>")
                }

                resultHtml.append("</div>");
                $("#message2").html(resultHtml);

                Paging(result["total_pages"]);
            },
            error: function (xhr, status, error) {
                $("#message2").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    }

    $(document).ajaxStart(function () {
        $(".imageDiv img").show();
    });

    $(document).ajaxStop(function () {
        $(".imageDiv img").hide();
    });

    function CallAPI(page) {
        $.ajax({
            url: "https://api.themoviedb.org/3/search/movie?language=en-US&query=" + $("#searchInput").val() + "&page=" + page + "&include_adult=false",
            data: { "api_key": "eb4cda00c52a1c0b7c868aec79418356" },
            dataType: "json",
            success: function (result, status, xhr) {
                var resultHtml = $("<div class=\"resultDiv\"><p>"+$('#searchInput').val()+"</p>");
                for (i = 0; i < result["results"].length; i++) {

                    var image = result["results"][i]["poster_path"] == null ? "no-image.png" : "https://image.tmdb.org/t/p/w500/" + result["results"][i]["poster_path"];

                    if(image !== "no-image.png"){

                        if(result["results"][i]["name"]!==undefined) {
                            resultHtml.append("<div id=\"id"+i+"\" class=\"result\" resourceId=\"" + result["results"][i]["id"] + "\">" + "<img src=\"" + image + "\" />" + "<p><a>" + result["results"][i]["name"] + "</a></p></div>")
                        }
                        else if(result["results"][i]["original_title"]!==undefined){
                            resultHtml.append("<div class=\"result\" resourceId=\"" + result["results"][i]["id"] + "\">" + "<img src=\"" + image + "\" />" + "<p><a>" + result["results"][i]["original_title"] + "</a></p></div>")

                        }
                    }
                }

                resultHtml.append("</div>");
                $("#message").html(resultHtml);

                Paging(result["total_pages"]);
            },
            error: function (xhr, status, error) {
                $("#message").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    }

    function Validate() {
        var errorMessage = "";
        if ($("#searchInput").val() == "") {
            errorMessage += "► Enter Search Text";
        }
        return errorMessage;
    }

    function Paging(totalPage) {
        var obj = $("#pagination").twbsPagination({
            totalPages: totalPage,
            visiblePages: 5,
            onPageClick: function (event, page) {
                CallAPI(page);
            }
        });
    }

});