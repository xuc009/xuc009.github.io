//

$('.nav-item').click(function() {
    var target = $(this).html();

    console.log(target);

    if (target == 'Apple') {
        $('.apple').removeClass('hide');
    } else if (target == 'Nike'){
        $('.nike').removeClass('hide');
    } else if (target = 'Disney') {
        $('.target').removeClass('hide');
    }
});