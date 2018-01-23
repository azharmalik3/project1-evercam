function myfunction(){
	var link = document.createElement('meta');
	var link2 = document.createElement('meta');
	link2.property="og:url";
	link2.content=document.location;
	link.property="og:title";
	link.content="Hola que pasa";
	document.getElementsByTagName('head')[0].appendChild(link);
}
