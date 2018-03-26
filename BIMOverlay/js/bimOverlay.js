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

    loadImg();

    var esto = $( "#myFigure" ).width();
    myCanvas.style.width = esto+"px";

    var myPlayer = $( "#player" ).width();
    var player = (esto / 2) - (myPlayer / 1.5);
    document.getElementById("player").style.left = player + "px";

    $(window).on('resize', function() {
      esto = $( "#myFigure" ).width();
      player = (esto / 2) - (myPlayer / 1.5);
      document.getElementById("player").style.left = player + "px";
    });

    $("#next").click(function nextPhoto(){
      $("#play").empty();
      $("#play").append("<i class='fas fa-play'></i>");
      para = 1;
      if(image < 302){
        image = image + 1;
        i = image;
        distorter.setImage(photo[i].src);
      }else{
        alert("No more BIM");
      }
    });

    $("#prev").click(function prevPhoto(){
      $("#play").empty();
      $("#play").append("<i class='fas fa-play'></i>");
      para = 1;
      if(image > 30){
        image = image - 1;
        i = image;
        distorter.setImage(photo[i].src);
      }else{
        distorter.setImage(photo[i].src);
        alert("No more BIM");
      }
    });

    $("#play").click(function play(){
      if(playClicked == 0){
        if(image == 301){
          image = 30;
          i = image;
        }
        $("#play").empty();
        $("#play").append("<i class='fas fa-pause'></i>");
        playClicked = 1;

        para = 0;
        var refreshIntervalId = setInterval(function(){
          if(i < 302 && para == 0){
            image = i;
            distorter.setImage(photo[i].src);
            document.getElementById("myInput").value = i;
            i++;
          } else{
            clearInterval(refreshIntervalId);
            console.log("PARANDO");
            if(i == 302){
              i = 30;
            }
          }
          if (i == 301){
            playClicked = 0;
          }
        }, 80);
      } else{
        $("#play").empty();
        $("#play").append("<i class='fas fa-play'></i>");
        playClicked = 0;
        para = 1;
      }
    });

    $("#first").click(function firstBim(){
      $("#play").empty();
      $("#play").append("<i class='fas fa-play'></i>");
      para = 1;
      i = 30;
      image = 30;
      distorter.setImage("img/bim/0.png");
      document.getElementById("myInput").value = image;
    });

    $("#end").click(function lastBim(){
      $("#play").empty();
      $("#play").append("<i class='fas fa-play'></i>");
      para = 1;
      i = 301;
      image = 301;
      distorter.setImage(photo[i].src);
      document.getElementById("myInput").value = image;
    });

    $("#redo").click(function(){
      angle = (angle + 2) % 360;
      getTransform();
    });

    $("#undo").click(function(){
      angle = (angle - 2) % 360;
      getTransform();
    });
    $("#left").click(function(){
      translatex = translatex - 20;
      getTransform();
    });
    $("#right").click(function(){
      translatex = translatex + 20;
      getTransform();
    });
    $("#up").click(function(){
      translatey = translatey - 20;
      getTransform();
    });
    $("#down").click(function(){
      translatey = translatey + 20;
      getTransform();
    });
    $("#plus").click(function(){
      scalex = scalex + 0.1;
      scaley = scaley + 0.1;
      getTransform();
    });
    $("#minus").click(function(){
      scalex = scalex - 0.1;
      scaley = scaley - 0.1;
      getTransform();
    });

    //btn ok & cancel
    $("#ok").click(function(){
      if(editClicked == 0){
        document.getElementById("edit2").style.backgroundColor = "rgba(143, 178, 213, 0.65)";
        editClicked = 1;
      }else{
        document.getElementById("edit2").style.backgroundColor = "";
        editClicked = 0;
      }
      jQuery('#controls').toggle('show');
      jQuery('#myRow').toggle('show');
    });

    $("#cancel").click(function(){
      myReset();
      if(editClicked == 0){
        document.getElementById("edit2").style.backgroundColor = "rgba(143, 178, 213, 0.65)";
        editClicked = 1;
      }else{
        document.getElementById("edit2").style.backgroundColor = "";
        editClicked = 0;
      }
      jQuery('#controls').toggle('show');
      jQuery('#myRow').toggle('show');
    });

    $("#reset").click(function(){
      myReset();
    });

    $("#closeEditor").click(function(){
      if(editClicked == 0){
        document.getElementById("edit2").style.backgroundColor = "rgba(143, 178, 213, 0.65)";
        editClicked = 1;
      }else{
        document.getElementById("edit2").style.backgroundColor = "";
        editClicked = 0;
      }
      jQuery('#controls').toggle('show');
      jQuery('#myRow').toggle('show');
    });

    //hidde editbar (edit2)
    jQuery('#edit2').click(function(event) {
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

    distorter = FisheyeGl({
      image: ""
    });

    $("dl").on("change", onSliderChange);
    $("dd input").on("mousemove", onSliderChange);

    setSliders();
    readSliders();
    distorter.run();

    window.onresize = resizeGrid;
    setTimeout(resizeGrid, 0);

    function resizeGrid() {
      $('#grid').height($('#canvas').height());
      $('#grid').width($('#canvas').width());
    }

    /*example = {
      setSliders:    setSliders,
      readSliders:   readSliders
    }*/

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

    function myReset(){
      var mio = document.getElementById("myCanvas");
      mio.style.transform = "rotate(0deg)";
      mio.style.transform += "translate(0px, 0px)";
      mio.style.transform += "scale(1, 1)";

      $("#transparency").val(1);
      document.getElementById("myCanvas").style.opacity = 1;
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

    function loadImg(){
      for (var i = 30; i <302; i++){
        photo[i] = new Image();
        photo[i].src = "img/bim/" + i + ".png";
        //photo[i].src = "https://s3-eu-west-1.amazonaws.com/bimevercam/" + i + ".png";
        photo[i].crossOrigin = "";
      }
    }

    $('#myInput').focusin(thumbnails);
    $('#myInput').mouseout(function(){
      $('#myDiv').hide();
    });
    function thumbnails(){
      var myRange = document.querySelector('#myInput');
      var myValue = document.querySelector('#myValue');
      var myUnits = 'myUnits';
      var off = myRange.offsetWidth / (parseInt(myRange.max) - parseInt(myRange.min));
      var px =  ((myRange.valueAsNumber - parseInt(myRange.min)) * off) - (myValue.offsetParent.offsetWidth / 2);

        myValue.parentElement.style.left = px + 'px';
        myValue.parentElement.style.top = (myRange.offsetHeight - 170) + 'px';
        myValue.innerHTML = "<div id='myDiv' style='border:2px solid white'><img src='img/bim/" + Math.trunc(myRange.value) + ".png' style='height: 100%; width: 100%; object-fit: contain; position: absolute'></img></div>";//Math.trunc(myRange.value) + ' ' + myUnits;

        myRange.oninput =function(){
          px = ((myRange.valueAsNumber - parseInt(myRange.min)) * off) - (myValue.offsetParent.offsetWidth / 2);
          myValue.innerHTML = "<div id='myDiv' style='border:2px solid white'><img src='img/bim/" + Math.trunc(myRange.value) + ".png' style='height: 100%; width: 100%; object-fit: contain; position: absolute'></img></div>";
          myValue.parentElement.style.left = px + 'px';
        };
    }

    //Slider show
    $("#myInput").on('change', showVal);
    function showVal(){
      $("#play").empty();
      $("#play").append("<i class='fas fa-play'></i>");
      para = 1;
      var value = $("#myInput").val();
      image = Math.trunc(value);
      i = image;
      if(image == 30){
        distorter.setImage("img/bim/0.png")
      }else{
        distorter.setImage(photo[image].src)
      }
    }

    $("#transparency").on('change', showVal2);
    $("#transparency").on('mousemove', showVal2);
    function showVal2(){
      var value = $("#transparency").val();
      document.getElementById("myCanvas").style.opacity = value;
    }

    function getTransform(){
      var mio = document.getElementById("myCanvas");
      mio.style.transform = "rotate(" + angle + "deg)";
      mio.style.transform += "translate(" + translatex + "px, " + translatey + "px)";
      mio.style.transform += "scale(" + scalex + ", " + scaley + ")";
    }

    $("#slider").on("mousemove", moveDivisor);
    function moveDivisor() {
      handle.style.left = slider.value+"%";
      divisor.style.width = slider.value+"%";

    }

    /*function point_it(event){
    	pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("comparison").offsetLeft;
    	pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("comparison").offsetTop;
    	document.getElementById("myFigure").style.left = (pos_x-1) ;
    	document.getElementById("myFigure").style.top = (pos_y-15) ;
    	document.getElementById("myFigure").style.visibility = "visible" ;
      console.log("y: " + pos_y +", x: " + pos_x);
    }*/

    function myFunction(){
      image = $("#sel1").val();
      i = image;
      distorter = FisheyeGl({
        image: photo[image].src
      });
    }
});
