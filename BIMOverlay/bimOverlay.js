$(document).ready(function() {
    var esto = $( "#myFigure" ).width();
    imgD.style.width = esto+"px";
    $(window).bind('resize', function() {
      esto = $( "#myFigure" ).width();
      imgD.style.width = esto+"px";
    });
});

function moveDivisor() {
  handle.style.left = slider.value+"%";
  divisor.style.width = slider.value+"%";

}

function myFunction(){
  var photo = "img/bim/" + $( "#sel1" ).val() + ".png";
  $("#imgD").attr("src",photo);
}
