var counter = 1;

$('.frown').click(function(){
  //alert("Hello! I am an alert box!!");
  var $newDiv = $("<div></div>");
  $newDiv.attr("id", "newDiv" + counter++);
  $(".body_div").append($newDiv);
});

$('.smile').click(function(){
    //alert("Hello! I am an alert box!!");
    var $newDivb = $("<div></div>");
    $newDivb.attr("id", "newDivb" + counter++);
    $(".body_div1").append($newDivb);
  });

  $('.clear').click(function() {
    console.log ('run')
    document.getElementById('body_div').innerHTML = " ";
    document.getElementById('body_div1').innerHTML = " ";
    // $('.body_div').addClass('hide');
    // $('.body_div1').addClass('hide');
});