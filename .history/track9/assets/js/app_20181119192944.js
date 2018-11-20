$(Text).scroll(function(){
    $(".top").css("opacity", 1 - $(Text).scrollTop() / 250);
  });