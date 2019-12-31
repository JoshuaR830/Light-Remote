
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
        console.log(event.layerX, event.layerY);
        var imageData = context.getImageData(event.layerX, event.layerY, 1, 1);

        // var rect = canvas.getBoundingClientRect();

        // var xPos = event.clientX - rect.left;
        // let yPos = event.clientY - rect.top;


        // var imageData = context.getImageData(xPos, yPos, 1, 1);

        setRGB(imageData.data[0], imageData.data[1], imageData.data[2]);
    });

    canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
        }, false);

    function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  console.log("Touch");
  console.log(touchEvent.touches[0].clientX - rect.left);
  console.log(touchEvent.touches[0].clientY - rect.top);
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}

})



