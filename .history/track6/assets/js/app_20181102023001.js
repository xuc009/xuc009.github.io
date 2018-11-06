var counter = 1;

$('.smile').click(function(){
  //alert("Hello! I am an alert box!!");
  var $newDiv = $("<div></div>");
  $newDiv.attr("id", "newDiv" + counter++);
  $(".body_div").append($newDiv);
});

$('.frown').click(function(){
    //alert("Hello! I am an alert box!!");
    var $newDivb = $("<div></div>");
    $newDivb.attr("id", "newDivb" + counter++);
    $(".body_div1").append($newDivb);
  });

  $('.clear').click(function() {
    $('.body_div').addClass('hide');
});