var photo;
var image = 1;

$(document).ready(function() {

    var esto = $( "#myFigure" ).width();
    myCanvas.style.width = esto+"px";

    var myPlayer = $( "#player" ).width();
    var player = (esto / 2) - myPlayer;
    document.getElementById("player").style.left = player + "px";

    var canvas2 = document.querySelector('myCanvas');
    var alto = comparison.style.width;
    var ancho = comparison.style.height;
    fitToContainer(canvas2);

    function fitToContainer(canvas2){
      // Make it visually fill the positioned parent
      myCanvas.style.width = ancho;
      myCanvas.style.height= alto;
      // ...then set the internal size to match
      myCanvas.width  = myCanvas.offsetWidth;
      myCanvas.height = myCanvas.offsetHeight;
    }

    var canvas = this.__canvas = new fabric.Canvas('myCanvas');
    canvas.selection = true;

    var ancho = document.getElementById("comparison").offsetWidth;
    var alto = document.getElementById("comparison").offsetHeight;

    fabric.Image.fromURL('img/bim/300.png', function(img) {
    var rect = new fabric.Rect({width: ancho, height: alto});
    var pattern = new fabric.Pattern({source: img.getElement(), offsetX: 0, offsetY: 0});
    rect.scale(0.7).set({
      left: 100,
      top: 100,
      angle: 0,
      fill: pattern,
      selectable: true,
      transparentCorners: false
      });
      canvas.add(rect).setActiveObject(rect);
    });
/*
$(window).bind('resize', function() {
  esto = $( "#myFigure" ).width();
  var myEdit = document.getElementsByClassName("edit");
  myEdit[0].style.width = esto+"px";
  player = (esto / 2) - myPlayer;
  document.getElementById("player").style.left = player + "px";
});



    var angle = 0;
    var margin = 0;
    document.getElementById("redo").onclick = function(){
      angle = (angle + 2) % 360;
      document.getElementById("canvas").style.transform = "rotate(" + angle + "deg)";
    }
    document.getElementById("undo").onclick = function(){
      angle = (angle - 2) % 360;
      document.getElementById("imgD").style.transform = "rotate(" + angle + "deg)";
    }
    document.getElementById("left").onclick = function(){
      var move = $('#imgD').css('marginLeft');
      move = parseInt(move);
      imgD.style.margin = "0px 0px 0px " + (move - 20) + "px";
    }
    document.getElementById("right").onclick = function(){
      var move = $('#imgD').css('marginLeft');
      move = parseInt(move);
      imgD.style.margin = "0px 0px 0px " + (move + 20) + "px";
    }
    document.getElementById("plus").onclick = function(){
      var myImg = document.getElementById("imgD");
      var currWidth = myImg.clientWidth;
      if(currWidth == 2500) return false;
       else{
          myImg.style.width = (currWidth + 100) + "px";
      }
    }
    document.getElementById("minus").onclick = function(){
      var myImg = document.getElementById("imgD");
      var currWidth = myImg.clientWidth;
      if(currWidth == 100) return false;
      else{
          myImg.style.width = (currWidth - 100) + "px";
      }
    }
    document.getElementById("up").onclick = function(){
      margin = (margin - 2);
      document.getElementById("imgD").style.marginTop = margin + "px";
    }



    document.getElementById("down").onclick = function(){
      margin = (margin + 2);
      document.getElementById("imgD").style.marginTop = margin + "px";
    }*/
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

/*
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
  for(var i = 1; i < 302; i++){
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
  image = 1;
  photo = "img/bim/" + image + ".png";
  $("#imgD").attr("src",photo);
}

function lastBim(){
  image = 20;
  photo = "img/bim/" + image + ".png";
  $("#imgD").attr("src",photo);
}

function myFunction(){
  image = $("#sel1").val();
  photo = "img/bim/" + image + ".png";
  $("#imgD").attr("src",photo);
}
*/
