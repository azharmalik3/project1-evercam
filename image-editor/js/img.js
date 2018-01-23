function myfunction(){
	var link = document.createElement('meta');
	link.name="og:url";
	link.content=document.location;
	link.name="og:title";
	link.content="Hola que pasa";
	document.getElementsByTagName('head')[0].appendChild(link);
}
