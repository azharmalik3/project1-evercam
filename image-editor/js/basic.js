/**
 * basic.js
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview
 */
'use strict';

var supportingFileAPI = !!(window.File && window.FileList && window.FileReader);
var rImageType = /data:(image\/.+);base64,/;
var shapeOptions = {};
var shapeType;
var activeObjectId;

// Buttons
var $btns = $('.menu-item');
var $btnsActivatable = $btns.filter('.activatable');
var $inputImage = $('#input-image-file');
var $btnDownload = $('#btn-download');

var $btnUndo = $('#btn-undo');
var $btnRedo = $('#btn-redo');
var $btnClearObjects = $('#btn-clear-objects');

var $btnDrawLinefree = $('#btn-draw-line-free');
var $btnDrawLinestraight = $('#btn-draw-line-straight');
var $btnDrawRect = $('#btn-draw-rect');
var $btnDrawCircle = $('#btn-draw-circle');
var $btnSelection = $('#selection');
var $btnText = $('#btn-text');
var $btnAddIcon = $('#btn-add-icon');
var $btnRegisterIcon = $('#btn-register-icon');

var $btnClose = $('.close');

// Input etc.
var $inputBrushWidthRange = $('#input-brush-width-range');
var $inputFontSizeRange = $('#input-font-size-range');
var $inputStrokeWidthRange = $('#input-stroke-width-range');
var $inputCheckTransparent = $('#input-check-transparent');
var $inputCheckGrayscale = $('#input-check-grayscale');

// Sub menus
var $displayingSubMenu = $();
var $freeDrawingSubMenu = $('#free-drawing-sub-menu');
var $drawLineSubMenu = $('#draw-line-sub-menu');
var $drawShapeSubMenu = $('#draw-shape-sub-menu');
var $textSubMenu = $('#text-sub-menu');
var $iconSubMenu = $('#icon-sub-menu');
var $filterSubMenu = $('#filter-sub-menu');
var $imageFilterSubMenu = $('#image-filter-sub-menu');

// Select line type
var $selectLine = $('[name="select-line-type"]');

// Select shape type
var $selectShapeType = $('[name="select-shape-type"]');
var $drawRectangle = $('#type-rectangle');

// Select color of shape type
var $selectColorType = $('[name="select-color-type"]');

//Select blend type
var $selectBlendType = $('[name="select-blend-type"]');

// Image editor
var imageEditor = new tui.ImageEditor('.tui-image-editor', {
    cssMaxWidth: 1000,
    cssMaxHeight: 800,
    selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70
    }
});

// Color picker for free drawing
var instanceBrush = tui.colorPicker.create({
    //container: document.getElementByClassName("tui-color-picker"),
	container: $('#tui-brush-color-picker')[0],
    color: '#000000'
});

var instanceText = tui.colorPicker.create({
    //container: document.getElementByClassName("tui-color-picker"),
	container: $('#tui-text-color-picker')[0],
    color: '#000000'
});

var instanceShape = tui.colorPicker.create({
    //container: document.getElementByClassName("tui-color-picker"),
	container: $('#tui-shape-color-picker')[0],
    color: '#000000'
});

var instanceArrow = tui.colorPicker.create({
    container: $('#tui-arrow-color-picker')[0],
    color: '#000000'
});

// Common global functions
// HEX to RGBA
function hexToRGBa(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    var a = alpha || 1;

    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
}

function base64ToBlob(data) {
    var mimeString = '';
    var raw, uInt8Array, i, rawLength;

    raw = data.replace(rImageType, function(header, imageType) {
        mimeString = imageType;

        return '';
    });

    raw = atob(raw);
    rawLength = raw.length;
    uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

    for (i = 0; i < rawLength; i += 1) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: mimeString});
}

function setShapeToolbar(obj) {
    var strokeColor, fillColor, isTransparent;
    var colorType = $selectColorType.val();

    if (colorType === 'stroke') {
        strokeColor = obj.stroke;
        isTransparent = (strokeColor === 'transparent');

        if (!isTransparent) {
            shapeColorpicker.setColor(strokeColor);
        }
    } else if (colorType === 'fill') {
        fillColor = obj.fill;
        isTransparent = (fillColor === 'transparent');

        if (!isTransparent) {
            shapeColorpicker.setColor(fillColor);
        }
    }

    $inputCheckTransparent.prop('checked', isTransparent);
    $inputStrokeWidthRange.val(obj.strokeWidth);
}

function resizeEditor() {
    var $editor = $('.tui-image-editor');
    var $container = $('.tui-image-editor-canvas-container');
    var height = parseFloat($container.css('max-height'));

    $editor.height(height);
}

function getBrushSettings() {
    var brushWidth = 10;//
    var brushColor = instanceBrush.getColor();

    return {
        width: brushWidth,
        color: hexToRGBa(brushColor, 1.0)
    };
}

function activateShapeMode() {
    if (imageEditor.getDrawingMode() !== 'SHAPE') {
        imageEditor.stopDrawingMode();
        imageEditor.startDrawingMode('SHAPE');
    }
}

function activateSelectionMode() {
    imageEditor.stopDrawingMode();
}

function activateIconMode() {
    imageEditor.stopDrawingMode();
}

function activateTextMode() {
    if (imageEditor.getDrawingMode() !== 'TEXT') {
        imageEditor.stopDrawingMode();
        imageEditor.startDrawingMode('TEXT');
    }
}

function setTextToolbar(obj) {
    var fontSize = obj.fontSize;
    var fontColor = obj.fill;

    $inputFontSizeRange.val(fontSize);
    instanceText.setColor(fontColor);
}

function setIconToolbar(obj) {
    var iconColor = obj.fill;

    instanceArrow.setColor(iconColor);
}

function myfunction(){
    var $submenu = $iconSubMenu;
    $displayingSubMenu = $submenu.show();
}

function showSubMenu(type) {
    var $submenu;

    switch (type) {
        case 'shape':
            $submenu = $drawShapeSubMenu;
            break;
        case 'icon':
            $submenu = $iconSubMenu;
            break;
        case 'text':
            $submenu = $textSubMenu;
            break;
        default:
            $submenu = 0;
    }

    $displayingSubMenu.hide();
    $displayingSubMenu = $submenu.show();
}

function applyOrRemoveFilter(applying, type, options) {
    if (applying) {
        imageEditor.applyFilter(type, options).then(result => {
            console.log(result);
        });
    } else {
        imageEditor.removeFilter(type);
    }
}

// Attach image editor custom events
imageEditor.on({
    objectAdded: function(objectProps) {
        console.info(objectProps);
    },
    undoStackChanged: function(length) {
        if (length) {
            $btnUndo.removeClass('disabled');
        } else {
            $btnUndo.addClass('disabled');
        }
        resizeEditor();
    },
    redoStackChanged: function(length) {
        if (length) {
            $btnRedo.removeClass('disabled');
        } else {
            $btnRedo.addClass('disabled');
        }
        resizeEditor();
    },
    objectScaled: function(obj) {
        if (obj.type === 'text') {
            $inputFontSizeRange.val(obj.fontSize);
        }
    },
    addText: function(pos) {
        imageEditor.addText('Double Click', {
            position: pos.originPosition,
            styles: {
                fontSize: '150'
             }
        }).then(objectProps => {
            console.log(objectProps);
        });
    },
    objectActivated: function(obj) {
        activeObjectId = obj.id;
        if (obj.type === 'rect' || obj.type === 'circle') {
            showSubMenu('shape');
            setShapeToolbar(obj);
            activateShapeMode();
        } else if (obj.type === 'icon') {
            showSubMenu('icon');
            setIconToolbar(obj);
            activateIconMode();
        } else if (obj.type === 'text') {
            showSubMenu('text');
            setTextToolbar(obj);
            activateTextMode();
        }
    },
    mousedown: function(event, originPointer) {
        if ($imageFilterSubMenu.is(':visible') && imageEditor.hasFilter('colorFilter')) {
            imageEditor.applyFilter('colorFilter', {
                x: parseInt(originPointer.x, 10),
                y: parseInt(originPointer.y, 10)
            });
        }
    }
});

$btnSelection.on('click', function(){
    activateSelectionMode();
});

// Attach button click event listeners
$btns.on('click', function() {
    $btnsActivatable.removeClass('active');
});

$btnsActivatable.on('click', function() {
    $(this).addClass('active');
});

$btnUndo.on('click', function() {
    $displayingSubMenu.hide();

    if (!$(this).hasClass('disabled')) {
        imageEditor.undo();
    }
});

$btnRedo.on('click', function() {
    $displayingSubMenu.hide();

    if (!$(this).hasClass('disabled')) {
        imageEditor.redo();
    }
});

$btnClearObjects.on('click', function() {
    imageEditor.clearObjects();
    //myfunction();
});

$btnClose.on('click', function() {
    imageEditor.stopDrawingMode();
    $displayingSubMenu.hide();
});

$inputBrushWidthRange.on('change', function() {
    imageEditor.setBrush({width: 8});//parseInt(this.value, 10)}
});

$inputImage.on('change', function(event) {
    var file;

    if (!supportingFileAPI) {
        alert('This browser does not support file-api');
    }

    file = event.target.files[0];
    imageEditor.loadImageFromFile(file).then(result => {
        console.log(result);
        imageEditor.clearUndoStack();
    });
});

$btnDownload.on('click', function() {
    var imageName = imageEditor.getImageName();
    var dataURL = imageEditor.toDataURL();
    var blob, type, w;

    if (supportingFileAPI) {
        blob = base64ToBlob(dataURL);
        type = blob.type.split('/')[1];
        if (imageName.split('.').pop() !== type) {
            imageName += '.' + type;
        }

        // Library: FileSaver - saveAs
        saveAs(blob, imageName); // eslint-disable-line
    } else {
        alert('This browser needs a file-server');
        w = window.open();
        w.document.body.innerHTML = '<img src=' + dataURL + '>';
    }
});

// control draw line mode
$btnDrawLinestraight.on('click', function() {
    imageEditor.stopDrawingMode();
    $displayingSubMenu.hide();
    $displayingSubMenu = $drawLineSubMenu.show();
    //$selectLine.eq(0).change();

    var settings = getBrushSettings();
    imageEditor.stopDrawingMode();
    imageEditor.startDrawingMode('LINE_DRAWING', settings);
});

$btnDrawLinefree.on('click', function() {
    imageEditor.stopDrawingMode();
    $displayingSubMenu.hide();
    $displayingSubMenu = $drawLineSubMenu.show();
    //$selectLine.eq(0).change();

    var settings = getBrushSettings();
    imageEditor.stopDrawingMode();
    imageEditor.startDrawingMode('FREE_DRAWING', settings);
});

instanceBrush.on('selectColor', function(event) {
    imageEditor.setBrush({
        color: hexToRGBa(event.color, 1.0)
    });
});

// control draw shape mode
$btnDrawRect.on('click', function() {
    showSubMenu('shape');

    shapeOptions.stroke = '#000000';
    shapeOptions.fill = 'transparent';

    shapeOptions.strokeWidth = 10;//Number($inputStrokeWidthRange.val())

    // step 2. set options to draw shape
    imageEditor.setDrawingShape('rect', shapeOptions);

    // step 3. start drawing shape mode
    activateShapeMode();
});

$btnDrawCircle.on('click', function() {
    showSubMenu('shape');

    shapeOptions.stroke = '#000000';
    shapeOptions.fill = 'transparent';

    shapeOptions.strokeWidth = 10;

    // step 2. set options to draw shape
    imageEditor.setDrawingShape('circle', shapeOptions);

    // step 3. start drawing shape mode
    activateShapeMode();
});

instanceShape.on('selectColor', function(event) {
    var color = event.color;

    imageEditor.changeShape(activeObjectId, {
        stroke: color
    });

    imageEditor.setDrawingShape(shapeType, shapeOptions);
});

// control text mode
$btnText.on('click', function() {
    showSubMenu('text');
    activateTextMode();
});

$inputFontSizeRange.on('change', function() {
    imageEditor.changeTextStyle(activeObjectId, {
        fontSize: parseInt(this.value, 10)
    });
});

instanceText.on('selectColor', function(event) {
    imageEditor.changeTextStyle(activeObjectId, {
        'fill': event.color
    });
});

// control icon
$btnAddIcon.on('click', function() {
    showSubMenu('icon');
    activateIconMode();
	//var element = event.target || event.srcElement;

    imageEditor.once('mousedown', function(e, originPointer) {
        imageEditor.addIcon('arrow', {
            left: originPointer.x,
            top: originPointer.y
        }).then(objectProps => {
            console.log(objectProps);
        });
    });
});

instanceArrow.on('selectColor', function(event) {
    imageEditor.changeIconColor(activeObjectId, event.color);
});

// Load sample image
imageEditor.loadImageFromURL('img/sampleimage.jpg', 'SampleImage').then(sizeValue => {
    console.log(sizeValue);
    imageEditor.clearUndoStack();
});

// IE9 Unselectable
$('.menu').on('selectstart', function() {
    return false;
});