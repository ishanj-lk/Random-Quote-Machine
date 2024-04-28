$(document).ready(function() {

    //Update copyright year
    let year = new Date().getFullYear();
    $('#creator').text('Created with ❤️ by Ishan Jayasinghe ©️ ' + year + '.');
    // Get a new quote
    function getQuote() {
        $('body').fadeOut(500).fadeIn(500);
        $.ajax({
            url: 'https://api.quotable.io/random',
            success: function(data) {
                $('#text').html('<span id="text-before" class="color-change"><i class="fa-solid fa-quote-left"></i></span>' +" "+ data.content);
                $('#author').text("- "+data.author);
                $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + data.content + '" ' + data.author));

                const color = 'rgb(' + Math.floor(Math.random() * 128) + ',' + Math.floor(Math.random() * 128) + ',' + Math.floor(Math.random() * 128) + ')';
                $('.color-change').css('color', color);
                $('.bg-color-change').css('background-color', color);
            }
        });
    }

    // Get a new quote when the page loads
    getQuote();

    // Get a new quote when the button is clicked
    $('#new-quote').on('click', getQuote);

    // Copy to clipboard
    $('#copy-clipboard').on('click', function() {
        const text = $('#text').text() + " " + $('#author').text();
        navigator.clipboard.writeText(text).then(function() {
            $('#copy-clipboard').text('Copied!');
            setTimeout(function() {
                $('#copy-clipboard').html('<i class="fa fa-clipboard" aria-hidden="true"></i>');
            }, 1000);
        }, function(err) {
            console.error('Failed to copy!', err);
        });
    });
});