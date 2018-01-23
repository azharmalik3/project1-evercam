function myfunction(){
	var link = document.createElement('meta');
	var link2 = document.createElement('meta');
	link2.name="og:url";
	link2.content=document.location;
	link.name="og:title";
	link.content="Hola que pasa";
	document.getElementsByTagName('head')[0].appendChild(link);
}
