// var counter = 1;

// $('.frown').click(function(){
//   //alert("Hello! I am an alert box!!");
//   var $newDiv = $("<div></div>");
//   $newDiv.attr("id", "newDiv" + counter++);
//   $(".body_div").append($newDiv);
// });

// $('.smile').click(function(){
//     //alert("Hello! I am an alert box!!");
//     var $newDivb = $("<div></div>");
//     $newDivb.attr("id", "newDivb" + counter++);
//     $(".body_div1").append($newDivb);
//   });

//   $('.clear').click(function() {
//     $('.body_div').addClass('hide');
// });

var slider_content = document.getElementById('box');
var slideId = ["mySlides1", "mySlides2"]
var img = ['1a', '1b', '2a'];

var i = img.length;

function nextimage () {
  if (i<img.length) {
    i= i+1;
  } else {
    i=1;
  }
    slider_content.innerHTML = "<img src= assets/img/"+img[i-1]+".jpg>"; 
}

function prewimage () {
  if (i<img.length+1 && i>1) {
    i= i-1;
  } else {
    i=img.length;
  }
    slider_content.innerHTML = "<img src= assets/img/"+img[i-1]+".jpg>"; 
}

function nextimage1 () {
  if (i<img.lenxgth) {
    i= i+1;
  } else {
    i=1;
  }
    slider_content.innerHTML = "<img src= assets/img/"+img[i-1]+".jpg>"; 
}

function prewimage1 () {
  if (i<img.length+1 && i>1) {
    i= i-1;
  } else {
    i=img.length;
  }
    slider_content.innerHTML = "<img src= assets/img/"+img[i-1]+".jpg>"; 
}







//DROPDOWN CODE
var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);