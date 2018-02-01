var $whatsapp = $('#whatsapp');
$whatsapp.on('click',function(e){
	var bannerImage = document.getElementById('miimagen');
	var newData = convertCanvasToImage(bannerImage);
	var imgData = getBase64Image(newData);
  var dataImage = localStorage.getItem('imgData');
	var bannerImg = document.getElementById('myimgage');
	//bannerImg.src = 'data:image/png;base64,' + dataImage;
  Cookies.set('name', 'data:image/png;base64,' + dataImage);
});

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = imageEditor.toDataURL("image/png");
	return image;
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 500;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 800, 500);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

/*var bannerImg;
var bannerImage;
var imgData;
var newData;

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = imageEditor.toDataURL("image/png");
	return image;
}

var $whatsapp = $('#whatsapp');
$whatsapp.on('click',function(e){
	bannerImage = document.getElementById('miimagen');
	newData = convertCanvasToImage(bannerImage);
	imgData = getBase64Image(newData);
	localStorage.setItem("imgData", imgData);
	var opened = window.open("");
	opened.document.write("<html><head><title>MyTitle</title><script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js'></script><script src='js/share.js'></script></head><body onload='chargeImg()'><img src='' id='myimg'></img></body></html>");
});

function chargeImg() {
	var dataImage = localStorage.getItem('imgData');
	bannerImg = document.getElementById('myimg');
	bannerImg.src = 'data:image/png;base64,' + dataImage;
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 500;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 800, 500);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}*/
