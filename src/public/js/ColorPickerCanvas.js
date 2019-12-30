
window.addEventListener('load', function() {
    var canvas = document.getElementById("color-picker-canvas");
    var context = canvas.getContext("2d");

    // var canvasImage = document.getElementById("color-picker-image");

    var image = new Image();
    image.src = 'public/images/colourWheel.png';
    image.onload = function() {
        image.setAttribute('crossOrigin', '')
        context.drawImage(image, 0, 0, 600, 600, 0, 0, 600, 600);
        image.style.display = 'none';
    }


    function getMousePosition(event, canvas) {
        
        var rect = canvas.getBoundingClientRect();



        var xPos = event.clientX - rect.left;
        let yPos = event.clientY - rect.top;


        var imageData = context.getImageData(event.layerX, event.layerY, 1, 1);

        // console.log(`(${imageData.data[0]},${imageData.data[1]},${imageData.data[2]})`);
        setRGB(imageData.data[0], imageData.data[1], imageData.data[2]);
    }

    canvas.addEventListener('mousedown', function(event) {
        getMousePosition(event, canvas)
        
    })

})

