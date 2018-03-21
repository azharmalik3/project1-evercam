var distorter, example;

var i = 30;
var photo;
var image = 29;
var para = 0;

var angle = 0;
var margin = 0;
var scalex = 1;
var scaley = 1;
var translatex = 0;
var translatey = 0;

var timer = 0;

$(document).ready(function() {
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
       jQuery('#myRow').toggle('show');
       jQuery('#controls').toggle('show');
    });

    //distorter
    distorter = FisheyeGl({
      image: "https://s3-eu-west-1.amazonaws.com/bimevercam/301.png"
    });

    function onSliderChange() {
      readSliders();
      distorter.run();
    }
    $("dl").on("change", onSliderChange);
    $("dl input").on("mousemove", onSliderChange);

    setSliders();
    readSliders();
    distorter.run();

    function readSliders() {
      distorter.lens.a     = parseFloat($("#a_label")[0].innerHTML = $("#a").val());
      distorter.lens.b     = parseFloat($("#b_label")[0].innerHTML = $("#b").val());
      distorter.lens.Fx    = parseFloat($("#Fx_label")[0].innerHTML = $("#Fx").val());
      distorter.lens.Fy    = parseFloat($("#Fy_label")[0].innerHTML = $("#Fy").val());
      distorter.lens.scale = parseFloat($("#scale_label")[0].innerHTML = $("#scale").val());
      distorter.fov.x      = parseFloat($("#fovx").val());
      distorter.fov.y      = parseFloat($("#fovy").val());
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
      $("#scale").val(distorter.lens.scale);
        $("#scale_label")[0].innerHTML = distorter.lens.scale;
      $("#fovx").val(distorter.fov.x);
      $("#fovy").val(distorter.fov.y);
    }


    // Drag & Drop behavior

    $('#canvas').on('dragenter',function(e) {
      $('.zone').addClass('hover');
    });

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
      document.getElementById('myFigure').src = canvas.toDataURL();
      jQuery('#controls').toggle('show');
      jQuery('#myRow').toggle('show');
    }

    document.getElementById("cancel").onclick = function(){
      jQuery('#controls').toggle('show');
      jQuery('#myRow').toggle('show');
    }
});

//Slider show
function showVal(value){
  image = Math.trunc(value);
  console.log(image);
  photo = "https://s3-eu-west-1.amazonaws.com/bimevercam/" + image + ".png";
  distorter = FisheyeGl({
    image: photo
  });
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
    photo = "https://s3-eu-west-1.amazonaws.com/bimevercam/" + image + ".png";
    distorter = FisheyeGl({
      image: photo
    });
  }else{
    alert("No more BIM");
  }
}

function prevPhoto(){
  if(image > 30){
    image = image - 1;
    photo = "https://s3-eu-west-1.amazonaws.com/bimevercam/" + image + ".png";
    distorter = FisheyeGl({
      image: photo
    });
  }else{
    photo = "";
    distorter = FisheyeGl({
      image: photo
    });
    alert("No more BIM");
  }
}

function play(){
  para = 0;
  var refreshIntervalId = setInterval(function(){
    if(i < 302 && para == 0){
      image = i;
      photo = "https://s3-eu-west-1.amazonaws.com/bimevercam/" + i + ".png";
      distorter = FisheyeGl({
        image: photo
      });
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
  }, 80);
}

function pause(){
  para = 1;
}

function firstBim(){
  para = 1;
  i = 30;
  image = 30;
  photo = "https://s3-eu-west-1.amazonaws.com/bimevercam/transparent.png";
  distorter = FisheyeGl({
    image: photo
  });
  document.getElementById("myInput").value = image;
}

function lastBim(){
  i = 301;
  image = 301;
  photo = "https://s3-eu-west-1.amazonaws.com/bimevercam/" + image + ".png";
  distorter = FisheyeGl({
    image: photo
  });
  document.getElementById("myInput").value = image;
}

function myFunction(){
  image = $("#sel1").val();
  photo = "https://s3-eu-west-1.amazonaws.com/bimevercam/" + image + ".png";
  distorter = FisheyeGl({
    image: photo
  });
}
