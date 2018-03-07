var photo;
var image = 1;
$(document).ready(function() {
    var esto = $( "#myFigure" ).width();
    imgD.style.width = esto+"px";

    var myPlayer = $( "#player" ).width();
    var player = (esto / 2) - myPlayer;
    document.getElementById("player").style.left = player + "px";

    $(window).bind('resize', function() {
      esto = $( "#myFigure" ).width();
      imgD.style.width = esto+"px";
      player = (esto / 2) - myPlayer;
      document.getElementById("player").style.left = player + "px";
    });

    var angle = 0;
    var margin = 0;
    document.getElementById("redo").onclick = function(){
      angle = (angle + 2) % 360;
      document.getElementById("imgD").style.transform = "rotate(" + angle + "deg)";
    }
    document.getElementById("undo").onclick = function(){
      angle = (angle - 2) % 360;
      document.getElementById("imgD").style.transform = "rotate(" + angle + "deg)";
    }
    document.getElementById("left").onclick = function(){
      var move = document.getElementById('imgD').clientWidth;
      imgD.style.width = (move - 4) + "px";
    }
    document.getElementById("right").onclick = function(){
      var move = document.getElementById('imgD').clientWidth;
      imgD.style.width = (move + 4) + "px";
    }
    document.getElementById("plus").onclick = function(){
      var move = document.getElementById('imgD').clientHeight;
      imgD.style.height = (move + 4) + "px";
    }
    document.getElementById("minus").onclick = function(){
      var move = document.getElementById('imgD').clientHeight;
      imgD.style.height = (move - 4) + "px";
    }
    document.getElementById("up").onclick = function(){
      margin = (margin - 2);
      document.getElementById("imgD").style.marginTop = margin + "px";
    }
    document.getElementById("down").onclick = function(){
      margin = (margin + 2);
      document.getElementById("imgD").style.marginTop = margin + "px";
    }
});

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
  if(image < 20){
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
  for(var i = 1; i < 21; i++){
      image = i;
      doSetTimeout(i);
  }
}

function doSetTimeout(i){
  setTimeout(function(){
    photo = "img/bim/" + i + ".png";
    $("#imgD").attr("src",photo);
  }, i * 500);
}

function firstBim(){
  image = 1;
  photo = "img/bim/" + image + ".png";
  $("#imgD").attr("src",photo);
}

function lastBim(){
  image = 20;
  photo = "img/bim/" + image + ".png";
  $("#imgD").attr("src",photo);
}
