//

$('.nav-item').click(function() {
    var target = $(this).html();

    console.log(target);

    if (target == 'Apple') {
        $('.apple').removeClass('hide');
    }
});