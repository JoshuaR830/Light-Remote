function updateSlider(red, green, blue) {
    var root = document.documentElement;
    root.style.setProperty('--color', `rgb(${red}, ${green}, ${blue})`)
}

window.addEventListener('load', function() {
    var slider = document.getElementById('brightness-slider');
    slider.addEventListener('onchange',function(event) {
        setRGB(red, green, blue);
    });

}