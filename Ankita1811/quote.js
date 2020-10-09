$(document).ready(function () {
    var quote;
    var author;
    function newQuote() {
        $.ajax({
            url: "https://api.forismatic.com/api/1.0/",
            jsonp: "jsonp",
            dataType: "jsonp",
            data: {
                method: "getQuote",
                lang: "en",
                format: "jsonp"
            },
            success: function (apiResponse) {
                author = apiResponse.quoteAuthor;
                quote = apiResponse.quoteText;
                if (author) {
                    author = "- " + author;
                    $('#author').text(author);
                } else {
                    $('#author').text("Unknown");
                }
                $('.quote').text(quote);

            }
        });
    };
    newQuote();

    $('#get-quote').click(function (event) {
        event.preventDefault();
        newQuote();
    });

    
});