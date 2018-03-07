$(document).ready(function() {
    var esto = $( "#myFigure" ).width();
    imgD.style.width = esto+"px";
    $(window).bind('resize', function() {
      esto = $( "#myFigure" ).width();
      imgD.style.width = esto+"px";
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

function myFunction(){
  var photo = "img/bim/" + $( "#sel1" ).val() + ".png";
  $("#imgD").attr("src",photo);
}

function point_it(event){
	pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("comparison").offsetLeft;
	pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("comparison").offsetTop;
	document.getElementById("myFigure").style.left = (pos_x-1) ;
	document.getElementById("myFigure").style.top = (pos_y-15) ;
	document.getElementById("myFigure").style.visibility = "visible" ;
  console.log("y: " + pos_y +", x: " + pos_x);
}
