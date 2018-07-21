$(document).ready(function () {
    $("#reset").click(function (e) {
        location.reload();
    });
    $(window).on('load',()=> {
        callLatest(1)
        });

    $("#submit").click(function (e) {
        var validate = Validate();
        $("#message").html(validate);
        if (validate.length == 0) {
            CallAPI(1);
        }
    });
    function callLatest(page){
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/now_playing?" + "&page=" + page + "&include_adult=false",
            data: { "api_key": "3356865d41894a2fa9bfa84b2b5f59bb" },
            dataType: "json",
            success: function (result, status, xhr) {
                var resultHtml = $("<div class=\"resultDiv\"><p>Names</p>");
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
            url: "https://api.themoviedb.org/3/search/multi?language=en-US&query=" + $("#searchInput").val() + "&page=" + page + "&include_adult=false",
            data: { "api_key": "3356865d41894a2fa9bfa84b2b5f59bb" },
            dataType: "json",
            success: function (result, status, xhr) {
                var resultHtml = $("<div class=\"resultDiv\"><p>Names</p>");
                for (i = 0; i < result["results"].length; i++) {

                    var image = result["results"][i]["poster_path"] == null ? "no-image.png" : "https://image.tmdb.org/t/p/w500/" + result["results"][i]["poster_path"];

                    resultHtml.append("<div class=\"result\" resourceId=\"" + result["results"][i]["id"] + "\">" + "<img src=\"" + image + "\" />" + "<p><a>" + result["results"][i]["title"] + "</a></p></div>")
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
        var obj = $("#pagination, #pagination2").twbsPagination({
            totalPages: totalPage,
            visiblePages: 5,
            onPageClick: function (event, page) {
                CallAPI(page);
            }
        });
    }

});