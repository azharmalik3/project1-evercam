$(document).ready(function() {

    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy'
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
