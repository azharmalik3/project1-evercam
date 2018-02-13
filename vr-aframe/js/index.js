import aframe from '../node-modules/aframe';
import registerClickDrag from '../node-modules/aframe-click-drag-component';
registerClickDrag(aframe);
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

	$('#btn-object').click( function(e){
		function makeid() {
		  var text = "";
		  var possible = "abcdefghijklmnopqrstuvwxyz";

		  for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		  return text;
		}
		var texto = makeid();
		console.log(texto);

		var sceneEl = document.querySelector('#target');
		AFRAME.registerComponent(texto, {
		  init: function () {
			// This will be called after the entity has properly attached and loaded.
			console.log('I am ready!');
		  }
		});
		var entityEl = document.createElement('a-plane');
		/*entityEl.setAttribute('geometry', {
		  primitive: 'sphere',
			radius: 1.25,
			color: '#FFFFFF'
		});*/
		entityEl.setAttribute('radius', '1.25');
		entityEl.setAttribute('color', '#FFFFFF');
		entityEl.setAttribute('position', '0 1.25 -5');
		sceneEl.appendChild(entityEl);
		entityEl.addState('selected');
		console.log("añadido");
	});
});
