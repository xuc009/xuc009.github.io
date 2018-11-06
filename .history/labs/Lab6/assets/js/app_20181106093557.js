//

$('.nav-item').click(function() {
    var target = $(this);
    if ($(target).html() == 'apple') {
        $('.apple').removeClass('hide');
    }
});