$('.nav-item').click(function() {
    // content div should turn green when clicked

    // when clicked, variable of button name is created and store data of button, 
    // express in console
    var button_name = $(this).data('button');

    //function accepts 2 attributes, remove/reset class and add new button name
    $('.content').attr('class', 'column content');
    $('.content').addClass(button_name);
  
    //reset button then make selected button black
   $('.nav-item').removeClass('active');
   $(this).addClass('active');

   //beyonce slay appear: if beyonce clicked, appear else, hide 
   if (button_name =='beyonce') {
    $('.slay').removeClass('hide');
    $('audio')[0].play();
   } else if (button_name =='about') {
    $('.about').removeClass('hide');
   } else {
    $('.about').addClass('hide');


   }
});

$('.close').click(function() {
    $('.slay').addClass('hide');
    $('audio')[0].pause();
    $('.nav-item').removeClass('active');

});
