$(document).ready(function() {
   $("#whatsapp").click(function() {
     var jpegUrl = imageEditor.toDataURL("image/jpeg");
      $.ajax({
         type: "POST",
         url: "image.php",
         data: { img: jpegUrl }
      });
   });
});
