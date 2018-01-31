var myimage = document.querySelector("#menu");
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
});
