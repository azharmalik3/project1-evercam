function myfunction(){
	var link = document.createElement('meta');
	link.name="og:title";
	link.content="Hola que pasa";
	document.getElementsByTagName('head')[0].appendChild(link);
	link = document.createElement('meta');
	link.name="og:url";
	link.content="https://project1-evercam.herokuapp.com/image-editor/img.html";
	document.getElementsByTagName('head')[0].appendChild(link);
}
