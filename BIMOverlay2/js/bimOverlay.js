var distorter, example;

var i = 30;
var photo = [];
var image = 29;
var para = 0;

var angle = 0;
var margin = 0;
var scalex = 1;
var scaley = 1;
var translatex = 0;
var translatey = 0;

var timer = 0;

var playClicked = 0;
var editClicked = 0;

$(document).ready(function() {

    for (var i = 30; i <302; i++){
      photo[i] = new Image();
      photo[i].src = "img/bim/" + i + ".png";
      //photo[i].src = "https://s3-eu-west-1.amazonaws.com/bimevercam/" + i + ".png";
      photo[i].crossOrigin = "";
    }

    var esto = $( "#myFigure" ).width();
    myCanvas.style.width = esto+"px";

    var myPlayer = $( "#player" ).width();
    var player = (esto / 2) - (myPlayer / 1.5);
    document.getElementById("player").style.left = player + "px";

    $(window).bind('resize', function() {
      esto = $( "#myFigure" ).width();
      var myEdit = document.getElementsByClassName("edit");
      myEdit[0].style.width = esto+"px";
      player = (esto / 2) - (myPlayer / 1.5);
      document.getElementById("player").style.left = player + "px";
    });

    document.getElementById("redo").onclick = function(){
      angle = (angle + 2) % 360;
      getTransform();
    }
    document.getElementById("undo").onclick = function(){
      angle = (angle - 2) % 360;
      getTransform();
    }
    document.getElementById("left").onclick = function(){
      translatex = translatex - 20;
      getTransform();
    }
    document.getElementById("right").onclick = function(){
      translatex = translatex + 20;
      getTransform();
    }
    document.getElementById("up").onclick = function(){
      translatey = translatey - 20;
      getTransform();
    }

    document.getElementById("down").onclick = function(){
      translatey = translatey + 20;
      getTransform();
    }
    document.getElementById("plus").onclick = function(){
      scalex = scalex + 0.1;
      scaley = scaley + 0.1;
      getTransform();
    }
    document.getElementById("minus").onclick = function(){
      scalex = scalex - 0.1;
      scaley = scaley - 0.1;
      getTransform();
    }

    //hidde editbar (edit2)
    jQuery('#edit2').on('click', function(event) {
      if(editClicked == 0){
        document.getElementById("edit2").style.backgroundColor = "rgba(143, 178, 213, 0.65)";
        editClicked = 1;
      }else{
        document.getElementById("edit2").style.backgroundColor = "";
        editClicked = 0;
      }
       jQuery('#myRow').toggle('show');
       jQuery('#controls').toggle('show');
    });

    //distorter
    distorter = FisheyeGl({
      image: ""
    });

    $("dl").on("change", onSliderChange);

    setSliders();
    readSliders();
    distorter.run();

    // Drag & Drop behavior

    /*
    $('#canvas').on('dragenter',function(e) {
      $('.zone').addClass('hover');

    $('#canvas').on('dragleave',function(e) {
      $('.zone').removeClass('hover');
    });
    var onDrop = function(e) {
      e.preventDefault();
      e.stopPropagation(); // stops the browser from redirecting.

      var files = e.dataTransfer.files;
      for (var i = 0, f; f = files[i]; i++) {
        // Read the File objects in this FileList.

        var reader = new FileReader();
        reader.onload = function(e) {

          var dataurl = distorter.getSrc();
  //        var bin = atob(dataurl.split(',')[1]);
  //        var exif = EXIF.readFromBinaryFile(new BinaryFile(bin));
  //        console.log(exif);

          var uniq = (new Date()).getTime();
          $('#previous').prepend('<a target="_blank" class="' + uniq + '" href="' + dataurl + '"></a>');
          $('.' + uniq).append(distorter.getImage());
          distorter.setImage(event.target.result, function callback() {
            $('#grid').height($('#canvas').height());
            $('#grid').width($('#canvas').width());
          });

        }
        reader.readAsDataURL(f);

        // EXIF
        var exifReader = new FileReader();

        $('.exif').html('');
        exifReader.onload = function(e) {
          var exif = EXIF.readFromBinaryFile(e.target.result);
          $('.exif-camera').html(exif.Make + ', ' + exif.Model);
          $('.exif').html(JSON.stringify(exif));
        }
        exifReader.readAsArrayBuffer(f);
      }
    }

    function onDragOver(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    $('#canvas').on('dragover', onDragOver, false);
    $('#canvas')[0].addEventListener('drop', onDrop, false);
    */


    window.onresize = resizeGrid;
    setTimeout(resizeGrid, 0);

    function resizeGrid() {
      $('#grid').height($('#canvas').height());
      $('#grid').width($('#canvas').width());
    }

    example = {
      setSliders:    setSliders,
      readSliders:   readSliders
    }

    //btn ok & cancel
    document.getElementById("ok").onclick = function(){
      if(editClicked == 0){
        document.getElementById("edit2").style.backgroundColor = "rgba(143, 178, 213, 0.65)";
        editClicked = 1;
      }else{
        document.getElementById("edit2").style.backgroundColor = "";
        editClicked = 0;
      }
      jQuery('#controls').toggle('show');
      jQuery('#myRow').toggle('show');
    }

    document.getElementById("cancel").onclick = function(){
      if(editClicked == 0){
        document.getElementById("edit2").style.backgroundColor = "rgba(143, 178, 213, 0.65)";
        editClicked = 1;
      }else{
        document.getElementById("edit2").style.backgroundColor = "";
        editClicked = 0;
      }
      jQuery('#controls').toggle('show');
      jQuery('#myRow').toggle('show');
    }

    document.getElementById("reset").onclick = function(){
      $("#a").val(1);
      $("#b").val(1);
      $("#Fx").val(0);
      $("#Fy").val(0);
      $("#fovx").val(0);
      $("#fovy").val(0);
      distorter.lens.a = parseFloat($("#a_label")[0].innerHTML = $("#a").val());
      distorter.lens.b = parseFloat($("#b_label")[0].innerHTML = $("#b").val());
      distorter.lens.Fx = parseFloat($("#Fx_label")[0].innerHTML = $("#Fx").val());
      distorter.lens.Fy = parseFloat($("#Fy_label")[0].innerHTML = $("#Fy").val());
      distorter.fov.x = parseFloat($("#fovx").val());
      distorter.fov.y = parseFloat($("#fovy").val());
      distorter.run();
    }

    document.getElementById("myButton").onclick = function(){
      if(editClicked == 0){
        document.getElementById("edit2").style.backgroundColor = "rgba(143, 178, 213, 0.65)";
        editClicked = 1;
      }else{
        document.getElementById("edit2").style.backgroundColor = "";
        editClicked = 0;
      }
      jQuery('#controls').toggle('show');
      jQuery('#myRow').toggle('show');
    }
});

function onSliderChange() {
  readSliders();
  distorter.run();
}

function readSliders() {
  distorter.lens.a = parseFloat($("#a_label")[0].innerHTML = $("#a").val());
  distorter.lens.b = parseFloat($("#b_label")[0].innerHTML = $("#b").val());
  distorter.lens.Fx = parseFloat($("#Fx_label")[0].innerHTML = $("#Fx").val());
  distorter.lens.Fy = parseFloat($("#Fy_label")[0].innerHTML = $("#Fy").val());
  distorter.fov.x = parseFloat($("#fovx").val());
  distorter.fov.y = parseFloat($("#fovy").val());
}

function setSliders() {
  $("#a").val(distorter.lens.a);
    $("#a_label")[0].innerHTML = distorter.lens.a;
  $("#b").val(distorter.lens.b);
    $("#b_label")[0].innerHTML = distorter.lens.b;
  $("#Fx").val(distorter.lens.Fx);
    $("#Fx_label")[0].innerHTML = distorter.lens.Fx;
  $("#Fy").val(distorter.lens.Fy);
    $("#Fy_label")[0].innerHTML = distorter.lens.Fy;
  $("#fovx").val(distorter.fov.x);
  $("#fovy").val(distorter.fov.y);
}

//Slider show
function showVal(value){
  image = Math.trunc(value);
  console.log(image);
  if(image == 30){
    distorter = FisheyeGl({
      image: ""
    });
    onSliderChange();
  }else{
    distorter = FisheyeGl({
      image: photo[image].src
    });
    onSliderChange();
  }
}

function showVal2(value){
  document.getElementById("myCanvas").style.opacity = value;
}

function getTransform(){
  var mio = document.getElementById("myCanvas");
  mio.style.transform = "rotate(" + angle + "deg)";
  mio.style.transform += "translate(" + translatex + "px, " + translatey + "px)";
  mio.style.transform += "scale(" + scalex + ", " + scaley + ")";

  //console.log("angle: " + angle + ", translateX: " + translatex + ", translatey: " + translatey + ", scalex: " + scalex + ", scaley: " + scaley);
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
  if(image < 302){
    image = image + 1;
    distorter = FisheyeGl({
      image: photo[image].src
    });
    onSliderChange();
  }else{
    alert("No more BIM");
  }
}

function prevPhoto(){
  if(image > 30){
    image = image - 1;
    distorter = FisheyeGl({
      image: photo[image].src
    });
    onSliderChange();
  }else{
    distorter = FisheyeGl({
      image: photo[0].src
    });
    alert("No more BIM");
  }
}

function play(){
  if(playClicked == 0){
    document.getElementById("play").style.backgroundColor = "rgba(143, 178, 213, 0.65)";
    playClicked = 1;

    para = 0;
    var refreshIntervalId = setInterval(function(){
      if(i < 302 && para == 0){
        image = i;
        distorter = FisheyeGl({
          image: photo[i].src
        });
        onSliderChange();
        document.getElementById("myInput").value = i;
        i++;
        console.log("esto: " + i);
      } else{
        clearInterval(refreshIntervalId);
        console.log("PARANDO");
        if(i == 302){
          i = 30;
        }
      }
      if (i == 301){
        document.getElementById("play").style.backgroundColor = "";
        playClicked = 0;
      }
    }, 80);
  }
}

function pause(){
  document.getElementById("play").style.backgroundColor = "";
  playClicked = 0;
  para = 1;
}

function firstBim(){
  para = 1;
  i = 30;
  image = 30;
  distorter = FisheyeGl({
    image: ""
  });
  document.getElementById("myInput").value = image;
}

function lastBim(){
  i = 301;
  image = 301;
  distorter = FisheyeGl({
    image: photo[image].src
  });
  onSliderChange();
  document.getElementById("myInput").value = image;
}

function myFunction(){
  image = $("#sel1").val();
  distorter = FisheyeGl({
    image: photo[image].src
  });
}
