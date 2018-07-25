//registerAframeClickDragComponent(window.AFRAME);

function previewFile(){
     var preview = document.getElementById('city'); //selects the query named img
     var reader  = new FileReader();

     reader.onloadend = function () {
         preview.src = reader.result;
     }
}

$(document).ready(function () {

  $('#btn-pano').click(function(e){
    previewFile();
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
