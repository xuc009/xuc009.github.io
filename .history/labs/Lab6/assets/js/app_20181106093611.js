//

$('.nav-item').click(function() {
    var target = $(this);
    if ($(target).html() == 'Apple') {
        $('.apple').removeClass('hide');
    }
});