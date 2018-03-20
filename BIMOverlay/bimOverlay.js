var distorter, example;

var i = 30;
var photo;
var image = 1;
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
       jQuery('#controls').hide();
       document.getElementById("comparison").style.filter = "brightness(20%)";
       document.getElementById("comparison").style.WebkitFilter = "brightness(20%)";
    });

    //distorter
    distorter = FisheyeGl({
      image: 'img/snapshot/background.jpg'
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
      document.getElementById("comparison").style.filter = "brightness(100%)";
      document.getElementById("comparison").style.WebkitFilter = "brightness(100%)";
      jQuery('#controls').toggle('show');
      jQuery('#myRow').hide()
    }

    document.getElementById("cancel").onclick = function(){
      document.getElementById("comparison").style.filter = "brightness(100%)";
      document.getElementById("comparison").style.WebkitFilter = "brightness(100%)";
      jQuery('#controls').toggle('show');
      jQuery('#myRow').hide();
    }
});

//Slider show
function showVal(value){
  image = Math.trunc(value);
  console.log(image);
  photo = "img/bim/" + image + ".png";
  $("#imgD").attr("src",photo);
}

function getTransform(){
  var mio = document.getElementById("imgD");
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

function transition() {

}

function play(){
  para = 0;
  var refreshIntervalId = setInterval(function(){
    if(i < 302 && para == 0){
      image = i;
      photo = "img/bim/" + i + ".png";
      var myPhoto = $("#imgD").attr("src",photo);
      document.getElementById("myInput").value = i;
      i++;
    } else{
      clearInterval(refreshIntervalId);
      i = 30;
      console.log("PARANDO");
    }
  }, 80);
}

function stop2(){
  para = 1;
  console.log(para);
  i = 30;
  image = 30;
  photo = "img/bim/" + image + ".png";
  var myPhoto = $("#imgD").attr("src",photo);
  document.getElementById("myInput").value = image;
}

function pause(){
  para = 1;
  console.log(para);
}

function firstBim(){
  image = 30;
  photo = "img/bim/" + image + ".png";
  $("#imgD").attr("src",photo);
}

function lastBim(){
  image = 301;
  photo = "img/bim/" + image + ".png";
  $("#imgD").attr("src",photo);
}

function myFunction(){
  image = $("#sel1").val();
  photo = "img/bim/" + image + ".png";
  $("#imgD").attr("src",photo);
}
