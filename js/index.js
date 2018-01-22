var $clipboard = $('#clipboard');


$clipboard.on('click',function(e){
	var img = document.createElement('img');
	img.src = canvas.toDataURL()

	var div = document.createElement('div');
	div.contentEditable = true;
	div.appendChild(img);
	document.body.appendChild(div);

	// do copy
	SelectText(div);
	document.execCommand('Copy');
	document.body.removeChild(div);
	alert('image copied!');
});

function SelectText(element) {
    var doc = document;
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}