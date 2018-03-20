var photo;
var image = 1;

var angle = 0;
var margin = 0;
var scalex = 1;
var scaley = 1;
var translatex = 0;
var translatey = 0;

$(document).ready(function() {
    var esto = $( "#myFigure" ).width();
    imgD.style.width = esto+"px";

    var myPlayer = $( "#player" ).width();
    var player = (esto / 2) - myPlayer;
    document.getElementById("player").style.left = player + "px";

    $(window).bind('resize', function() {
      esto = $( "#myFigure" ).width();
      var myEdit = document.getElementsByClassName("edit");
      myEdit[0].style.width = esto+"px";
      player = (esto / 2) - myPlayer;
      document.getElementById("player").style.left = player + "px";
    });

    document.getElementById("redo").onclick = function(){
      angle = (angle + 2) % 360;
      getTransform();
      //document.getElementById("imgD").style.transform = "rotate(" + angle + "deg)";
    }
    document.getElementById("undo").onclick = function(){
      angle = (angle - 2) % 360;
      getTransform();
      //document.getElementById("imgD").style.transform = "rotate(" + angle + "deg)";
    }
    document.getElementById("left").onclick = function(){
      translatex = translatex - 20;
      getTransform();
      //document.getElementById("imgD").style.transform = "translate(" + translatex + "px, " + translatey + "px)";
    }
    document.getElementById("right").onclick = function(){
      translatex = translatex + 20;
      getTransform();
      //document.getElementById("imgD").style.transform = "translate(" + translatex + "px, " + translatey + "px)";
    }
    document.getElementById("up").onclick = function(){
      translatey = translatey - 20;
      getTransform();
      //document.getElementById("imgD").style.transform = "translate(" + translatex + "px, " + translatey + "px)";
    }

    document.getElementById("down").onclick = function(){
      translatey = translatey + 20;
      getTransform();
      //document.getElementById("imgD").style.transform =  "translate(" + translatex + "px, " + translatey + "px)";
    }
    document.getElementById("plus").onclick = function(){
      scalex = scalex + 0.1;
      scaley = scaley + 0.1;
      getTransform();
      //document.getElementById("imgD").style.transform = "scale(" + scalex + ", " + scaley + ")";
      console.log(scalex);
    }
    document.getElementById("minus").onclick = function(){
      scalex = scalex - 0.1;
      scaley = scaley - 0.1;
      getTransform();
      //document.getElementById("imgD").style.transform = "scale(" + scalex + ", " + scaley + ")";
      console.log(scalex);
    }

    jQuery('#edit2').on('click', function(event) {
         jQuery('#controls').toggle('show');
         var element = document.getElementById("imgD");
         element.classList.remove("edit");
         console.log("hecho");
    });
});

function getTransform(){
  var mio = document.getElementById("imgD");
  mio.style.transform = "rotate(" + angle + "deg)";
  mio.style.transform += "translate(" + translatex + "px, " + translatey + "px)";
  mio.style.transform += "scale(" + scalex + ", " + scaley + ")";

  console.log("angle: " + angle + ", translateX: " + translatex + ", translatey: " + translatey + ", scalex: " + scalex + ", scaley: " + scaley);
}

function moveDivisor() {
  handle.style.left = slider.value+"%";
  divisor.style.width = slider.value+"%";

}

function point_it(event){
	pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("comparison").offsetLeft;
	pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("comparison").offsetTop;
	document.getElementById("myFigure").style.left = (pos_x-1) ;
	document.getElementById("myFigure").style.top = (pos_y-15) ;
	document.getElementById("myFigure").style.visibility = "visible" ;
  console.log("y: " + pos_y +", x: " + pos_x);
}

function nextPhoto(){
  if(image < 300){
    image = image + 1;
    photo = "img/bim/" + image + ".png";
    $("#imgD").attr("src",photo);
  }else{
    alert("No more BIM");
  }
}

function prevPhoto(){
  if(image > 1){
    image = image - 1;
    photo = "img/bim/" + image + ".png";
    $("#imgD").attr("src",photo);
  }else{
    alert("No more BIM");
  }
}

function play(){
  for(var i = 30; i < 302; i++){
      image = i;
      doSetTimeout(i);
  }
}

function doSetTimeout(i){
  setTimeout(function(){
    photo = "img/bim/" + i + ".png";
    var myPhoto = $("#imgD").attr("src",photo);
  }, i * 80);
}

function firstBim(){
  image = 30;
  photo = "img/bim/" + image + ".png";
  $("#imgD").attr("src",photo);
}

function lastBim(){
  image = 300;
  photo = "img/bim/" + image + ".png";
  $("#imgD").attr("src",photo);
}

function myFunction(){
  image = $("#sel1").val();
  photo = "img/bim/" + image + ".png";
  $("#imgD").attr("src",photo);
}
