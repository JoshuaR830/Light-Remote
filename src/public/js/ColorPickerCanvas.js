
window.addEventListener('load', function() {
    var canvas = document.getElementById("color-picker-canvas");
    var context = canvas.getContext("2d");

    var image = new Image();
    image.src = '/images/colourWheel.png';
    image.onload = function() {
        image.setAttribute('crossOrigin', '')
        context.drawImage(image, 0, 0, 600, 600, 0, 0, 600, 600);
        image.style.display = 'none';
    }

    canvas.classList.add('color-picker-canvas');

    canvas.addEventListener('mousedown', function(event) {
        var imageData = context.getImageData(event.layerX, event.layerY, 1, 1);
        setRGB(imageData.data[0], imageData.data[1], imageData.data[2]);
    })

})

