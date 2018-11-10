var counterSmile = 1;
var counterFrown = 1;


$('.frown').click(function(){
  //alert("Hello! I am an alert box!!");
  var $newDiv = $("<div></div>");
  $newDiv.attr("id", "newDiv" + counterSmile++);
  $(".body_div").append($newDiv);
});

$('.smile').click(function(){
    //alert("Hello! I am an alert box!!");
    var $newDivb = $("<div></div>");
    $newDivb.attr("id", "newDivb" + counterFrown++);
    $(".body_div1").append($newDivb);
  });

  $('.clear').click(function() {
    console.log ('run')
    document.getElementById('body_div').innerHTML = " ";
    document.getElementById('body_div1').innerHTML = " ";
    counterFrown = 1;
    counterSmile = 1;
    // $('.body_div').addClass('hide');
    // $('.body_div1').addClass('hide');
});