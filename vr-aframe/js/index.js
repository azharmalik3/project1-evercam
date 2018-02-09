/*var myimage = document.querySelector("#content");
var zoom = 1;
if (myimage.addEventListener) {
	// IE9, Chrome, Safari, Opera
	myimage.addEventListener("mousewheel", function(){
    myimage.setAttribute('zoom', zoom++ );
  });
	// Firefox
	myimage.addEventListener("DOMMouseScroll", function(){
    myimage.setAttribute('zoom', zoom++ );
  });
}
// IE 6/7/8
else myimage.attachEvent("onmousewheel", function(){
  myimage.setAttribute('zoom', zoom++ );
});*/

//var $btnHostpost = $('#hostpost');
//var $btnImage = $('#image');
//var $btnModel = $('#model');

$(document).ready(function () {
	$('#hostpost').click( function(e){
		var para = document.createElement('p');
		var node = document.createTextNode('This is new.');
		para.appendChild(node);

		var element = document.getElementById('asset');
		element.appendChild(para);
	});
});
